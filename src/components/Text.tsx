import styles from '../pages/post.module.css'
import React from 'react'

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value,i) => {
    
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value

    const className = [
      bold ? 'font-bold' : '',
      code ? 'bg-gray-100  font-mono p-0.5 text-red-500' : '',
      italic ? 'font-italic' : '',
      strikethrough ? 'line-through' : '',
      underline ? 'underline' : ''
    ]
      .join(' ')
      .trim()

    return (
      <span
        className={className ? className : undefined}
        style={color !== 'default' ? { color } : {}}
        key={text.content + '-' + i}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    )
  })
}
