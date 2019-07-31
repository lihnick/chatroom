let v, socket;

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

let app = function() {

    socket = io();

    v = new Vue({
        el: '#app',
        data: {
            text: '',
            name: '',
            self: '',
            hide: true,
            messages: [{id: 'abc', msg: 'messages', name: 'server'}, {id: 'abc', name: 'server', msg:'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.'}]
        },
        // NOTE: methods must have function(){} values instead of the short-hand functions: () => {}
        methods: {
            login: function() {
                socket.emit('connected', this.name);
                this.hide = false;
                this.self = socket.id;
            },
            submit: function() {
                socket.emit('message', this.text);
                this.text = '';
            },
            addText: function(msg) {
                // NOTE: v-model="messages" is not needed on html tag b/c of v-for but is added so it can be reference here as this.messages
                if (v.messages[v.messages.length-1].id == msg.id)  {
                    msg['color'] = null;
                }
                else {
                    msg['color'] = this.strToColor(msg.id);
                }
                console.log(msg.color);
                v.messages.push(msg);
            },
            addNote: function(msg) {
                v.messages.push(msg);
            },
            strToColor: function(str) {
                let hash = str.charCodeAt(0) + str.charCodeAt(str.length-1);
                return `hsl(${hash}, 60%, 40%);`
            }
        }
    });

    socket.on('message', (msg) => {
        console.log(msg);
        v.addText(msg);
    });

    socket.on('update', (msg) => {
        if (msg.status === 'connected') {
            // A user connected
            v.messages = msg.past;
            v.addNote(msg);
        } else if (msg.status === 'disconnected') {
            // A user disconnected
            v.addNote(msg);
        }
    });
}

app();
