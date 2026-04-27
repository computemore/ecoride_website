import { BaseButton } from '@/components/ui/base-button';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { PublicLayout } from '@/layouts/public-layout';

const pageMeta = [
  {
    label: 'Effective Date',
    value: 'April 27, 2026',
  },
  {
    label: 'Applies To',
    value: 'Public rider and driver account deletion requests on Ecoride services.',
  },
  {
    label: 'Recovery Window',
    value: '30 days from the time an eligible deletion request is confirmed.',
  },
  {
    label: 'Support',
    value: `${appSettings.supportEmail} • ${appSettings.phoneNumbers[0]}`,
  },
];

const quickFacts = [
  {
    label: 'Identity verification',
    value: 'A deletion request does not proceed until Ecoride confirms it is really coming from you.',
  },
  {
    label: 'Grace period',
    value: 'Eligible access can still be restored during the 30-day recovery window if you change your mind.',
  },
  {
    label: 'Retention limits',
    value: 'Some records may still be retained where safety, legal, dispute, or financial obligations require it.',
  },
];

const reviewPoints = [
  'Use the deletion flow for the app or access type you actually want to remove.',
  'Read the recovery-window section before confirming if there is any chance you may need the account again soon.',
  'Contact support first if you are unsure whether your rider access, driver access, or both may be affected.',
];

const deletionSteps = [
  {
    number: '01',
    title: 'Verify your identity',
    description:
      'Before a deletion request can move forward, Ecoride verifies that the request is really coming from you using the contact details already attached to your account.',
  },
  {
    number: '02',
    title: 'Relevant access is frozen quickly',
    description:
      'Once the request is confirmed, the rider or driver access affected by that request is disabled so new bookings, trips, or account activity cannot continue through that flow.',
  },
  {
    number: '03',
    title: 'A 30-day recovery window begins',
    description:
      'For the next 30 days you can still restore eligible access by completing verification again. This protects people who acted by mistake or need to recover an account quickly.',
  },
  {
    number: '04',
    title: 'After the recovery window ends',
    description:
      'After that recovery window, the request continues through Ecoride account-handling processes. Some records may still be retained where law, safety, fraud prevention, or financial compliance require it.',
  },
];

const dataGroups = [
  {
    title: 'Profile and access information',
    items: ['Name, contact details, and sign-in access', 'Saved preferences and account settings', 'Active sessions on the affected app or service'],
  },
  {
    title: 'Trip-related records',
    items: ['Ride history and trip activity connected to your account', 'Saved places, convenience settings, and rider-side shortcuts', 'Driver-side platform access linked to the same account when applicable'],
  },
  {
    title: 'Payments, support, and compliance records',
    items: ['Billing and payout-related history may be retained where required', 'Safety, fraud, dispute, and support records may be kept when necessary', 'Some records may remain in limited form for legal or regulatory obligations'],
  },
  {
    title: 'Retention notice',
    paragraphs: [
      'Ecoride may retain limited records where this is needed for legal duties, fraud prevention, payment reconciliation, dispute resolution, platform safety, or other regulatory obligations.',
      'That may include limited transaction, safety, support, or audit records that cannot be removed immediately while those obligations are still active.',
    ],
  },
];

const nextSteps = [
  'Signed-in deletion management will appear here once public website authentication is live.',
  'Until then, use the Ecoride rider or driver app if the guided deletion flow is already available to you there.',
  `If you cannot access your app, contact ${appSettings.supportEmail} or call ${appSettings.phoneNumbers[0]} so support can help you verify the right next step.`,
];

const supportLinks = [
  { label: 'Email support', href: `mailto:${appSettings.supportEmail}` },
  { label: 'Call support', href: `tel:${appSettings.phoneNumbers[0].replace(/\s+/g, '')}` },
  { label: 'Read Privacy Policy', href: '/about/privacy-policy' },
];

