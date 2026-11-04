import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Privacy",
  description: "Privacy policy for nova-mail, Liz Hagearty's personal email assistant.",
};

const BLUR_FADE_DELAY = 0.04;

export default function PrivacyPage() {
  return (
    <section className="space-y-6 text-sm leading-relaxed">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-2 tracking-tighter">privacy</h1>
        <p className="text-xs text-muted-foreground">last updated november 4, 2026</p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p>
          nova-mail is a personal tool that Liz Hagearty runs on her own computer. It is not a
          public app and only Liz&apos;s own Google accounts can sign in to it.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="font-medium text-base tracking-tight">what it accesses</h2>
        <p>
          With permission, nova-mail reads Gmail, Google Calendar and Google Drive to sort email,
          draft replies, and track deadlines. It saves drafts but does not send email on its own.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <h2 className="font-medium text-base tracking-tight">where data goes</h2>
        <p>
          Data stays on Liz&apos;s computer and in her own Google account. It is never sold,
          shared with third parties, or used for advertising. Use of information received from
          Google APIs adheres to the{" "}
          <a
            className="underline"
            href="https://developers.google.com/terms/api-services-user-data-policy"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="font-medium text-base tracking-tight">removing access</h2>
        <p>
          Access can be revoked any time at{" "}
          <a className="underline" href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          . Questions: lizhagearty@gmail.com.
        </p>
      </BlurFade>
    </section>
  );
}
