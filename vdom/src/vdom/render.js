const renderElem = (vNode) => {
    // 创建元素 <div></div>
    const $el = document.createElement(vNode.tagName)

    // 添加所有的vNode.attrs属性
    // 例如<div id='app'></div>
    for (const [k, v] of Object.entries(vNode.attrs)) {
        $el.setAttribute(k, v)
    }

    // 添加所有的孩子节点 vNode.children
    // e.g <div id='app'><img></div>
    for (const child of vNode.children) {
        $el.appendChild(render(child))
    }
    return $el
}

const render = (vNode) => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode)
    }

    return renderElem(vNode)
}
export default render