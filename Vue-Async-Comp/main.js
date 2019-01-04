
var vm = new Vue( {
    el: '#app',
    components: {
        /* 异步组件async-comp */
        'async-comp': function () {
            return {
                /** 要渲染的异步组件，必须是一个Promise对象 */
                component: new Promise( function ( resolve, reject ) {
                    var script = document.createElement( 'script' );
                    script.type = 'text/javascript';
                    script.src = './Async-Comp.js';
                    document.head.appendChild( script );

                    script.onerror = function () {
                        reject( 'load failed!' );
                    }

                    script.onload = function () {
                        if ( typeof async_comp !== 'undefined' )
                            resolve( async_comp );
                        else reject( 'load failed!' )
                    }
                } ),
                /* 加载过程中显示的组件 */
                loading: {
                    template: '<p>loading...</p>'
                },
                /* 出现错误时显示的组件  */
                error: {
                    template: '\
                        <p style="color:red;">load failed!</p>\
                    '
                },
                /* loading组件的延迟时间 */
                delay: 10,
                /* 最长等待时间，如果超过此时间，将显示error组件。 */
                timeout:3200
            }
        }
    }
} )