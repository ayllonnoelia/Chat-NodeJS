$(function () {
  const socket = io.connect();


  //Obtengo los elementos del dom desde la interfaz
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //Obtengo los elementos del dom del nickForm
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  const $usuarios = $('#usernames');


  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('nuevo usuario', $nickname.val(), data => {
      if (data){
        $('#nickWrap').hide();
        $('#contentWrap').show();
      }else{
        $nickError.html(`
          <div class="alert alert-danger">
            Lo sentimos, pero este usuario está activo actualmente.
          </div>
          `);
      }
      $nickname.val('');
    });
  })

  //Capturamos los eventos

  //box en el que se pone el mensaje
  $messageForm.submit( e => {
    e.preventDefault();
    socket.emit('enviar mensaje', $messageBox.val());
    $messageBox.val("");
  });

  //mensajes enviados con su nickname al lado
  socket.on('nuevo mensaje', function (data) {
    displayMsg(data);
  })

  //mostrar los usuarios
  socket.on('usernames', data => {
    let html = '';
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    for (let i = 0; i < data.length; i++){
      html += `<p><i class="fas fa-user"></i><b style="color:` + bgColor + `"> ${data[i]} </b></p>`
    }
    $usuarios.html(html);
  })

  //mostrar datos desde db

  socket.on('cargar viejos msgs', msgs => {
    for (let i = msgs.length-1; i>=0; i--){
      displayMsg(msgs[i]);
    }
  })

  function displayMsg(data) {

    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";


    $chat.append(`<p ><b style="color:` + bgColor + `">${data.nick}</b>: ${data.msg}</p>`);

  }

})
