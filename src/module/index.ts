/**
 * @description audio module
 * @author wulijie
 */

import { IModuleConf } from '@wangeditor/editor'
import withAudio from './plugin'
import { renderAudioConf } from './render-elem'
import { audioToHtmlConf } from './elem-to-html'
import { preParseHtmlConf } from './pre-parse-html'
import { parseHtmlConf } from './parse-elem-html'
import { insertAudioMenuConf, uploadAudioMenuConf, editorAudioSizeMenuConf } from './menu/index'

const audio: Partial<IModuleConf> = {
  renderElems: [renderAudioConf],
  elemsToHtml: [audioToHtmlConf],
  preParseHtml: [preParseHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [insertAudioMenuConf, uploadAudioMenuConf, editorAudioSizeMenuConf],
  editorPlugin: withAudio,
}

export default audio