import Link from 'next/link';

import { PublicLayout } from '@/layouts/public-layout';

export default function NotFound() {
  return (
    <PublicLayout pageKey="home">
      <section className="mx-auto flex min-h-[70vh] max-w-content-wide items-center justify-center px-4 py-24 text-center md:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">404</p>
          <h1 className="mt-5 text-5xl font-semibold text-white md:text-6xl">That route is not part of the public site yet</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/76">
            The initial launch focuses on the main acquisition pages first. Use the primary navigation to continue exploring Ecoride.
          </p>
          <Link className="mt-8 inline-flex rounded-pill bg-white px-5 py-3 text-sm font-medium text-[#f0453d]" href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}