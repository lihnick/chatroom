let v, socket;

let app = function() {

    socket = io();

    v = new Vue({
        el: '#app',
        data: {
            text: '',
            name: '',
            self: '',
            hide: true,
            messages: [{id: 'abc', msg: 'messages', name: 'server'}, {id: 'abc', msg:'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.', name: 'server'}]
        },
        // NOTE: methods must have function(){} values instead of the short-hand functions: () => {}
        methods: {
            login: function() {
                socket.emit('setName', this.name);
                this.hide = false;
                this.self = socket.id;
            },
            submit: function() {
                socket.emit('message', this.text);
                this.text = '';
            },
            addText: function(msg) {
                // NOTE: v-model="messages" is not needed on html tag b/c of v-for but is added so it can be reference here as this.messages
                v.messages.push(msg);
            },
            strToColor: function(str) {
                console.log('colors');
                let r = str.charCodeAt(0);
                let g = str.charCodeAt(1);
                let b = str.charCodeAt(2);
                return `rgb(${r}, ${g}, ${b});`
            }
        }
    });

    socket.on('message', (msg) => {
        console.log(msg);
        v.addText(msg);
    });

}

app();
