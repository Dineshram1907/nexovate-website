// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Text, TextStyle } from "react-native";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  style?: TextStyle | TextStyle[];
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 200,
  speed = 30,
  style,
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

  return <Text style={style}>{displayedText}</Text>;
};
