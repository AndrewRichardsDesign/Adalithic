// Dispatcher for the Arcatext Terms of Use. English is the authoritative source
// (legal/terms/en.tsx); the other locales are convenience translations selected
// from the active URL locale, falling back to English. Rendered both in the
// homepage About modal (about.tsx) and on the /terms page.
import { useLocale } from "@/lib/locale";
import { ConvenienceBanner } from "@/components/legal/ConvenienceBanner";
import { TermsEn } from "@/components/legal/terms/en";
import { TermsEs } from "@/components/legal/terms/es";
import { TermsFr } from "@/components/legal/terms/fr";
import { TermsDe } from "@/components/legal/terms/de";
import { TermsJa } from "@/components/legal/terms/ja";

export function TermsOfUseContent() {
  const { locale } = useLocale();
  switch (locale) {
    case "es":
      return (
        <>
          <ConvenienceBanner />
          <TermsEs />
        </>
      );
    case "fr":
      return (
        <>
          <ConvenienceBanner />
          <TermsFr />
        </>
      );
    case "de":
      return (
        <>
          <ConvenienceBanner />
          <TermsDe />
        </>
      );
    case "ja":
      return (
        <>
          <ConvenienceBanner />
          <TermsJa />
        </>
      );
    default:
      return <TermsEn />;
  }
}
