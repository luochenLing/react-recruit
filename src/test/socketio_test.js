import io from 'socket.io-client';

const socket =io('ws://localhost:4000')

socket.on('receiveMsg',function(data){
    console.log('浏览器端接收到消息：',data);
})

socket.emit('sendMsg',{name:'Tom',date:Date.now()});
console.log('浏览器端向服务器发送消息',{name:'Tom',date:Date.now()});