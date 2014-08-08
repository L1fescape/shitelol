# Shitelol
> Crappy telnet server/scanning tool

Hastily written before a flight with friends, Shitelol is a shitty telnet server for local networks.

## Installation

Install dependencies:
```
npm install
```

Note: Installing dependencies is only needed for running the scanner. The server has no dependencies.

## Running

#### Running the Telnet server

- Run the server: `node server.js`
- Kill the server: `^C`

#### Finding and connecting to other servers

Finding telnet servers:
```
node scanner.js
```

Connecting to a server (assumes you have the telnet program installed):
```
telnet 192.168.2.10 31337
```

Kill connection:
```
^] or /exit
```
