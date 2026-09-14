import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: React.ElementType;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 200,
  speed = 30,
  style = {},
  className = "",
  as: Component = "span",
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    setDisplayedText("");

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  const Comp = Component as any;

  return (
    <Comp className={className} style={{ ...style, whiteSpace: "pre-line" }}>
      {displayedText}
      {displayedText.length < text.length && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            backgroundColor: "currentColor",
            marginLeft: "2px",
            verticalAlign: "middle",
            opacity: 0.8,
            animation: "blink 0.8s infinite",
          }}
        />
      )}
    </Comp>
  );
};
