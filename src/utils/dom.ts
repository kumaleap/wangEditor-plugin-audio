/**
 * @description DOM 操作
 * @author wulijie
 */
import $, { append, on, focus, attr, val, html, parent, hasClass, Dom7Array, empty, is, parents } from 'dom7'
export { Dom7Array } from 'dom7'

// 扩展 $.fn 方法
if (append) $.fn.append = append
if (on) $.fn.on = on
if (focus) $.fn.focus = focus
if (attr) $.fn.attr = attr
if (val) $.fn.val = val
if (html) $.fn.html = html
if (parent) $.fn.parent = parent
if (hasClass) $.fn.hasClass = hasClass
if (empty) $.fn.empty = empty
if (is) $.fn.is = is
if (parents) $.fn.parents = parents

// 如果DOM7没有提供parents方法，自行实现
if ($ && !$.fn.parents) {
  $.fn.parents = function(selector?: string): Dom7Array {
    const parents = [];
    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode;
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(parents);
  };
}

// 如果DOM7没有提供is方法，自行实现
if ($ && !$.fn.is) {
  $.fn.is = function(selector: string | Document | Window | Node): boolean {
    const el = this[0];
    if (!el || !selector) return false;
    
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);
      if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      if (el.msMatchesSelector) return el.msMatchesSelector(selector);
    }
    
    if (selector === document) return el === document;
    if (selector === window) return el === window;
    
    if ((selector as Node).nodeType || selector instanceof window.HTMLElement) {
      return el === selector;
    }
    
    return false;
  };
}

/**
 * 获取 tagName lower-case
 * @param $elem $elem
 */
export function getTagName($elem: Dom7Array): string {
  if ($elem.length) return $elem[0].tagName.toLowerCase()
  return ''
}

/**
 * 生成带 size 样式的 iframe html
 * @param iframeHtml iframe html string
 * @param width width
 * @param height height
 * @returns iframe html string with size style
 */
export function genSizeStyledIframeHtml(
  iframeHtml: string,
  width: string = 'auto',
  height: string = 'auto'
): string {
  const $iframe = $(iframeHtml)
  $iframe.attr('width', width)
  $iframe.attr('height', height)
  return $iframe[0].outerHTML
}

// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange
export { DOMNode, DOMComment, DOMElement, DOMText, DOMRange, DOMSelection, DOMStaticRange }

export default $