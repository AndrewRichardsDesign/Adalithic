// Dispatcher for the Arcatext privacy policy. English is the authoritative
// source (legal/privacy/en.tsx); the other locales are convenience translations
// selected from the active URL locale, falling back to English. Rendered both in
// the homepage About modal (about.tsx) and on the /privacy page.
import { useLocale } from "@/lib/locale";
import { ConvenienceBanner } from "@/components/legal/ConvenienceBanner";
import { PrivacyEn } from "@/components/legal/privacy/en";
import { PrivacyEs } from "@/components/legal/privacy/es";
import { PrivacyFr } from "@/components/legal/privacy/fr";
import { PrivacyDe } from "@/components/legal/privacy/de";
import { PrivacyJa } from "@/components/legal/privacy/ja";

export function PrivacyPolicyContent() {
  const { locale } = useLocale();
  switch (locale) {
    case "es":
      return (
        <>
          <ConvenienceBanner />
          <PrivacyEs />
        </>
      );
    case "fr":
      return (
        <>
          <ConvenienceBanner />
          <PrivacyFr />
        </>
      );
    case "de":
      return (
        <>
          <ConvenienceBanner />
          <PrivacyDe />
        </>
      );
    case "ja":
      return (
        <>
          <ConvenienceBanner />
          <PrivacyJa />
        </>
      );
    default:
      return <PrivacyEn />;
  }
}
