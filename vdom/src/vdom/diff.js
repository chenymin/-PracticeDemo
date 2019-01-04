import render from './render'

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = []

    // 设置新属性
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push($node => {
            $node.setAttribute(k, v);
            return $node;
        });
    }

    // 删除属性
    for (const k in oldAttrs) {
        if (!(k in newAttrs)) {
            patches.push($node => {
                $node.removeAttribute(k);
                return $node;
            });
        }
    }
    return $node => {
        for (const patch of patches) {
            patch($node)
        }
        return $node
    }
}

const zip = (xs, ys) => {
    const zipped = []
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]])
    }
    return zipped
}

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });

    // newVChildren 新增的子元素
    // 比如 old [1,2,3] new [1, 2, 3, 4, 5] 将[4, 5] 追加
    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild));
            return $node;
        });
    }
    return $parnet => {
        for (const [patch, $child] of zip(childPatches, $parnet.childNodes)) {
            patch($child);
        }

        for (const patch of additionalPatches) {
            patch($parnet);
        }
        return $parnet;
    }
}

const diff = (oldVTree, newVTree) => {
    if (newVTree === undefined) {
        return $node => {
            $node.remove()
            return undefined
        }
    }

    if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
        if (oldVTree !== newVTree ) {
            // 这里包含两种情况
            // 1.oldVTree、newVTree 都是字符串它们的值不同
            // 2.oldVTree、newVTree其中一个是文本节点，另一个是元素节点
            // 无论哪种情况,调用render(newVTree)
            return $node => {
                const $newNode = render(newVTree)
                $node.replaceWith($newNode)
                return $newNode
            }
        } else {
            // 字符串，且值相同
            return $node => $node
        }
    }

    if (oldVTree.tagName !== newVTree.tagName) {
        // 当tagName 名不同时，认为两个虚拟组件完全不同，
        // 不为去比较发现它们的不同，仅渲染新的newVtree并挂载
        return $node => {
            const $newNode = render(newVTree)
            $node.replaceWith($newNode)
            return $newNode
        }
    }

    const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs)
    const patchChildren = diffChildren(oldVTree.children, newVTree.children)

    return $node => {
        patchAttrs($node);
        patchChildren($node);
        return $node
    }
}

export default diff