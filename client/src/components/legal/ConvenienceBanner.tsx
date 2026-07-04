import { useTranslation } from "react-i18next";

// Shown above translated legal pages. Our legal documents are authoritative in
// English; localized versions are provided for convenience only. (Québec French
// is treated as a genuine version per Bill 96 — see note in the tracker.)
export function ConvenienceBanner() {
  const { t } = useTranslation();
  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-lg p-4 mb-6">
      {t("legalPages.convenienceNotice")}
    </div>
  );
}
