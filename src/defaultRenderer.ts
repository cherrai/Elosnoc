import { LogLevel, Renderer } from './core.js'
import { IFont, font } from 'terminal-font'

const styleMap: Record<LogLevel, IFont> = {
  ALERT: font().yellow(),
  CRITICAL: font().red(),
  DEBUG: font().white(),
  EMERGENCY: font().red(),
  ERROR: font().red(),
  INFO: font().green(),
  NOTICE: font().green(),
  WARN: font().yellow(),
}

export const defaultRenderer: Renderer = (level, content) =>
  styleMap[level].apply(`[${new Date().toLocaleString('ja-jp')} ${level}] ${content}`)
