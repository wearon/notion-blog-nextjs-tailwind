import styles from "../pages/post.module.css";
import React from "react";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    const className = [
      bold ? "font-bold" : "",
      code ? "bg-gray-200 rounded-sm font-mono" : "",
      italic ? "font-italic" : "",
      strikethrough ? "line-through" : "",
      underline ? "underline" : "",
    ]
      .join(" ")
      .trim();

    return (
      <span
        className={className ? className : undefined}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};
