const Chat = require('./models/Chat');

module.exports = function (io){

  //let nicknames = [];
  let users = {};

  io.on('connection', async socket => {
    console.log('Se ha conectado un nuevo usuario')

    //enviar mensajes anteriores desde la db

    let messages = await Chat.find({}).limit(8).sort('-created');

    socket.emit('cargar viejos msgs', messages);

    socket.on('nuevo usuario', (data, cb) => {
      console.log(data);
      if (data in users){
        cb(false);
      }else{
        cb(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    socket.on('enviar mensaje', async (data, cb) => {

      var msg = data.trim();

      var newMsg = new Chat({
        msg/*: data*/,
        nick: socket.nickname
      });

      await newMsg.save();

      io.sockets.emit('nuevo mensaje', {
        msg,
        nick: socket.nickname
      });
    });

    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      delete users[socket.nickname];
      updateNicknames();
    });

    function updateNicknames(){
      io.sockets.emit('usernames', Object.keys(users));
    }

  });
}
