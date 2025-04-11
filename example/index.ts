/**
 * @description examples entry
 * @author wangfupeng
 */

import {
  createEditor,
  createToolbar,
  Boot,
  IEditorConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor'
// import module, { AudioElement } from '../src/index'
import module from '../src/index'

Boot.registerModule(module)

// i18nChangeLanguage('en')

// 编辑器配置
// 需要更新示例中的配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  hoverbarKeys: {
    audio: {
      menuKeys: [], // 音频不需要下载菜单
    },
  },
  MENU_CONF: {
    // 上传音频的菜单配置
    audio: {
      server: 'http://127.0.0.1:3000/api/upload-audio', // 更新为音频上传地址
      timeout: 5 * 1000, // 5s

      fieldName: 'custom-fileName',
      meta: { token: 'xxx', a: 100 },
      metaWithUrl: true, // 参数拼接到 url 上
      headers: { Accept: 'text/x-json' },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file // 返回哪些文件可以上传
        // return false // 会阻止上传
      },
      onProgress(progress: number) {
        console.log('onProgress', progress)
      },
      onSuccess(file: File, res: any) {
        console.log('onSuccess', file, res)
      },
      onFailed(file: File, res: any) {
        alert(res.message)
        console.log('onFailed', file, res)
      },
      onError(file: File, err: Error, res: any) {
        alert(err.message)
        console.error('onError', file, err, res)
      },
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       {
  //         // @ts-ignore
  //         type: 'audio',
  //         fileName: '音频文件名',
  //         link: 'https://www.w3school.com.cn/i/movie.ogg',
  //         children: [{ text: '' }],
  //       },
  //     ],
  //   },
  // {
  //   "type": "paragraph",
  //   "children": [
  //     {
  //       "text": " "
  //     },
  //     {
  //       "type": "link",
  //       "url": "http://localhost:8000/",
  //       "children": [
  //         {
  //           "text": "http://localhost:8000/"
  //         }
  //       ]
  //     },
  //     {
  //       "text": " "
  //     }
  //   ]
  // },
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [{ text: '选一个音频文件上传：' }],
  //   },
  // ],
  html: '<p>hello world</p><p> <a href="http://localhost:8000/" target="_blank">http://localhost:8000/</a> </p><p>选一个音频文件上传：</p>',
})
// 工具栏配置
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['audio'],
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
