import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface TypewriterAnimationProps {
  messages?: string[];
  className?: string;
  /** When false, the animation is held (nothing shown) until it flips true. */
  active?: boolean;
}

export default function TypewriterAnimation({
  messages: messagesProp,
  className = "",
  active = true
}: TypewriterAnimationProps) {
  const { t, i18n } = useTranslation();
  // Resolve the rotating phrases from the active locale. Memoized on the
  // language so the array reference is stable across renders (t(returnObjects)
  // returns a fresh array each call, which would otherwise reset the animation
  // every render via the effect's dependency below).
  const messages = useMemo(
    () => messagesProp ?? (t("hero.typewriter", { returnObjects: true }) as string[]),
    [messagesProp, i18n.language, t]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  // Start empty so the very first phrase types in from nothing.
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Held until the intro releases control.
    if (!active) return;

    const currentMessage = messages[currentIndex];

    const handleTypewriter = () => {
      if (isPaused) {
        // Pause for 1 second at full message
        const pauseTimer = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(pauseTimer);
      }

      if (isDeleting) {
        // Delete characters one by one
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next message
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % messages.length);
        }
      } else {
        // Type characters
        if (displayText.length < currentMessage.length) {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        } else {
          // Message complete, pause
          setIsPaused(true);
        }
      }
    };

    // Typing: ~0.5s total for the whole phrase, so the bubble grows as it types.
    // Deletion: ~0.5s total for the entire message.
    const typeSpeed = Math.max(16, 500 / currentMessage.length);
    const deletionSpeed = displayText.length > 0 ? 500 / currentMessage.length : 50;
    const speed = isDeleting ? deletionSpeed : typeSpeed;
    const timer = setTimeout(handleTypewriter, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, displayText, isDeleting, isPaused, messages, active]);

  return (
    <div className={`${className}`}>
      {active && (
        // Each phrase is styled as a sent-message bubble that grows as it types.
        <span
          className="inline-flex items-center rounded-[20px] px-4 py-2 text-lg md:text-xl font-medium leading-tight text-white shadow-sm"
          style={{ background: "#0A7AFF" }}
        >
          {displayText}
          <span className="ml-[1px] animate-pulse text-white/80">|</span>
        </span>
      )}
    </div>
  );
}
