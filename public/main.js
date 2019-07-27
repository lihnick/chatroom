let v, socket;

let app = function() {

    socket = io();

    v = new Vue({
        el: '#app',
        data: {
            text: '',
            name: '',
            hide: false,
            messages: ['messages', 'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.']
        },
        // NOTE: methods must have function(){} values instead of the short-hand functions: () => {}
        methods: {
            login: function() {
                socket.emit('setName', this.name);
            },
            submit: function() {
                socket.emit('message', this.text);
                this.text = '';
            },
            addText: function(msg) {
                // NOTE: v-model="messages" is not needed on html tag b/c of v-for but is added so it can be reference here as this.messages
                v.messages.push(msg);
            }
        }
    });

    socket.on('message', (msg) => {
        console.log(msg);
        v.addText(msg.msg);
    });

}

app();