export const DeleteMePage = () => (
  <PublicLayout pageKey="account">
    <section className="mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-14 pt-0 md:px-6 md:pt-0 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-[16px] font-semibold uppercase tracking-[0.26em] text-slate-950/72">Account Deletion</p>
          <h1 className="text-balance mx-auto mt-6 max-w-5xl text-2xl font-medium leading-[0.96] md:text-7xl md:text-4xl lg:text-[4.5rem] text-slate-950">
            Thinking of deleting your Ecoride account?
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-slate-950 md:text-[18px] md:leading-10 lg:mx-0">
            This page serves to explain how Ecoride handles account deletion requests, what changes immediately, and what to expect during the process
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <BaseButton href="#deletion-flow" variant="solid-dark">
              Review The Deletion Flow
            </BaseButton>
            <BaseButton href="#future-actions" variant="ghost-light">
              See Online Account Actions
            </BaseButton>
          </div>
        </div>

        <div className="hidden lg:block surface-card rounded-card border overflow-hidden border-white/20 bg-white/10 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.12)] md:p-6">
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-[#7C4A03]">Brief</p>
          {/* <p className="mt-4 text-base leading-7 text-slate-950">
            Deletion requests can affect access quickly. This page is designed to help users understand the process
          </p> */}
          <dl className="mt-8 grid gap-x-6 gap-y-5 border-t border-slate-950/12 pt-6 sm:grid-cols-2 xl:grid-cols-2">
            {pageMeta.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">{item.label}</dt>
                <dd className="mt-2 text-sm font-medium leading-6 text-slate-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* <div className="mt-8 grid gap-5 md:grid-cols-3">
        {quickFacts.map((fact) => (
          <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]" key={fact.label}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C4A03]">{fact.label}</p>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-950">{fact.value}</p>
          </article>
        ))}
      </div> */}
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description=""
        eyebrow="Before You Continue"
        title="Three things to review before you request deletion"
        tone="light"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reviewPoints.map((item, index) => (
          <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]" key={item}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffffe9] text-sm font-semibold text-[#7C4A03]">{index + 1}</span>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-950">{item}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="section-anchor mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8" id="deletion-flow">
      <SectionHeading
        description="Visualise properly, the steps taken during the process of deleting your account"
        eyebrow="How It Works"
        title="A step-by-step view of the deletion flow"
        tone="light"
      />

      <div className="relative mt-8 hidden lg:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-7 h-[3px] -translate-y-1/2 rounded-full bg-[#FFD08A]" />
        <div className="grid gap-5 lg:grid-cols-4">
          {deletionSteps.map((step, index) => (
            <div className="relative" key={step.number}>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-base font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
                  {index + 1}
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">Step {step.number}</p>
              </div>
              <article className="mt-5 min-h-[220px] surface-card rounded-card border border-white/20 bg-white/10 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-950">{step.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:hidden">
        {deletionSteps.map((step, index) => (
          <div className="relative pl-16" key={step.number}>
            {index < deletionSteps.length - 1 ? <div className="absolute left-[27px] top-14 h-[calc(100%-12px)] w-[3px] rounded-full bg-[#FFD08A]" /> : null}
            <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-base font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
              {index + 1}
            </div>
            <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">Step {step.number}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-950">{step.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="Different parts of your account are handled differently. Some details stop being available in active use quickly, while some records may stay available only where Ecoride must keep them for safety, legal, regulatory, dispute, or financial reasons. This page should also be read alongside the Ecoride Privacy Policy."
        eyebrow="Data And Access"
        title="What a deletion request can affect"
        tone="light"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dataGroups.map((group) => (
          <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]" key={group.title}>
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{group.title}</h3>
            {group.items ? (
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li className="flex gap-3 text-sm font-medium leading-6 text-slate-950" key={item}>
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffffffe9]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 space-y-4 text-sm font-medium leading-7 text-slate-950">
                {group.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>

    {/*
    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="This section is intentionally hidden for now while the public delete-me route stays focused on the primary deletion and support guidance."
        eyebrow="Multi-role guidance"
        title="Using more than one Ecoride role"
        tone="light"
      />
    </section>
    */}

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8" id="help-and-support">
      <SectionHeading
        description="If you cannot access your account, are unsure whether your rider or driver access will be affected, or need help during the grace period, use the support options below. Support can help you understand the process, but may still need verification before taking action on your account."
        eyebrow="Need Help?"
        title="Contact Ecoride before you proceed if anything looks unclear"
        tone="light"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">Support Contact</p>
          <ul className="mt-4 space-y-3 text-sm font-medium leading-6 text-slate-950">
            <li>{appSettings.supportEmail}</li>
            {appSettings.phoneNumbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </article>
        <article className="surface-card rounded-card border border-white/20 bg-white/10 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">Office</p>
          <ul className="mt-4 space-y-3 text-sm font-medium leading-6 text-slate-950">
            {appSettings.addressLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {supportLinks.map((link) => (
          <BaseButton href={link.href} key={link.href} variant={link.href.startsWith('/') ? 'ghost-light' : 'solid-dark'}>
            {link.label}
          </BaseButton>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8" id="future-actions">
      <div className="grid gap-10 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">Manage Deletion Online</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">Web-based account actions are in development</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-950 md:text-[18px] md:leading-9">
            Coming soon. Please now refer to the WHAT TO DO FOR NOW section
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BaseButton href={`mailto:${appSettings.supportEmail}`} variant="solid-dark">
              Ask Support First
            </BaseButton>
            <BaseButton href="#deletion-flow" variant="ghost-light">
              Review The Steps Again
            </BaseButton>
          </div>
        </div>

        <article className="surface-card rounded-card border border-white/20 bg-white/10 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.12)] md:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#7C4A03]">What To Do For Now</p>
          <ul className="mt-5 space-y-3">
            {nextSteps.map((step) => (
              <li className="flex gap-3 text-sm font-medium leading-7 text-slate-950" key={step}>
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffffffe9]" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  </PublicLayout>
);