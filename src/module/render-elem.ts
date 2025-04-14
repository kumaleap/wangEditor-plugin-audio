/**
 * @description audio render elem
 * @author wulijie
 */
import { AudioElement } from './custom-types'
import {DomEditor, IDomEditor, SlateElement} from "@wangeditor/editor";
import {h, VNode} from "snabbdom";
 
function renderAudioElement(elemNode: SlateElement,children:VNode[] | null, editor: IDomEditor):VNode{
    const {src='',width='300',height='54'} = elemNode as AudioElement;
    const selected = DomEditor.isNodeSelected(editor, elemNode);
 
 
    const audioVnode = h(
        'audio', // html标签
        {
            props: {
                src: src,
                contentEditable: false,
                controls: true,
            },
            style:{
                width: width + 'px',
                height: height + 'px',
                'max-width':'100%' // 这里之所以要写死，是为了实现宽度自适应的。如果直接设置width：100%，会触发报错。所以想要实现width：100%效果，需要先设置max-width，然后在给width设置一个离谱的值，比如说100000.
            }
        }
    )
    const vnode = h(
        'div',
        {
            props: {
                "className": 'w-e-textarea-video-container', // 这里直接复用video的效果
                "data-selected": (selected?'true':'')
            },
        },
        audioVnode
    )
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
    type: 'audio', // 新元素 type ，重要！！！即custom-type中定义的type
    renderElem: renderAudioElement,
}
 
export {renderAudioConf}