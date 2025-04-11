/**
 * @description audio render elem
 * @author wulijie
 */

import { Element } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor, DomEditor } from '@wangeditor/editor'
import { AudioElement } from './custom-types'
import { genSizeStyledIframeHtml } from '../utils/dom'

function renderAudio(elemNode: Element, children: VNode[] | null, editor: IDomEditor): VNode {
  const { src = '', poster = '', width = 'auto', height = 'auto' } = elemNode as AudioElement

  // 是否选中
  const selected = DomEditor.isNodeSelected(editor, elemNode)

  let vnode: VNode
  if (src.trim().indexOf('<iframe ') === 0) {
    // 增加尺寸样式
    const iframeHtml = genSizeStyledIframeHtml(src, width, height)

    // iframe 形式，第三方音频
    vnode = h('div', {
      class: {
        'w-e-textarea-audio-container': true
      },
      attrs: {
        'data-selected': selected ? 'true' : '' // 标记为 选中
      },
      props: {
        innerHTML: iframeHtml // 内嵌第三方 iframe 音频
      }
    })
  } else {
    // 其他，mp3 格式
    const audioProps: any = {
      attrs: {
        controls: true,
        poster: poster
      }
    }
    
    // 添加尺寸
    if (width !== 'auto') audioProps.attrs.width = width
    if (height !== 'auto') audioProps.attrs.height = height

    const audioVnode = h('audio', 
      audioProps,
      [
        h('source', {
          attrs: {
            src: src,
            type: 'audio/mp3'
          }
        }),
        `Sorry, your browser doesn't support embedded audios.\n 抱歉，浏览器不支持 audio 音频`
      ]
    )

    vnode = h('div', {
      class: {
        'w-e-textarea-audio-container': true
      },
      attrs: {
        'data-selected': selected ? 'true' : '' // 标记为 选中
      }
    }, [audioVnode])
  }

  // 【注意】void node 中，renderElem 不用处理 children 。core 会统一处理。

  const containerVnode = h(
    'div',
    {
      props: {
        contentEditable: false,
      },
      on: {
        mousedown: e => e.preventDefault(),
      },
    },
    vnode
  )

  return containerVnode
}

const renderAudioConf = {
  type: 'audio', // 和 elemNode.type 一致
  renderElem: renderAudio,
}

export { renderAudioConf }