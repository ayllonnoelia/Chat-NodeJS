
function cambiarModo() {

  var cuerpoweb = document.getElementById("chat");
  cuerpoweb.classList.toggle("oscuro");

}

function copiarAlPortapapeles() {

  let copyText = document.getElementById('chat').innerText
  const textArea = document.createElement('textarea');
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();

}

function copiarAlPortapapelesFormato(id_elemento) {

 var aux = document.createElement("input");
 aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
 document.body.appendChild(aux);
 aux.select();
 document.execCommand("copy");
 document.body.removeChild(aux);

}
/*
window.onload = function() {

 var txt = document.getElementById('txt');

 document.getElementById('link').onclick = function(code) {
   this.href = 'data:text/html;charset=utf-8,'
     + encodeURIComponent(txt.value);
 };

};*/

/*function run() {

  var oShell = new ActiveXObject("Shell.Application");
  var commandtoRun = "c:\\windows\\system32\\notepad.exe";
  ShellExecute(commandtoRun, "", "", "open", "1");

}*/
