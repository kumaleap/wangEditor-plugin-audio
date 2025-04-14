/**
 * @description parse html
 * @author wulijie
 */

import {IDomEditor, SlateDescendant, SlateElement} from "@wangeditor/editor";
 
function parseAudioElementHtml(domElem:Element, children:SlateDescendant[], editor: IDomEditor): SlateElement {
    const src= domElem.getAttribute('data-src'); // 这些就是elem-html.ts自定义扩展存放的地方，可以根据需要自行扩展
    const height = domElem.getAttribute('data-height');
    const width = domElem.getAttribute('data-width');
    const myAudio = { // 这里的信息要和custom-types.ts一致
        type: 'audio',
        src,
        width,
        height,
        children: [{text: ''}]
    }
    return myAudio
}
const parseAudioHtmlConf = {
    selector: 'div[data-w-e-type="audio"]', // 这个就是elem-html.ts中第一个div里包含的信息
    parseElemHtml: parseAudioElementHtml,
}
 
export {parseAudioHtmlConf}
