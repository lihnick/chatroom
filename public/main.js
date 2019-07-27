

let app = function() {

    let v = new Vue({
        el: '#app',
        data: {
            messages: []
        },
        methods: {
            submit: () => {
                console.log("send message");
            }
        }
    });

    $(function() {
        let socket = io();
        let submit = document.getElementById('submit');
        let message = document.getElementById('message');
        submit.addEventListener('click', (event) => {
            console.log('sending message: ' + message.value);
            socket.emit('chat message', message.value);
            message.value = '';
            return false;
        });
        socket.on('chat message', (msg) => {
            console.log(msg);
        });
    });

}

app();
