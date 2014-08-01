# Shitelol
> Crappy telnet server/scanning tool

Hastily written before a flight with friends, Shitelol is a shitty telnet server for local networks.

## Installation

Install dependencies:
```
npm install
```

## Running

#### Telnet server

- Run the server: `node server.js`
- Kill the server: `^C`

#### Server Scanner

Finding telnet servers:
```
node scanner.js
```

Connecting to a server: 
```
telnet 192.168.2.10 31337
```

Kill connection:
```
^] or /exit
```
