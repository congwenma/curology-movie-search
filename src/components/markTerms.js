import React from "react";
export const MARK_TERMS_CLASSNAME = "bold underline highlight-text";

export default function(words, terms) {
  if (!words) return words;
  if (terms) {
    const splitTerms = terms
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(/\s+/);
    const result = [];
    let lastIndex = 0;

    // ['this', 'that'] => /this|that/
    const regex = new RegExp("(" + splitTerms.join("|") + ")", "ig");

    words.replace(regex, (match, group, index) => {
      if (index > lastIndex) {
        result.push(words.slice(lastIndex, index));
      }

      result.push(
        <mark key={index} className={MARK_TERMS_CLASSNAME}>
          {match}
        </mark>
      );
      lastIndex = index + match.length;
    });

    if (lastIndex < words.length) {
      result.push(words.slice(lastIndex));
    }
    return result;
  } else {
    return [words];
  }
}
