/**
 * @description insert audio
 * @author wulijie
 */

import { Transforms } from 'slate'
import { IDomEditor } from '@wangeditor/editor'
import { replaceSymbols } from '../../utils/utils'
import { AudioElement } from '../custom-types'

/**
 * 插入音频
 * @param editor editor
 * @param src audio src
 * @param poster audio poster
 */
export default async function (editor: IDomEditor, src: string, poster = '') {
  if (!src) return

  // 还原选区
  editor.restoreSelection()

  // 校验
  const { onInsertedAudio, checkAudio, parseAudioSrc } = editor.getMenuConfig('insertAudio')
  const checkRes = await checkAudio(src, poster)
  if (typeof checkRes === 'string') {
    // 校验失败，给出提示
    editor.alert(checkRes, 'error')
    return
  }
  if (checkRes == null) {
    // 校验失败，不给提示
    return
  }

  // 转换 src
  let parsedSrc = await parseAudioSrc(src)

  if (parsedSrc.trim().indexOf('<iframe ') !== 0) {
    parsedSrc = replaceSymbols(parsedSrc)
  }

  // 新建一个 audio node
  const audio: AudioElement = {
    type: 'audio',
    src: parsedSrc,
    children: [{ text: '' }], // 【注意】void node 需要一个空 text 作为 children
  }

  // 插入音频
  // 不使用此方式会比正常的选区选取先执行
  Promise.resolve().then(() => {
    Transforms.insertNodes(editor, audio)
  })

  // 调用 callback
  onInsertedAudio(audio)
}