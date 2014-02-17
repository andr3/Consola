# Consola

A proxy object that is easily silenced in production environments.

## How to Use

### AMD/RequireJS

```javascript
require(["consola"], function (Consola) {

    // Consola will output things
    var dbg = new Consola( true );
    
    // Consola will NOT output things
    var dbg = new Consola( false );

    // Consola will output things if domain is "staging"
    var dbg = new Consola( location.host == 'staging' );

});
```

### Other contexts (non-AMD)

```javascript
// Consola will output things
var dbg = new Consola( true );

// Consola will NOT output things
var dbg = new Consola( false );

// Consola will output things if domain is "staging"
var dbg = new Consola( location.host == 'staging' );
```

## How to Use: available methods

By choice, Consola won't proxy all methods, only the most common. At least for now.

* Proxied methods
 * .log()
 * .info()
 * .error()
 * .trace()
 * .time()
 * .timeEnd()
* .setMode([ true | false]) 
* .getMode() 


## License

This is available under the MIT License:
http://opensource.org/licenses/MIT
