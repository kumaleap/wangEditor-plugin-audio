/**
 * @description parse html
 * @author wulijie
 */

import { Descendant } from 'slate'
import { IDomEditor } from '@wangeditor/editor'
import { AudioElement } from './custom-types'
import $, { DOMElement } from '../utils/dom'

function genAudioElem(
  src: string,
  poster: string = '',
  width = 'auto',
  height = 'auto'
): AudioElement {
  return {
    type: 'audio',
    src,
    poster,
    width,
    height,
    children: [{ text: '' }], // void 元素有一个空 text
  }
}

function parseHtml(elem: DOMElement, children: Descendant[], editor: IDomEditor): AudioElement {
  // 确保 elem 是有效的 DOM 元素
  if (!elem) {
    console.warn('Invalid DOM element for audio parsing')
    return genAudioElem('', '', 'auto', 'auto')
  }

  const $elem = $(elem)
  let src = ''
  let poster = ''
  let width = 'auto'
  let height = 'auto'

  try {
    // <iframe> 形式
    const $iframe = $elem.find('iframe')
    if ($iframe.length > 0) {
      width = $iframe.attr('width') || 'auto'
      height = $iframe.attr('height') || 'auto'
      src = $iframe[0]?.outerHTML || ''
      return genAudioElem(src, poster, width, height)
    }

    // <audio> 形式
    const $audio = $elem.find('audio')
    if ($audio.length > 0) {
      src = $audio.attr('src') || ''
      
      if (!src) {
        const $source = $audio.find('source')
        if ($source.length > 0) {
          src = $source.attr('src') || ''
        }
      }
      
      width = $audio.attr('width') || 'auto'
      height = $audio.attr('height') || 'auto'
      poster = $audio.attr('poster') || ''
    }
  } catch (error) {
    console.error('Error parsing audio element:', error)
  }

  return genAudioElem(src, poster, width, height)
}

export const parseHtmlConf = {
  selector: 'div[data-w-e-type="audio"]',
  parseElemHtml: parseHtml,
}