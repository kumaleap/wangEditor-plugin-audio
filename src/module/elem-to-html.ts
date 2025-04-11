/**
 * @description to html
 * @author wulijie
 */

import { Element } from 'slate'
import { AudioElement } from './custom-types'
import { genSizeStyledIframeHtml } from '../utils/dom'

function audioToHtml(elemNode: Element, childrenHtml?: string): string {
  const { src = '', poster = '', width = 'auto', height = 'auto' } = elemNode as AudioElement
  let res = '<div data-w-e-type="audio" data-w-e-is-void>\n'

  if (src.trim().indexOf('<iframe ') === 0) {
    // iframe 形式
    const iframeHtml = genSizeStyledIframeHtml(src, width, height)
    res += iframeHtml
  } else {
    // 其他，mp3 等 url 格式
    res += `<audio poster="${poster}" controls="true" width="${width}" height="${height}"><source src="${src}" type="audio/mp3"/></audio>`
  }
  res += '\n</div>'

  return res
}

export const audioToHtmlConf = {
  type: 'audio',
  elemToHtml: audioToHtml,
}