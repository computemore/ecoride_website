import { LegalDocumentView } from '@/components/legal/legal-document';
import { getLegalDocument, type LegalDocumentSlug } from '@/lib/legal-documents';
import { PublicLayout } from '@/layouts/public-layout';

interface LegalPageProps {
  slug: LegalDocumentSlug;
}

export const LegalPage = async ({ slug }: LegalPageProps) => {
  const document = await getLegalDocument(slug);

  return (
    <PublicLayout pageKey="about" tone="light">
      <section className="mx-auto max-w-content-wide px-4 pb-20 pt-2 md:px-6 md:pt-4 lg:px-8">
        <LegalDocumentView document={document} slug={slug} />
      </section>
    </PublicLayout>
  );
};