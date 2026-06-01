import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SCG Tuitions Masterminds",
  description: "How SCG Tuitions collects, uses and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: 1 June 2026</p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        This policy explains what personal data SCG Tuitions collects through the SCG Masterminds
        quiz platform, how we use it, and your rights under UK data-protection law (UK GDPR and the
        Data Protection Act 2018). Please read it carefully before using the platform.
      </p>

      <Section title="1. Who we are">
        <p>
          SCG Tuitions operates the SCG Masterminds quiz platform available at{" "}
          <a href="https://scgtuitions.co.uk" className="text-blue-700 underline">
            scgtuitions.co.uk
          </a>
          . We are the data controller for the personal data described in this policy.
        </p>
        <p className="mt-3">
          Contact us at:{" "}
          <a href="mailto:mail.adisin@gmail.com" className="text-blue-700 underline">
            mail.adisin@gmail.com
          </a>
        </p>
      </Section>

      <Section title="2. What data we collect">
        <p>When a quiz is completed and the results form is submitted, we collect:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Parent&apos;s name</strong> and <strong>email address</strong>
          </li>
          <li>
            <strong>Child&apos;s first name</strong> (used only to label the results)
          </li>
          <li>
            <strong>Quiz results</strong> — subject, score, percentage, question-by-question
            breakdown, and date
          </li>
        </ul>
        <p className="mt-3">We do not collect passwords, payment details, or precise location.</p>
      </Section>

      <Section title="3. How we use your data">
        <p>We use the data we collect to:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Display and save your child&apos;s quiz results on your device</li>
          <li>Provide downloadable results reports</li>
          <li>
            Send you occasional updates about SCG Tuitions courses and resources — only when you
            have ticked the consent checkbox on the results form
          </li>
        </ul>
      </Section>

      <Section title="4. Lawful basis for processing">
        <p>We rely on the following lawful bases under UK GDPR Article 6:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Consent</strong> — for sending marketing emails and for storing results in our
            records. You may withdraw consent at any time (see section 8).
          </li>
          <li>
            <strong>Legitimate interests</strong> — for saving results locally on your device so
            you can review your child&apos;s progress.
          </li>
        </ul>
        <p className="mt-3">
          Where we process a child&apos;s first name, we do so only to label results at the
          parent&apos;s request. We do not use children&apos;s data for any other purpose, and we
          do not build profiles of children.
        </p>
      </Section>

      <Section title="5. Where data is stored">
        <p>
          <strong>On your device:</strong> Quiz results, the parent name, and email address are
          saved in your browser&apos;s <em>localStorage</em>. This data never leaves your device
          unless you or we export it.
        </p>
        <p className="mt-3">
          <strong>Google Sheets (optional):</strong> If SCG Tuitions has connected a Google Apps
          Script endpoint, submitted results are also sent to a private Google Sheet accessible
          only to SCG Tuitions staff. Google processes this data in accordance with Google&apos;s
          own privacy policy. Data sent to Google is stored on Google&apos;s servers, which may be
          located outside the UK; Google LLC participates in the UK International Data Transfer
          Addendum framework.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          Data stored in localStorage remains on your device until you clear your browser data.
          You can delete it at any time using your browser settings or the download/export tool
          built into the platform.
        </p>
        <p className="mt-3">
          Data held in our Google Sheet is kept for no longer than two years, after which it is
          permanently deleted.
        </p>
      </Section>

      <Section title="7. Sharing your data">
        <p>We do not sell your personal data. We share data only with:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Google LLC</strong> — as our spreadsheet processor (see section 5)
          </li>
          <li>
            Law-enforcement or regulatory bodies if we are required to do so by law
          </li>
        </ul>
      </Section>

      <Section title="8. Your rights">
        <p>Under UK GDPR you have the right to:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Access</strong> the personal data we hold about you
          </li>
          <li>
            <strong>Rectify</strong> inaccurate data
          </li>
          <li>
            <strong>Erase</strong> your data (&ldquo;right to be forgotten&rdquo;)
          </li>
          <li>
            <strong>Restrict</strong> or <strong>object to</strong> processing
          </li>
          <li>
            <strong>Withdraw consent</strong> at any time without affecting the lawfulness of
            prior processing
          </li>
          <li>
            <strong>Lodge a complaint</strong> with the ICO at{" "}
            <a href="https://ico.org.uk" className="text-blue-700 underline">
              ico.org.uk
            </a>
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email us at{" "}
          <a href="mailto:mail.adisin@gmail.com" className="text-blue-700 underline">
            mail.adisin@gmail.com
          </a>
          . We will respond within one month.
        </p>
      </Section>

      <Section title="9. Cookies">
        <p>
          The Masterminds platform does not set any tracking or advertising cookies. It uses
          localStorage (not cookies) to store results on your device. We use Google Fonts, which
          may set performance-related cookies; these are governed by Google&apos;s privacy policy.
        </p>
      </Section>

      <Section title="10. Children's privacy">
        <p>
          We are aware that our platform is used by and with children. We do not knowingly collect
          any information directly from children. All data is entered by a parent or guardian. We
          process a child&apos;s first name only to label results at the parent&apos;s request and
          do not use it for any commercial purpose.
        </p>
        <p className="mt-3">
          If you believe we have inadvertently collected data about a child without parental
          consent, please contact us immediately at{" "}
          <a href="mailto:mail.adisin@gmail.com" className="text-blue-700 underline">
            mail.adisin@gmail.com
          </a>{" "}
          and we will delete it promptly.
        </p>
      </Section>

      <Section title="11. Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the
          top will change whenever we do. Continued use of the platform after an update constitutes
          acceptance of the revised policy.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}
