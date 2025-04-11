/**
 * @description pre parse html
 * @author wuliije
 */

import $, { getTagName, DOMElement } from '../utils/dom'

/**
 * pre-prase audio ，兼容 V4
 * @param elem elem
 */
function preParse(elem: DOMElement): DOMElement {
  const $elem = $(elem)
  let $audio = $elem

  const elemTagName = getTagName($elem)
  if (elemTagName === 'p') {
    // v4 的 audio 或 iframe 是被 p 包裹的
    // 修改这一行，将 children() 方法调用改为获取 children 属性
    const children = Array.from($elem[0].children || [])
    if (children.length === 1) {
      const firstChild = children[0]
      const firstChildTagName = firstChild.tagName.toLowerCase()
      if (['iframe', 'audio'].includes(firstChildTagName)) {
        // p 下面包含 iframe 或 audio
        $audio = $(firstChild)
      }
    }
  }

  const audioTagName = getTagName($audio)
  if (audioTagName !== 'iframe' && audioTagName !== 'audio') return $audio[0]

  // 已经符合 V5 格式
  const $parent = $audio.parent()
  if ($parent.attr('data-w-e-type') === 'audio') return $audio[0]

  const $container = $(`<div data-w-e-type="audio" data-w-e-is-void></div>`)
  $container.append($audio)

  return $container[0]
}

export const preParseHtmlConf = {
  selector: 'iframe,audio,p',
  preParseHtml: preParse,
}