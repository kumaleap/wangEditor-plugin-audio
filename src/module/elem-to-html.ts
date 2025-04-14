/**
 * @description to html
 * @author wulijie
 */

import { AudioElement } from './custom-types'
import {SlateElement} from "@wangeditor/editor";
 
function audioElemtToHtml(elem: SlateElement, childrenHtml: string): string{
    const {src,width=300,height=54} = elem as AudioElement
// 通过data-w-e开头的data数据，存放一些必要的信息，到时候通过setHtml将富文本信息还原回编辑器的时候，才能使编辑器正常识别
    const html = `<div 
                    data-w-e-type="audio"
                    data-w-e-is-void
                    data-w-e-type="audio"
                    data-w-e-width="${width}"
                    data-w-e-height="${height}"
                    data-src="${src}"
                    data-width="${width}"
                    data-height="${height}"
                    >
                        <audio controls src="${src}" style="width: ${width};height:${height};max-width: 100%"/>
                     </div>`
    return html
}
 
const audioToHtmlConf = {
    type: 'audio',
    elemToHtml: audioElemtToHtml
}
 
export {audioToHtmlConf}