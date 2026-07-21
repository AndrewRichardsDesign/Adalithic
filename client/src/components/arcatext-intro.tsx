import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

// The Arcatext app icon (blue I-beam text cursor). It ships as an opaque PNG
// with a white background, so we composite it with `mix-blend-mode: multiply`
// — over the light hero/nav surfaces the white drops out and only the blue
// glyph shows.
const APP_ICON = "/AppIcon.png";

// The glyph occupies ~60% of the square canvas vertically. To make the visible
// I-beam match a target line-height, the image box must be scaled up by 1/0.6.
const GLYPH_RATIO = 0.6;

interface ArcatextIntroProps {
  /** The hero <h1> ("Meet Arcatext.") the icon scans across. */
  titleRef: RefObject<HTMLElement>;
  /** The typewriter "text field" the icon shrinks down to and clicks. */
  fieldRef: RefObject<HTMLElement>;
  /** Fires when the icon lands in the field — cue the highlight. */
  onLand: () => void;
  /** Fires on click-release — the icon vanishes and typing should begin. */
  onRelease: () => void;
}

type IconStyle = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  brightness: number;
  scale: number;
  transition: string;
};

/**
 * The page-load flourish: the app icon scans across the "Meet Arcatext"
 * headline at headline size, glides down while shrinking to the typewriter
 * line, "clicks" into it (darken + squish + release), then disappears so the
 * typing animation can take over.
 *
 * Rendered as a single fixed-position <img> driven imperatively so we control
 * each leg's easing/duration independently.
 */
export default function ArcatextIntro({
  titleRef,
  fieldRef,
  onLand,
  onRelease,
}: ArcatextIntroProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Respect reduced-motion: skip the flourish, start typing immediately.
    if (reduceMotion) {
      onRelease();
      return;
    }

    const iconEl = document.getElementById("arcatext-fly-icon") as HTMLImageElement | null;
    if (!iconEl) {
      onRelease();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)));
    // Two rAFs guarantee the browser paints the pre-transition state first.
    const nextFrame = () =>
      new Promise<void>((res) =>
        requestAnimationFrame(() => requestAnimationFrame(() => res()))
      );

    const apply = (s: IconStyle) => {
      iconEl.style.left = `${s.left}px`;
      iconEl.style.top = `${s.top}px`;
      iconEl.style.height = `${s.size}px`;
      iconEl.style.width = `${s.size}px`;
      iconEl.style.opacity = `${s.opacity}`;
      iconEl.style.filter = `brightness(${s.brightness})`;
      iconEl.style.transform = `translate(-50%, -50%) scale(${s.scale})`;
      iconEl.style.transition = s.transition;
    };

    const lineHeightOf = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      let lh = parseFloat(cs.lineHeight);
      if (!isFinite(lh)) lh = parseFloat(cs.fontSize) * 1.15;
      return lh;
    };

    const run = async () => {
      const title = titleRef.current;
      const field = fieldRef.current;
      if (!title || !field) {
        onRelease();
        return;
      }

      // Let the hero's entrance animation settle before measuring.
      await wait(500);
      if (cancelled) return;

      const titleLh = lineHeightOf(title);
      const titleSize = titleLh / GLYPH_RATIO;
      let tr = title.getBoundingClientRect();

      // 1) Appear at the left edge of the headline, faded out.
      apply({
        left: tr.left + titleLh * 0.4,
        top: tr.top + tr.height / 2,
        size: titleSize,
        opacity: 0,
        brightness: 1,
        scale: 1,
        transition: "none",
      });
      await nextFrame();
      if (cancelled) return;

      // 2) Fade in.
      iconEl.style.transition = "opacity 0.25s ease";
      iconEl.style.opacity = "1";
      await wait(230);
      if (cancelled) return;

      // 3) Scan across the headline to its right edge.
      tr = title.getBoundingClientRect();
      iconEl.style.transition = "left 1s ease-in-out, top 1s ease-in-out";
      iconEl.style.left = `${tr.right - titleLh * 0.4}px`;
      iconEl.style.top = `${tr.top + tr.height / 2}px`;
      await wait(1050);
      if (cancelled) return;

      // 4) Glide down to the typewriter field, shrinking to its line-height.
      const fr = field.getBoundingClientRect();
      const fieldSize = lineHeightOf(field) / GLYPH_RATIO;
      iconEl.style.transition =
        "left 0.9s ease-in-out, top 0.9s ease-in-out, height 0.9s ease-in-out, width 0.9s ease-in-out";
      iconEl.style.left = `${fr.left + fr.width / 2}px`;
      iconEl.style.top = `${fr.top + fr.height / 2}px`;
      iconEl.style.height = `${fieldSize}px`;
      iconEl.style.width = `${fieldSize}px`;
      await wait(920);
      if (cancelled) return;

      // 5) Landed — trigger the field highlight.
      onLand();
      await wait(200);
      if (cancelled) return;

      // 6) Click down: darken + squish.
      iconEl.style.transition = "filter 0.12s ease-in, transform 0.12s ease-in";
      iconEl.style.filter = "brightness(0.58)";
      iconEl.style.transform = "translate(-50%, -50%) scale(0.82)";
      await wait(150);
      if (cancelled) return;

      // 7) Release: back to normal colour + scale.
      iconEl.style.transition = "filter 0.16s ease-out, transform 0.16s ease-out";
      iconEl.style.filter = "brightness(1)";
      iconEl.style.transform = "translate(-50%, -50%) scale(1)";
      await wait(180);
      if (cancelled) return;

      // 8) Vanish, and let the typing begin.
      iconEl.style.transition = "opacity 0.22s ease, transform 0.22s ease";
      iconEl.style.opacity = "0";
      iconEl.style.transform = "translate(-50%, -50%) scale(0.9)";
      onRelease();
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <img
      id="arcatext-fly-icon"
      src={APP_ICON}
      alt=""
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: 0,
        width: 0,
        opacity: 0,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
        zIndex: 60,
        willChange: "left, top, height, width, transform, opacity, filter",
      }}
    />
  );
}
