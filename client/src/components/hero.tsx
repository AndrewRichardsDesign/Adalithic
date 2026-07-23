import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ArcatextIntro from "./arcatext-intro";
import HeroKeyboardAnimation from "./hero-keyboard-animation";
import { introBus } from "@/lib/intro-bus";

// The blue used by the keyboard's sent bubbles / send button.
const BUBBLE_BLUE = "#0A7AFF";

type Flyer = {
  text: string;
  startLeft: number;
  startTop: number;
  endLeft: number;
  endTop: number;
  startFont: number;
  endFont: number;
  endColor: string;
  maxW: number;
};

export default function Hero() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const subheaderText = t("hero.tagline");

  // --- Page-load intro animation orchestration ---
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [typingActive, setTypingActive] = useState(false);
  const [fieldHighlight, setFieldHighlight] = useState(false);
  const introTimers = useRef<number[]>([]);

  // The subheader is delivered by the keyboard: it types and "sends" the
  // subheader text, then a message bubble flies up from the keyboard, scales up
  // to subheader size, and — at its resting point — sheds its bubble (background
  // fades, text turns black) to become the real subheader. It stays hidden until
  // the flyer lands (or immediately, under reduced motion).
  const [subheaderShown, setSubheaderShown] = useState(false);
  const [flyer, setFlyer] = useState<Flyer | null>(null);

  useEffect(() => {
    if (reduceMotion) setSubheaderShown(true);
  }, [reduceMotion]);

  // The keyboard has typed and "sent" the subheader — launch the flyer from just
  // above the input field up to the subheader's resting position.
  const handleSubheaderSend = useCallback(() => {
    const field = fieldRef.current?.getBoundingClientRect();
    const tagEl = taglineRef.current;
    const tag = tagEl?.getBoundingClientRect();
    if (!field || !tagEl || !tag) {
      setSubheaderShown(true);
      return;
    }
    const cs = getComputedStyle(tagEl);
    setFlyer({
      text: subheaderText,
      startLeft: field.left + field.width / 2,
      startTop: field.top - 24,
      endLeft: tag.left + tag.width / 2,
      endTop: tag.top + tag.height / 2,
      startFont: 17,
      endFont: parseFloat(cs.fontSize),
      endColor: cs.color,
      // Wrap within the subheader's own width so the flyer lines up with the
      // real subheader at the end — one line on desktop, two on narrow screens.
      maxW: tag.width,
    });
  }, [subheaderText]);

  // Announce to the nav that an intro will play (so its logo waits to build),
  // and reset on unmount.
  useLayoutEffect(() => {
    introBus.set("armed");
    return () => {
      introBus.set("idle");
      introTimers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // The icon has landed in the typewriter field — light it up like a focused
  // text input.
  const handleLand = useCallback(() => setFieldHighlight(true), []);

  // The icon "clicked" and released — begin typing, fade the highlight back
  // out, and (1s later) have the nav build its logo.
  const handleRelease = useCallback(() => {
    setTypingActive(true);
    introTimers.current.push(
      window.setTimeout(() => setFieldHighlight(false), 700)
    );
    introTimers.current.push(
      window.setTimeout(() => introBus.set("building"), 1000)
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pt-28 pb-20 md:pt-32">
      {/* Page-load flourish: the app icon scans the headline, shrinks into the
          typewriter field, "clicks" it, then hands off to the typing. */}
      <ArcatextIntro
        titleRef={titleRef}
        fieldRef={fieldRef}
        onLand={handleLand}
        onRelease={handleRelease}
      />

      {/* Subheader delivery: a sent message bubble lingers above the keyboard
          for a beat, then flies up and scales to subheader size (still a blue
          bubble); at its resting point the bubble background fades and the text
          turns black, becoming the real subheader. */}
      {flyer && (
        <motion.div
          aria-hidden
          style={{
            position: "fixed",
            zIndex: 50,
            maxWidth: flyer.maxW,
            textAlign: "center",
            fontWeight: 700,
            lineHeight: 1.2,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          initial={{
            left: flyer.startLeft,
            top: flyer.startTop,
            fontSize: flyer.startFont,
            backgroundColor: BUBBLE_BLUE,
            color: "#ffffff",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 14,
            paddingRight: 14,
            borderRadius: 20,
          }}
          animate={{
            left: [flyer.startLeft, flyer.startLeft, flyer.endLeft, flyer.endLeft],
            top: [flyer.startTop, flyer.startTop, flyer.endTop, flyer.endTop],
            fontSize: [flyer.startFont, flyer.startFont, flyer.endFont, flyer.endFont],
            paddingTop: [8, 8, 8, 0],
            paddingBottom: [8, 8, 8, 0],
            paddingLeft: [14, 14, 14, 0],
            paddingRight: [14, 14, 14, 0],
            borderRadius: [20, 20, 20, 6],
            backgroundColor: [BUBBLE_BLUE, BUBBLE_BLUE, BUBBLE_BLUE, "rgba(10,122,255,0)"],
            color: ["#ffffff", "#ffffff", "#ffffff", flyer.endColor],
          }}
          transition={{ duration: 1.9, times: [0, 0.52, 0.84, 1], ease: "easeInOut" }}
          onAnimationComplete={() => {
            setSubheaderShown(true);
            setFlyer(null);
          }}
        >
          {flyer.text}
        </motion.div>
      )}

      {/* Soft brand glow behind the hero content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(0,64,221,0.18), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-7"
          >
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-secondary leading-[1.05]"
            >
              <Trans
                i18nKey="hero.title"
                components={{ brand: <span className="text-brand" /> }}
              />
            </h1>

            {/* Subheader — hidden until the keyboard "sends" it and the flyer
                lands in its place (kept in layout so the flyer can measure it). */}
            <p
              ref={taglineRef}
              className="text-xl md:text-2xl font-bold text-secondary"
              style={{ opacity: subheaderShown ? 1 : 0 }}
            >
              {subheaderText}
            </p>
          </motion.div>

          {/* Live keyboard animation. The page-load logo flies into its text
              field and, on "click", it types and sends the subheader (which
              flies up into place), then types, Rewords and sends the
              conversation, each message pushing the last up the stack. */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-8 flex justify-center"
          >
            <HeroKeyboardAnimation
              active={typingActive}
              focused={fieldHighlight}
              inputRef={fieldRef}
              taglineRef={taglineRef}
              titleRef={titleRef}
              subheaderText={subheaderText}
              onSubheaderSend={handleSubheaderSend}
            />
          </motion.div>

          {/* CTA buttons — now below the animation. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("features")}
              className="group bg-brand hover:bg-[#0036BB] text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-900/10 transition-all duration-200"
              data-testid="button-learn-more"
            >
              {t("hero.learnMore")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="border-gray-300 bg-white/70 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200"
              data-testid="button-get-in-touch"
            >
              {t("hero.getInTouch")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
