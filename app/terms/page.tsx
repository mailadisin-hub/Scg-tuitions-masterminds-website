import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SCG Tuitions Masterminds",
  description: "Terms governing use of the SCG Masterminds quiz platform.",
};

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: 1 June 2026</p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the SCG Masterminds quiz
        platform (&ldquo;the Platform&rdquo;) operated by SCG Tuitions (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using the Platform you agree to these Terms. If
        you do not agree, please do not use the Platform.
      </p>

      <Section title="1. About the Platform">
        <p>
          SCG Masterminds is a free, educational quiz tool designed to help children in Year 2 and
          Year 3 practise English comprehension and Maths. It is provided by SCG Tuitions as a
          supplementary learning resource.
        </p>
      </Section>

      <Section title="2. Eligibility and parental responsibility">
        <p>
          The Platform is intended for use by children aged 6–8 under the supervision of a parent
          or guardian. By submitting the results form you confirm that you are the parent or legal
          guardian of the child using the Platform, and that you consent to your contact details
          being used as described in our{" "}
          <a href="/privacy" className="text-blue-700 underline">
            Privacy Policy
          </a>
          .
        </p>
      </Section>

      <Section title="3. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Use the Platform for any unlawful purpose</li>
          <li>Attempt to scrape, copy, or reproduce the quiz content for commercial use</li>
          <li>
            Reverse-engineer, decompile, or tamper with the Platform or its underlying code
          </li>
          <li>Submit false or misleading information in the results form</li>
          <li>Use automated tools or bots to access or interact with the Platform</li>
        </ul>
      </Section>

      <Section title="4. Intellectual property">
        <p>
          All content on the Platform — including quiz questions, passages, explanations, graphics,
          and code — is owned by or licensed to SCG Tuitions and is protected by copyright.
        </p>
        <p className="mt-3">
          You may use the Platform for personal, non-commercial educational purposes only. You
          must not reproduce, distribute, or create derivative works from the content without our
          prior written permission.
        </p>
      </Section>

      <Section title="5. Disclaimer of warranties">
        <p>
          The Platform is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
          warranty of any kind. We do not guarantee that:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>The Platform will be uninterrupted or error-free</li>
          <li>Quiz scores or feedback will be 100% accurate at all times</li>
          <li>The Platform will meet any specific educational outcome for your child</li>
        </ul>
        <p className="mt-3">
          The Platform is a supplementary practice tool and is not a substitute for qualified
          teaching or professional educational assessment.
        </p>
      </Section>

      <Section title="6. Limitation of liability">
        <p>
          To the fullest extent permitted by English law, SCG Tuitions will not be liable for any
          indirect, incidental, or consequential loss arising from your use of the Platform,
          including loss of data, loss of educational opportunity, or reliance on quiz results.
        </p>
        <p className="mt-3">
          Nothing in these Terms limits our liability for death or personal injury caused by our
          negligence, fraud, or any other liability that cannot be excluded under English law.
        </p>
      </Section>

      <Section title="7. Third-party services">
        <p>
          The Platform uses Google Fonts (for typography) and, where configured, Google Sheets
          (to store results). These services are governed by Google&apos;s own terms and privacy
          policies. We are not responsible for the practices of third-party services.
        </p>
      </Section>

      <Section title="8. Changes to the Platform and Terms">
        <p>
          We may update, modify, or discontinue any part of the Platform at any time without
          notice. We may also update these Terms; the &ldquo;Last updated&rdquo; date will
          reflect any changes. Continued use of the Platform after an update means you accept
          the revised Terms.
        </p>
      </Section>

      <Section title="9. Governing law">
        <p>
          These Terms are governed by the laws of England and Wales. Any dispute arising from
          your use of the Platform will be subject to the exclusive jurisdiction of the courts
          of England and Wales.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:mail.adisin@gmail.com" className="text-blue-700 underline">
            mail.adisin@gmail.com
          </a>
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
