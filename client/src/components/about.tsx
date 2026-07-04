import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { PrivacyPolicyContent } from "@/components/privacy-policy-content";
import { TermsOfUseContent } from "@/components/terms-of-use-content";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-secondary mb-6">{t("about.title")}</h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">{t("about.p1")}</p>
              <p className="text-lg leading-relaxed">{t("about.p2")}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-primary font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
                    >
                      {t("legalPages.privacyTitle")}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{t("about.privacyDialogTitle")}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] pr-4">
                      <PrivacyPolicyContent />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-primary font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
                    >
                      {t("legalPages.termsTitle")}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{t("about.termsDialogTitle")}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] pr-4">
                      <TermsOfUseContent />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="relative"></div>
        </div>
      </div>
    </section>
  );
}
