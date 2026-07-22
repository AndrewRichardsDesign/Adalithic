import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { introBus } from "@/lib/intro-bus";

// Brand blue (#0040DD) — matches the Arcatext app icon.
const BRAND = "#0040DD";

// Proportions taken from the SwiftUI splash (3x design): total height 150 =
// column 120 + 2 * beam-height 15; column width 21; beam width 36; total
// width 21 + 2*36 = 93. We scale all of these to `size` (the final total
// height in px).
const DESIGN = {
  totalH: 150,
  columnW: 21,
  columnH: 120,
  beamW: 36,
  beamH: 15,
  totalW: 93,
};

// Gap between the icon and the label once the slot has opened.
const GAP = 8;

// The glyph is centred this far above the text baseline so it lines up with
// the visual middle of the label (roughly the text's x-height centre).
const VERTICAL_OFFSET = "0.34em";

interface NavBrandLogoProps {
  /** Final total height of the I-beam in px. */
  size?: number;
}

/**
 * The Arcatext I-beam rendered as five rectangles (one column + four corner
 * beams) — the same construction as the app's splash screen.
 *
 * The reserving element is a **zero-height** inline spacer whose width grows
 * from 0 → the logo's width when cued. Because it has no height it never
 * affects the line box, so the "Arcatext" label keeps the exact same baseline
 * (and y-position) as the other nav labels. The glyph itself is positioned
 * **absolutely** (out of flow) inside that spacer, so its 20px height also
 * can't nudge the text.
 *
 * It waits for the homepage intro (via `introBus`); on any page without an
 * intro (or under reduced-motion) it renders fully-formed with no animation.
 */
export default function NavBrandLogo({ size = 20 }: NavBrandLogoProps) {
  const reduceMotion = useReducedMotion();

  const k = size / DESIGN.totalH;
  const columnW = DESIGN.columnW * k;
  const columnH = DESIGN.columnH * k;
  const beamWFull = DESIGN.beamW * k;
  const beamH = DESIGN.beamH * k;
  const totalW = DESIGN.totalW * k;

  const [slotOpen, setSlotOpen] = useState(false);
  const [columnHeight, setColumnHeight] = useState(0);
  const [beamW, setBeamW] = useState(0);
  const [beamShift, setBeamShift] = useState(0);
  const [instant, setInstant] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };

    const build = (now: boolean) => {
      clearTimers();
      if (now || reduceMotion) {
        setInstant(true);
        setSlotOpen(true);
        setColumnHeight(columnH);
        setBeamW(beamWFull);
        setBeamShift(beamH);
        return;
      }
      // 1) Open the slot — the nav item widens to make room for the icon.
      setSlotOpen(true);
      // 2) Once there's room, construct the I-beam into it.
      timers.current.push(window.setTimeout(() => setColumnHeight(columnH), 350));
      timers.current.push(window.setTimeout(() => setBeamW(beamWFull), 750));
      timers.current.push(window.setTimeout(() => setBeamShift(beamH), 950));
    };

    const unsub = introBus.subscribe((phase) => {
      if (phase === "building") build(false);
    });

    if (introBus.phase === "building") {
      build(true);
    } else if (introBus.phase === "idle") {
      // No Hero has armed an intro yet. If none does shortly, this page has no
      // intro (e.g. a legal page) — show the logo fully-formed.
      const idle = window.setTimeout(() => {
        if (introBus.phase === "idle") build(true);
      }, 250);
      timers.current.push(idle);
    }
    // phase === "armed": wait for the "building" signal above.

    return () => {
      unsub();
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // Inner edge of each beam stays flush to the column while it grows outward,
  // so the horizontal offset tracks the *current* beam width.
  const beamX = columnW / 2 + beamW / 2;
  const beamY = columnH / 2 - beamH / 2;

  const tSlot = instant ? "none" : "width 0.4s ease";
  const tColumn = instant ? "none" : "height 0.4s ease-in-out";
  const tBeam = instant ? "none" : "width 0.2s ease-in-out, transform 0.2s ease-in-out";

  const rect = (style: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    backgroundColor: BRAND,
    ...style,
  });

  return (
    // Zero-height inline spacer: reserves the horizontal width (animated) but
    // contributes nothing vertically, so the label's baseline is untouched.
    <span
      aria-hidden
      style={{
        display: "inline-block",
        position: "relative",
        verticalAlign: "baseline",
        height: 0,
        width: slotOpen ? totalW + GAP : 0,
        transition: tSlot,
      }}
    >
      {/* Glyph stage: absolutely positioned (out of flow) and vertically
          centred on the label, so its height never nudges the text. */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: totalW,
          height: size,
          transform: `translateY(calc(-50% - ${VERTICAL_OFFSET}))`,
        }}
      >
        {/* Vertical column */}
        <span
          style={rect({
            width: columnW,
            height: columnHeight,
            transform: "translate(-50%, -50%)",
            transition: tColumn,
          })}
        />
        {/* Top-left beam */}
        <span
          style={rect({
            width: beamW,
            height: beamH,
            transform: `translate(-50%, -50%) translate(${-beamX}px, ${-beamY - beamShift}px)`,
            transition: tBeam,
          })}
        />
        {/* Top-right beam */}
        <span
          style={rect({
            width: beamW,
            height: beamH,
            transform: `translate(-50%, -50%) translate(${beamX}px, ${-beamY - beamShift}px)`,
            transition: tBeam,
          })}
        />
        {/* Bottom-left beam */}
        <span
          style={rect({
            width: beamW,
            height: beamH,
            transform: `translate(-50%, -50%) translate(${-beamX}px, ${beamY + beamShift}px)`,
            transition: tBeam,
          })}
        />
        {/* Bottom-right beam */}
        <span
          style={rect({
            width: beamW,
            height: beamH,
            transform: `translate(-50%, -50%) translate(${beamX}px, ${beamY + beamShift}px)`,
            transition: tBeam,
          })}
        />
      </span>
    </span>
  );
}
