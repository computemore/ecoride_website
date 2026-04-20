import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type LegalDocumentSlug = 'privacy-policy' | 'terms';

export interface LegalTextNode {
  type: 'text';
  value: string;
}

export interface LegalStrongNode {
  type: 'strong';
  value: string;
}

export interface LegalCodeNode {
  type: 'code';
  value: string;
}

export interface LegalLinkNode {
  type: 'link';
  value: string;
  href: string;
  codeStyle?: boolean;
}

export type LegalInlineNode = LegalTextNode | LegalStrongNode | LegalCodeNode | LegalLinkNode;

export interface LegalMetaEntry {
  label: string;
  value: LegalInlineNode[];
}

interface LegalHeadingBlock {
  type: 'heading';
  content: LegalInlineNode[];
  id: string;
  level: 2 | 3;
  plainText: string;
}

interface LegalParagraphBlock {
  type: 'paragraph';
  content: LegalInlineNode[];
  isEmphasis?: boolean;
  isLabel?: boolean;
}

interface LegalListItem {
  content: LegalInlineNode[];
  marker?: string;
}

interface LegalListBlock {
  type: 'list';
  items: LegalListItem[];
  style: 'bullet' | 'ordered-alpha' | 'ordered-roman' | 'ordered-decimal';
}

export type LegalBlock = LegalHeadingBlock | LegalParagraphBlock | LegalListBlock;

export interface LegalHeadingOutlineItem {
  id: string;
  level: 2 | 3;
  text: string;
}

export interface LegalDocument {
  headings: LegalHeadingOutlineItem[];
  meta: LegalMetaEntry[];
  plainTitle: string;
  title: LegalInlineNode[];
  blocks: LegalBlock[];
}

const documentPaths: Record<LegalDocumentSlug, string> = {
  'privacy-policy': path.join(process.cwd(), 'docs/legal/privacy-policy.md'),
  terms: path.join(process.cwd(), 'docs/legal/terms.md'),
};

const ownedLinkReplacements = new Map<string, string>([
  ['https://www.computemore.com/projects/ecoride/privacy-policy', 'https://ecoridemw.com/about/privacy-policy'],
  ['http://www.computemore.com/projects/ecoride/privacy-policy', 'https://ecoridemw.com/about/privacy-policy'],
]);

const romanTokens = new Set(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']);

const normalizeOwnedLinks = (source: string) => {
  let normalized = source;

  ownedLinkReplacements.forEach((replacement, target) => {
    normalized = normalized.replaceAll(target, replacement);
  });

  return normalized;
};

const stripTrailingPunctuation = (value: string) => {
  const trimmed = value.replace(/[),.;:]+$/g, '');
  const trailing = value.slice(trimmed.length);

  return { trimmed, trailing };
};

