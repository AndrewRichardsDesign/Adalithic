import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe, Sparkles, HeartHandshake } from "lucide-react";
import { PrivacyPolicyContent } from "@/components/privacy-policy-content";
import { TermsOfUseContent } from "@/components/terms-of-use-content";

export default function About() {
  const { t } = useTranslation();

  const values = [
    { icon: Globe, key: "v1" },
    { icon: Sparkles, key: "v2" },
    { icon: HeartHandshake, key: "v3" },
  ];

  return (
    <section id="about" className="bg-cream-soft py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            {t("about.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-secondary leading-tight">
            {t("about.title")}
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t("about.p1")}</p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{t("about.p2")}</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0040DD]/10">
                <value.icon className="h-6 w-6 text-brand" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-secondary">
                {t(`about.${value.key}Title`)}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {t(`about.${value.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-brand font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
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
                className="text-brand font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
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
    </section>
  );
}
