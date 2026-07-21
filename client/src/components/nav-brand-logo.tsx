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

interface NavBrandLogoProps {
  /** Final total height of the I-beam in px. */
  size?: number;
}

/**
 * The Arcatext I-beam rendered as five rectangles (one column + four corner
 * beams) — the same construction as the app's splash screen. It builds itself
 * on cue: the vertical column grows from the centre, the four beams grow
 * outward from the column, then slide into their final serif positions.
 *
 * It waits for the homepage intro (via `introBus`); on any page without an
 * intro (or under reduced-motion) it simply renders fully-formed.
 */
export default function NavBrandLogo({ size = 20 }: NavBrandLogoProps) {
  const reduceMotion = useReducedMotion();

  const k = size / DESIGN.totalH;
  const columnW = DESIGN.columnW * k;
  const columnH = DESIGN.columnH * k;
  const beamWFull = DESIGN.beamW * k;
  const beamH = DESIGN.beamH * k;
  const totalW = DESIGN.totalW * k;

  // Animated values (start collapsed).
  const [columnHeight, setColumnHeight] = useState(0);
  const [beamW, setBeamW] = useState(0);
  const [beamShift, setBeamShift] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };

    const build = (instant: boolean) => {
      clearTimers();
      if (instant || reduceMotion) {
        setColumnHeight(columnH);
        setBeamW(beamWFull);
        setBeamShift(beamH);
        return;
      }
      // Step 1: grow the column from the centre (0.4s, via CSS transition).
      setColumnHeight(columnH);
      // Step 2: grow the beams outward from the column (0.2s @ 0.4s).
      timers.current.push(window.setTimeout(() => setBeamW(beamWFull), 400));
      // Step 3: slide the beams into the final I-beam position (0.2s @ 0.6s).
      timers.current.push(window.setTimeout(() => setBeamShift(beamH), 600));
    };

    const unsub = introBus.subscribe((phase) => {
      if (phase === "building") build(false);
    });

    // Decide the starting behaviour based on the current intro phase.
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

  const rect = (style: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    backgroundColor: BRAND,
    ...style,
  });

  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "inline-block",
        width: totalW,
        height: size,
        flexShrink: 0,
      }}
    >
      {/* Vertical column */}
      <span
        style={rect({
          width: columnW,
          height: columnHeight,
          transform: "translate(-50%, -50%)",
          transition: "height 0.4s ease-in-out",
        })}
      />
      {/* Top-left beam */}
      <span
        style={rect({
          width: beamW,
          height: beamH,
          transform: `translate(-50%, -50%) translate(${-beamX}px, ${-beamY - beamShift}px)`,
          transition: "width 0.2s ease-in-out, transform 0.2s ease-in-out",
        })}
      />
      {/* Top-right beam */}
      <span
        style={rect({
          width: beamW,
          height: beamH,
          transform: `translate(-50%, -50%) translate(${beamX}px, ${-beamY - beamShift}px)`,
          transition: "width 0.2s ease-in-out, transform 0.2s ease-in-out",
        })}
      />
      {/* Bottom-left beam */}
      <span
        style={rect({
          width: beamW,
          height: beamH,
          transform: `translate(-50%, -50%) translate(${-beamX}px, ${beamY + beamShift}px)`,
          transition: "width 0.2s ease-in-out, transform 0.2s ease-in-out",
        })}
      />
      {/* Bottom-right beam */}
      <span
        style={rect({
          width: beamW,
          height: beamH,
          transform: `translate(-50%, -50%) translate(${beamX}px, ${beamY + beamShift}px)`,
          transition: "width 0.2s ease-in-out, transform 0.2s ease-in-out",
        })}
      />
    </span>
  );
}
