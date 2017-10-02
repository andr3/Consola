(function () {
    // Avoiding dependancy on needless
    var _extend = function () {
        var prop;
        if (arguments.length) {
            for(var i=arguments.length;i>0;i--) {
                for(prop in arguments[i]) {
                    arguments[i-1][prop] = arguments[i][prop];
                }
            }
            return arguments[0];
        }
    };

    var Consola = function (on, options) {
        this.options = _extend(this.defaults, options);

        this.init();

        this.setMode(on);
    };

    _extend(Consola.prototype, {
        defaults: {
            context: console,
            methods: {
                log: console.log,
                info: console.info,
                error: console.error,
                warn: console.warn,
                trace: console.trace,
                time: console.time,
                timeEnd: console.timeEnd
            }
        },

        init: function () {
            this.context = this.options.context;

            for (var method in this.options.methods) {
                this[method] = this.factory(method);
            }   
        },

        // Used to fabricate supported proxy methods
        factory: function (method) {
            return function () {
                var args = [ method ];
                for (var index in arguments) {
                    args.push(arguments[index]);
                }
                this.raw.apply(this, args);
            };
        },
        raw: function (mode, what) {
            // If the context doesn't exist or the Consola has been silenced,
            // don't do anything but let the functions exist.
            if (this.silenced || typeof this.context === 'undefined') {
                return;
            }

            var args = []
            if (mode in this.options.methods) {
                for(var i=1,len=arguments.length;i<len;i++) {
                    args.push(arguments[i]);
                }
                this.options.methods[mode].apply(this.options.context, args);    
            }
        },

        setMode: function(on) {
            // true => debug, output.
            // false => silenced, don't output.
            this.silenced = on === false ;

            if (this.silenced) {
                this.info('Consola debug mode actived. (use <obj>.setMode(false) to switch off.)');
            }
        
            return this.mode;
        },
        getMode: function () {
            return !this.silenced;
        }
    });


    window.Consola = Consola;

    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return Consola;
        });    
    }

}());
