# LocalServer 

[LocalServer]() is featherlight development HTTP server to serve your static files locally across your network.

* Allows your files to be accessed by any device on your network.
* Light and minimal as it does not rely on any dependencies.
* Provides a simple CLI and only requires minimal configuration, making it noob-friendly :). 
* Made purely with Node.js ;)

## Installation
You'll need Node.js and NPM for this.

```sh
npm i @jcrz/local-server
```

Note: *Make sure node is initialized.*

## Usage
```sh
localServer [params]
```
### Command line parameters:
* `--path=PORT` - the port you want to use. Default port is set to 8000.
* `--dir=PATH` - the name or path of the directory of your static files. Default dir root path is set to "." (**NOTE**: Do not start your path or name with a "/" or "\\").

### Example Usage

```
localServer --port=5000 --dir=client
```

## Contribution
Any contribution is welcome. Just kindly make a pull request. For major changes, please open an issue first to discuss what you would like to change.

