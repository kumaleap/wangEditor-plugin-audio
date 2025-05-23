/**
 * @description 修改音频尺寸
 * @author wulijie
 */

import { Node as SlateNode, Transforms } from 'slate'
import {
  IModalMenu,
  IDomEditor,
  DomEditor,
  genModalInputElems,
  genModalButtonElems,
  t,
} from '@wangeditor/editor'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/utils'
import { AudioElement } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-audio')
}

class EditorAudioSizeMenu implements IModalMenu {
  readonly title = t('audioModule.editSize')
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 320
  private $content: Dom7Array | null = null
  private readonly widthInputId = genDomID()
  private readonly heightInputId = genDomID()
  private readonly buttonId = genDomID()

  private getSelectedAudioNode(editor: IDomEditor): SlateNode | null {
    return DomEditor.getSelectedNodeByType(editor, 'audio')
  }

  getValue(editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return true

    const audioNode = this.getSelectedAudioNode(editor)
    if (audioNode == null) {
      // 选区未处于 audio node ，则禁用
      return true
    }
    return false
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return this.getSelectedAudioNode(editor)
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    // return $('<div><p>修改尺寸</p><p>修改尺寸</p><p>修改尺寸</p><p>修改尺寸</p></div>')[0]

    const { widthInputId, heightInputId, buttonId } = this

    const [widthContainerElem, inputWidthElem] = genModalInputElems(
      t('audioModule.width'),
      widthInputId,
      'auto'
    )
    const $inputWidth = $(inputWidthElem)
    const [heightContainerElem, inputHeightElem] = genModalInputElems(
      t('audioModule.height'),
      heightInputId,
      'auto'
    )
    const $inputHeight = $(inputHeightElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('audioModule.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()

        const rawWidth = $content.find(`#${widthInputId}`).val().trim()
        const rawHeight = $content.find(`#${heightInputId}`).val().trim()
        const numberWidth = parseInt(rawWidth)
        const numberHeight = parseInt(rawHeight)
        const width = numberWidth ? numberWidth.toString() : 'auto'
        const height = numberHeight ? numberHeight.toString() : 'auto'

        editor.restoreSelection()

        // 修改尺寸
        Transforms.setNodes(
          editor,
          { 
            type: 'audio',
            width, 
            height 
          } as Partial<AudioElement>,
          {
            match: n => DomEditor.checkNodeType(n, 'audio'),
          }
        )

        editor.hidePanelOrModal() // 隐藏 modal
      })

      this.$content = $content
    }

    const $content = this.$content

    // 先清空，再重新添加 DOM 内容
    $content.empty()
    $content.append(widthContainerElem)
    $content.append(heightContainerElem)
    $content.append(buttonContainerElem)

    const audioNode = this.getSelectedAudioNode(editor) as AudioElement
    if (audioNode == null) return $content[0]

    // 初始化 input 值
    const { width = 'auto', height = 'auto' } = audioNode
    $inputWidth.val(width)
    $inputHeight.val(height)
    setTimeout(() => {
      $inputWidth.focus()
    })

    return $content[0]
  }
}

export default EditorAudioSizeMenu