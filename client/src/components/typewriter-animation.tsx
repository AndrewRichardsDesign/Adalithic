import { useState, useEffect } from "react";

interface TypewriterAnimationProps {
  messages?: string[];
  className?: string;
}

export default function TypewriterAnimation({
  messages = [
    "Learn a language",
    "Communicate for business",
    "Chat with international friends"
  ],
  className = ""
}: TypewriterAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(messages[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
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

    // Typing speed: 100ms per character
    // Deletion speed: 1000ms total for the entire message
    const deletionSpeed = displayText.length > 0 ? 1000 / currentMessage.length : 50;
    const speed = isDeleting ? deletionSpeed : 100;
    const timer = setTimeout(handleTypewriter, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, displayText, isDeleting, isPaused, messages]);

  return (
    <div className={`${className}`}>
      <span className="text-lg md:text-xl text-gray-600">
        {displayText}
        <span className="animate-pulse text-[#0040DD]">|</span>
      </span>
    </div>
  );
}
