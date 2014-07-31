# Shitelol
> Crappy telnet server/scanning tool

Hastily written before a flight with friends, Shitelol is a shitty telnet server for local networks.

## Configuration

Create a file called `config.json` with the following contents:

```json
{
  "host" : "192.168.3.222", // your ip
  "target" : "192.168.3.0/24", // ips to scan
  "port" : 31337
}
```

Note: Be sure to remove the comments inside `config.json` or else node will throw an error trying to parse them.

## Running

#### Telnet server

- Run the server: `node server.js`
- Kill the server: `^C`

#### Server Scanner

Finding servers:
```
node scan.js
```

Connecting to a server: 
```
telnet 192.168.2.10 31337
```

Kill connection:
```
^] or /exit
```
