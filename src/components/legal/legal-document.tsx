import Link from 'next/link';
import { Fragment } from 'react';

import { ChevronDownIcon } from '@/icons';
import type { LegalBlock, LegalDocument, LegalInlineNode, LegalDocumentSlug } from '@/lib/legal-documents';
import { cn } from '@/utils/cn';

interface LegalDocumentProps {
  document: LegalDocument;
  slug: LegalDocumentSlug;
}

const legalPages = [
  { href: '/about/terms', label: 'Terms', slug: 'terms' },
  { href: '/about/privacy-policy', label: 'Privacy Policy', slug: 'privacy-policy' },
] as const;

const currentLegalPageBySlug: Record<LegalDocumentSlug, (typeof legalPages)[number]> = {
  terms: legalPages[0],
  'privacy-policy': legalPages[1],
};

const renderInlineNodes = (nodes: LegalInlineNode[]) =>
  nodes.map((node, index) => {
    if (node.type === 'strong') {
      return (
        <strong className="font-semibold text-slate-950" key={`${node.type}-${index}`}>
          {node.value}
        </strong>
      );
    }

    if (node.type === 'code') {
      return (
        <code className="rounded-full bg-slate-900/6 px-2 py-1 font-mono text-[0.92em] text-slate-900" key={`${node.type}-${index}`}>
          {node.value}
        </code>
      );
    }

    if (node.type === 'link') {
      const className = cn(
        'underline decoration-slate-400 underline-offset-4 transition hover:text-slate-950 hover:decoration-slate-700',
        node.codeStyle && 'rounded-full bg-slate-900/6 px-2 py-1 font-mono text-[0.92em] no-underline',
      );

      if (node.href.startsWith('/')) {
        return (
          <Link className={className} href={node.href} key={`${node.type}-${index}`}>
            {node.value}
          </Link>
        );
      }

      return (
        <a className={className} href={node.href} key={`${node.type}-${index}`} rel="noreferrer" target="_blank">
          {node.value}
        </a>
      );
    }

    return <Fragment key={`${node.type}-${index}`}>{node.value}</Fragment>;
  });

const renderBlock = (block: LegalBlock, index: number) => {
  if (block.type === 'heading') {
    if (block.level === 2) {
      return (
        <h2 className="scroll-mt-28 text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl" id={block.id} key={block.id}>
          {renderInlineNodes(block.content)}
        </h2>
      );
    }

    return (
      <h3 className="scroll-mt-28 text-base font-semibold tracking-[-0.03em] text-slate-900 sm:text-xl" id={block.id} key={block.id}>
        {renderInlineNodes(block.content)}
      </h3>
    );
  }

  if (block.type === 'list') {
    if (block.style === 'bullet') {
      return (
        <ul className="space-y-3" key={`list-${index}`}>
          {block.items.map((item, itemIndex) => (
            <li className="flex gap-3 text-sm leading-7 text-slate-700 md:text-base" key={`bullet-${itemIndex}`}>
              <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{renderInlineNodes(item.content)}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <ol className="space-y-3" key={`list-${index}`}>
        {block.items.map((item, itemIndex) => (
          <li className="flex gap-3 text-sm leading-7 text-slate-700 md:text-base" key={`ordered-${itemIndex}`}>
            <span className="w-9 shrink-0 font-semibold text-slate-500">{item.marker}</span>
            <span>{renderInlineNodes(item.content)}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p
      className={cn(
        'text-sm leading-7 text-slate-700 md:text-base',
        block.isLabel && 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-500',
        block.isEmphasis && 'font-semibold text-slate-900',
      )}
      key={`paragraph-${index}`}
    >
      {renderInlineNodes(block.content)}
    </p>
  );
};

export const LegalDocumentView = ({ document, slug }: LegalDocumentProps) => {
  const currentLegalPage = currentLegalPageBySlug[slug];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,280px),minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-2 lg:max-h-[calc(100vh-8rem)] lg:overflow-hidden">
        <div className="surface-card-light border border-slate-150 rounded-card p-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">About</p>
          <p className="mt-4 text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-2xl">Legal</p>
          <p className="mt-3 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
            Read the policies that govern how Ecoride handles service access, personal data, and essential user protections.
          </p>

          <details className="mt-6 group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-pill border border-slate-900/10 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-900/18">
              <span>{currentLegalPage.label}</span>
              <ChevronDownIcon className="h-4 w-4 text-slate-500 transition group-open:rotate-180" />
            </summary>

            <div className="mt-2 grid gap-2 rounded-[24px] border border-slate-900/8 bg-white p-2">
              {legalPages.map((page) => (
                <Link
                  className={cn(
                    'rounded-pill px-4 py-3 text-sm font-medium transition',
                    page.slug === slug
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950',
                  )}
                  href={page.href}
                  key={page.href}
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </details>

          {document.headings.length > 0 ? (
            <div className="mt-8 border-t border-slate-900/8 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">On This Page</p>
              <div className="mt-4 grid gap-2">
                {document.headings.map((heading) => (
                  <a
                    className={cn(
                        'text-[13px] leading-5 text-slate-600 transition hover:text-slate-950 sm:text-sm sm:leading-6',
                      heading.level === 3 && 'pl-4 text-[13px]',
                    )}
                    href={`#${heading.id}`}
                    key={heading.id}
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      {/* articles here, added break words to prevent transition overflows */}
      <article className="min-w-0 break-words transition rounded-[32px] border border-white/90 bg-white p-6 shadow-[0_24px_72px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
        <div className="border-b border-slate-900/8 pb-8">
          <Link className="text-sm font-medium text-slate-500 transition hover:text-slate-900" href="/about">
            Back to About
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{renderInlineNodes(document.title)}</h1>

          {document.meta.length > 0 ? (
            <div className="mt-6 flex flex-col gap-4 border-t border-slate-900/8 pt-5 sm:flex-row sm:items-start sm:justify-between">
              {document.meta.map((item, index) => (
                <div
                  className={cn('min-w-0', index === document.meta.length - 1 && 'sm:ml-auto sm:text-right')}
                  key={item.label}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{renderInlineNodes(item.value)}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 space-y-6">{document.blocks.map((block, index) => renderBlock(block, index))}</div>
      </article>
    </div>
  );
};