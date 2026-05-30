"use client"

import type React from "react"
import "./shiny-button.css"

export interface ShinyButtonColors {
  bg?: string
  bgSubtle?: string
  fg?: string
  highlight?: string
  highlightSubtle?: string
}

interface ShinyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode
  className?: string
  colors?: ShinyButtonColors
  href?: string
  target?: string
  rel?: string
}

function colorVars(colors?: ShinyButtonColors): React.CSSProperties | undefined {
  if (!colors) return undefined
  return {
    ...(colors.bg && { "--shiny-cta-bg": colors.bg }),
    ...(colors.bgSubtle && { "--shiny-cta-bg-subtle": colors.bgSubtle }),
    ...(colors.fg && { "--shiny-cta-fg": colors.fg }),
    ...(colors.highlight && { "--shiny-cta-highlight": colors.highlight }),
    ...(colors.highlightSubtle && {
      "--shiny-cta-highlight-subtle": colors.highlightSubtle,
    }),
  } as React.CSSProperties
}

export function ShinyButton({
  children,
  className = "",
  colors,
  href,
  target,
  rel,
  style,
  ...props
}: ShinyButtonProps) {
  const mergedStyle = { ...colorVars(colors), ...style }

  const classes = `shiny-cta ${className}`.trim()

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={mergedStyle}
      >
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button type="button" className={classes} style={mergedStyle} {...props}>
      <span>{children}</span>
    </button>
  )
}
