var evilscan = require('evilscan'),
  config = {
    host : "192.168.1.131",
    target : "192.168.3.0/24",
    port : 31337
  }, 
  options = {
    target: config.target,
    port: config.port,
    //status: 'TROU', // Timeout, Refused, Open, Unreachable
    status: 'O', // only Open 
    banner: true
  },
  cb = function(){}, // bug version of evilscan on npm. callback is required.
  scanner = new evilscan(options, cb);
  
scanner.on('run', function(){
  console.log('Searching for clients...');
});

scanner.on('result',function(data) {
  if( data.ip !== config.host ){
    console.log('Found client:', data.ip);
  }
});

scanner.on('error',function(err) {
  throw new Error(data.toString());
});

scanner.on('done',function() {
  console.log('Scan complete.');
  process.exit();
});

scanner.run();
