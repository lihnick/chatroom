let v, socket;

let app = function() {

    socket = io();

    v = new Vue({
        el: '#app',
        data: {
            text: '',
            messages: ['messages', 'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.']
        },
        // NOTE: methods must have function(){} values instead of the short-hand functions: () => {}
        methods: {
            submit: function() {
                socket.emit('message', this.text);
                this.text = '';
                // console.log(`Search for ${app.text} in dataframe column ${app.messages}`);
            },
            addText: function(msg) {
                // NOTE: v-model="messages" is not needed on html tag b/c of v-for but is added so it can be reference here as this.messages
                // console.log(v.messages);
                // console.log(msg);
                v.messages.push(msg);
            }
        }
    });

    socket.on('message', (msg) => {
        v.addText(msg);
    });


}

app();
