import Link from 'next/link';

import { PublicLayout } from '@/layouts/public-layout';
import { EcorideBackIcon } from '@/icons';

export default function LoginComingSoonPage() {
  return (
    <PublicLayout pageKey="comingSoon">
      <section className="mx-auto flex min-h-[70vh] max-w-content-wide items-center justify-center px-4 py-24 text-center md:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">Coming soon</p>
          <h1 className="mt-5 text-5xl font-semibold text-white md:text-6xl">Web-based Login feature is in the works.</h1>
          <Link className="mt-8 inline-flex rounded-[6px] bg-white px-3 py-2 text-sm font-semibold text-slate-950 gap-2 items-center" href="/">
            <EcorideBackIcon className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}