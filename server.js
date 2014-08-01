// Load the TCP Library
net = require('net'),
  config = {
    host : '192.168.0.120',
    target : '192.168.0.0/24',
    port : 31337
  },
  clients = [];



function broadcast(message, sender) {
  clients.forEach(function (client) {
    if( client !== sender ){
      client.write(message);
    }
  });
  console.log(message);
}


function parseMessage( data ){
  var socket = this,
    message = data.toString();
  
  if( message.match(/^\/name \w+/i) ){
    var oldName = socket.name;
    socket.name = escape(message.split('/name ')[1]).split('%')[0]; // my eyes
    broadcast(oldName + ' is now known as ' + socket.name + '\n');
  }
  
  else if( message.match(/^\/exit/i)){
    socket.emit('end');
  }

  else if( message.match(/^\/(commands|help)/i)){
    socket.write('List of commands:\n/name NAME - change name\n/exit - leave\n');
  }
  
  else {
    broadcast(socket.name + "> " + data, socket);
  }
}

function removeClient(){
  var socket = this;
  clients.splice(clients.indexOf(socket), 1);
  broadcast(socket.name + " left the chat.\n");
  socket.destroy();
}
 

// Create the telnet server
net.createServer(function( socket ){
  // Add client
  socket.name = socket.remoteAddress + ':' + socket.remotePort; 
  clients.push(socket);
 
  // Announce new client
  socket.write('Welcome to the chat!\nYour name is ' + socket.name + '\n');
  broadcast(socket.name + ' joined the chat\n', socket);
 
  // Bind event listeners
  socket.on('data', parseMessage);
  socket.on('end', removeClient);

}).listen(config.port, config.host);
 
console.log('Chat server running at port:', config.port);
