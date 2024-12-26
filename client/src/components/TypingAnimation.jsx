import { useState, useEffect } from "react";
import { Highlight } from "@chakra-ui/react";
import PropTypes from "prop-types";

const TypingAnimation = ({ text, duration = 150 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, duration);
    } else {
      timeout = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, duration * 10); // Pause before resetting
    }
    return () => clearTimeout(timeout);
  }, [index, text, duration]);

  return (
    <Highlight
      query={text}
      styles={{ px: "3", py: "1", rounded: "full", bg: "yellow" }}
      size="2xl"
    >
      {displayText}
    </Highlight>
  );
};

TypingAnimation.propTypes = {
  duration: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default TypingAnimation;
