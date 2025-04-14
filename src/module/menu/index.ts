/**
 * @description audio menu
 * @author wulijie
 */

import InsertAudioMenu from './InsertAudioMenu'
import UploadAudioMenu from './UploadAudioMenu'
import EditorAudioSizeMenu from './EditorAudioSizeMenu'
import { genInsertAudioMenuConfig, genUploadAudioMenuConfig } from './config'

export const insertAudioMenuConf = {
  key: 'audio',
  factory() {
    return new InsertAudioMenu()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: genInsertAudioMenuConfig(),
}

export const uploadAudioMenuConf = {
  key: 'uploadAudio',
  factory() {
    return new UploadAudioMenu()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: genUploadAudioMenuConfig(),
}

export const editorAudioSizeMenuConf = {
  key: 'editAudioSize',
  factory() {
    return new EditorAudioSizeMenu()
  },
}
