import createElement from './vdom/createElement'
import render from './vdom/render'
import mount from './vdom/mount'
import diff from './vdom/diff'

const createVApp = count => createElement('div', {
    attrs: {
        id: 'app',
        dataCout: count
    },
    children: [
        'The current count is: ',
        String(count), // 代表文本节点
        createElement('input', {
            attrs: {
                id: 'input',
                value: 'test'
            }
        }),
        ...Array.from({length: count}, () => createElement('img', {
            attrs: {
                src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif'
            }
        }))
    ]
})

let vApp = createVApp(2);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById('app'));

const n = 5
const vNewApp = createVApp(n)
const patch = diff(vApp, vNewApp)
$rootEl = patch($rootEl);
// vApp = vNewApp

// setInterval(() => {
//     const n = Math.floor(Math.random() * 10)
//     const vNewApp = createVApp(n)
//     const patch = diff(vApp, vNewApp)
//
//     $rootEl = patch($rootEl);
//
//     vApp = vNewApp
// }, 1000);
console.log($app);