const createSlug = (value: string, slugCounts: Map<string, number>) => {
  const baseSlug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';

  const currentCount = slugCounts.get(baseSlug) ?? 0;
  slugCounts.set(baseSlug, currentCount + 1);

  return currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount + 1}`;
};

const looksLikeStandaloneLabel = (currentLine: string, nextLine: string | undefined) => {
  const trimmed = currentLine.trim();

  if (!trimmed.endsWith('.') || nextLine?.trim() !== '') {
    return false;
  }

  if (trimmed.includes(':') || trimmed.includes('(') || trimmed.includes(')')) {
    return false;
  }

  return /^[A-Z][A-Za-z'&/\s-]{1,40}\.$/.test(trimmed) && trimmed.split(/\s+/).length <= 5;
};

const isAllCapsContent = (value: string) => {
  const lettersOnly = value.replace(/[^A-Za-z]+/g, '');

  return lettersOnly.length > 12 && lettersOnly === lettersOnly.toUpperCase();
};

const parseInlineContent = (value: string): LegalInlineNode[] => {
  if (!value) {
    return [];
  }

  const nodes: LegalInlineNode[] = [];
  const tokenPattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
  let cursor = 0;

  value.replace(tokenPattern, (match, _group, offset: number) => {
    if (offset > cursor) {
      nodes.push({ type: 'text', value: value.slice(cursor, offset) });
    }

    if (match.startsWith('**') && match.endsWith('**')) {
      nodes.push({ type: 'strong', value: match.slice(2, -2) });
    } else if (match.startsWith('`') && match.endsWith('`')) {
      const codeValue = normalizeOwnedLinks(match.slice(1, -1));
      if (/^https?:\/\//i.test(codeValue)) {
        nodes.push({ type: 'link', href: codeValue, value: codeValue, codeStyle: true });
      } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(codeValue)) {
        nodes.push({ type: 'link', href: `mailto:${codeValue}`, value: codeValue, codeStyle: true });
      } else {
        nodes.push({ type: 'code', value: codeValue });
      }
    } else if (match.startsWith('[')) {
      const linkMatch = match.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        nodes.push({ type: 'link', href: normalizeOwnedLinks(linkMatch[2]), value: linkMatch[1] });
      }
    } else if (match.includes('@') && !match.includes('://')) {
      const { trimmed, trailing } = stripTrailingPunctuation(match);
      nodes.push({ type: 'link', href: `mailto:${trimmed}`, value: trimmed });
      if (trailing) {
        nodes.push({ type: 'text', value: trailing });
      }
    } else {
      const normalizedUrl = normalizeOwnedLinks(match);
      const { trimmed, trailing } = stripTrailingPunctuation(normalizedUrl);
      nodes.push({ type: 'link', href: trimmed, value: trimmed });
      if (trailing) {
        nodes.push({ type: 'text', value: trailing });
      }
    }

    cursor = offset + match.length;

    return match;
  });

  if (cursor < value.length) {
    nodes.push({ type: 'text', value: value.slice(cursor) });
  }

  return nodes;
};

const toPlainText = (nodes: LegalInlineNode[]) => nodes.map((node) => node.value).join('').trim();

const detectListItem = (line: string) => {
  const trimmed = line.trim();

  const bulletMatch = trimmed.match(/^[•*-]\s+(.+)$/);
  if (bulletMatch) {
    return { style: 'bullet' as const, content: bulletMatch[1] };
  }

  const romanMatch = trimmed.match(/^([ivxlcdm]+)\.\s+(.+)$/i);
  if (romanMatch && romanTokens.has(romanMatch[1].toLowerCase())) {
    return { style: 'ordered-roman' as const, content: romanMatch[2], marker: `${romanMatch[1]}.` };
  }

  const alphaMatch = trimmed.match(/^([a-z])[.)]\s+(.+)$/i);
  if (alphaMatch) {
    return { style: 'ordered-alpha' as const, content: alphaMatch[2], marker: `${alphaMatch[1]}.` };
  }

  const decimalMatch = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
  if (decimalMatch) {
    return { style: 'ordered-decimal' as const, content: decimalMatch[2], marker: `${decimalMatch[1]}.` };
  }

  return null;
};

export const parseLegalMarkdown = (source: string): LegalDocument => {
  const lines = normalizeOwnedLinks(source).replace(/\r\n/g, '\n').split('\n');
  const blocks: LegalBlock[] = [];
  const headings: LegalHeadingOutlineItem[] = [];
  const meta: LegalMetaEntry[] = [];
  const slugCounts = new Map<string, number>();
  let titleNodes: LegalInlineNode[] = [];
  let plainTitle = '';
  let index = 0;

  while (index < lines.length) {
    const currentLine = lines[index];
    const trimmed = currentLine.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3;
      const content = parseInlineContent(headingMatch[2].trim());
      const plainText = toPlainText(content);

      if (level === 1) {
        titleNodes = content;
        plainTitle = plainText;
      } else {
        const id = createSlug(plainText, slugCounts);
        blocks.push({ type: 'heading', content, id, level, plainText });
        headings.push({ id, level, text: plainText });
      }

      index += 1;
      continue;
    }

    const metaMatch = trimmed.match(/^\*\*([^*]+?):\*\*\s+(.+)$/);
    if (metaMatch && blocks.length === 0) {
      meta.push({ label: metaMatch[1], value: parseInlineContent(metaMatch[2].trim()) });
      index += 1;
      continue;
    }

    const listItem = detectListItem(trimmed);
    if (listItem) {
      const items: LegalListItem[] = [];
      const { style } = listItem;

      while (index < lines.length) {
        const nextItem = detectListItem(lines[index]);
        if (nextItem && nextItem.style === style) {
          items.push({ content: parseInlineContent(nextItem.content), marker: nextItem.marker });
          index += 1;
          continue;
        }

        if (!lines[index].trim()) {
          let lookaheadIndex = index;

          while (lookaheadIndex < lines.length && !lines[lookaheadIndex].trim()) {
            lookaheadIndex += 1;
          }

          const resumedItem = lookaheadIndex < lines.length ? detectListItem(lines[lookaheadIndex]) : null;
          if (resumedItem && resumedItem.style === style) {
            index = lookaheadIndex;
            continue;
          }
        }

        break;
      }

      blocks.push({ type: 'list', items, style });
      continue;
    }

    if (looksLikeStandaloneLabel(currentLine, lines[index + 1])) {
      blocks.push({
        type: 'paragraph',
        content: parseInlineContent(trimmed.replace(/\.$/, '')),
        isLabel: true,
      });
      index += 1;
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (!nextLine) {
        break;
      }

      if (nextLine.match(/^(#{1,3})\s+/) || detectListItem(nextLine) || looksLikeStandaloneLabel(nextLine, lines[index + 1])) {
        break;
      }

      paragraphLines.push(nextLine);
      index += 1;
    }

    const paragraphText = paragraphLines.join(' ');
    blocks.push({
      type: 'paragraph',
      content: parseInlineContent(paragraphText),
      isEmphasis: isAllCapsContent(paragraphText),
    });
  }

  if (!plainTitle) {
    plainTitle = 'Ecoride Legal';
    titleNodes = [{ type: 'text', value: plainTitle }];
  }

  return {
    blocks,
    headings,
    meta,
    plainTitle,
    title: titleNodes,
  };
};

export const getLegalDocument = async (slug: LegalDocumentSlug) => {
  const source = await readFile(documentPaths[slug], 'utf8');

  return parseLegalMarkdown(source);
};