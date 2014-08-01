// Load the TCP Library
net = require('net'),
  config = {
    host : "192.168.1.131",
    target : "192.168.3.0/24",
    port : 31337
  },
  clients = [];
 
net.createServer(function (socket){
 
  socket.name = socket.remoteAddress + ':' + socket.remotePort; 
  clients.push(socket);
 
  // Announce new user
  socket.write('Welcome to the chat!\nYour name is ' + socket.name + '\n');
  broadcast(socket.name + ' joined the chat\n', socket);
 
  socket.on('data', function (data) {
    // all of this is so bad
    if( data.toString().indexOf('/name ') > -1){
      var oldName = socket.name;
      socket.name = escape(data.toString().split('/name ')[1]).split('%')[0]; // my eyes
      broadcast(oldName + ' is now known as ' + socket.name + '\n');
    }
    
    else if( data.toString().indexOf('/exit') > -1){
      socket.emit('end');
    }
    
    else {
      broadcast(socket.name + "> " + data, socket);
    }
  });
 
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }
 
}).listen(config.port, config.host);
 
// Put a friendly message on the terminal of the server.
console.log('Chat server running at port:', config.port);
