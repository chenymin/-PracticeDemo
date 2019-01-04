window.async_comp = {
    template: '\
        <ol>\
            <li v-for="item in list">{{ item }}</li>\
        </ol>',
    props: {
        list: Array
    }
};