let v, socket;

let app = function() {

    socket = io();
    v = new Vue({
        el: '#app',
        data: {
            text: '',
            messages: ['messages', 'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.']
        },
        methods: {
            submit: function() {
                console.log(this.text);
                socket.emit('message', this.text);
                this.text = '';
                // console.log(`Search for ${app.text} in dataframe column ${app.messages}`);
            }
        }
    });

    socket.on('message', (msg) => {
        console.log(msg);
    });

    //
    // $(function() {
    //     let socket = io();
    //     let submit = document.getElementById('submit');
    //     let message = document.getElementById('message');
    //     submit.addEventListener('click', (event) => {
    //         console.log('sending message: ' + message.value);
    //         socket.emit('chat message', message.value);
    //         message.value = '';
    //         return false;
    //     });
    //     socket.on('chat message', (msg) => {
    //         console.log(msg);
    //     });
    // });

}

app();
