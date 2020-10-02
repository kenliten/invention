"use strict";
(function (exports) {
    class Invention {
        constructor(debug = { status: false, method: (err) => { console.log(err); } }) {
            this.id = this.setId();
            this.flow = this.__initFlow();
            this.components = new Array();
            this.debugging = debug;
            this.status = "stop";
            this.stats = {};
        }
        debug(error) {
            if (this.debugging.status) {
                this.debugging.method(error);
            }
        }
        extend(component) {
            if (this.flow.add(component)) {
                return true;
            }
            else {
                return false;
            }
        }
        __initFlow() {
            return {
                add: (component) => {
                    if (this.components[component.name] = component) {
                        this.flow.secuence.push({ name: component.name, precedence: component.precedence });
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                commute: (property, value) => {
                    if (true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                error: (err, fatal = false) => {
                    if (fatal) {
                        throw err;
                    }
                    else {
                        this.debug(err);
                        if (this.flow.queue.current + 1 == this.flow.queue.total) {
                            this.flow.next();
                        }
                    }
                },
                next: () => {
                    if (this.flow.queue.current + 1 == this.flow.queue.total) {
                        this.flow.queue = { current: 0, total: this.flow.secuence.length - 1 };
                        return;
                    }
                    this.components[this.flow.secuence[this.flow.queue.current].name](this.flow.error);
                    this.flow.queue.current += 1;
                    this.flow.next();
                },
                queue: {
                    current: 0,
                    total: 0
                },
                secuence: new Array(),
                sort: () => {
                    this.flow.secuence.sort((c1, c2) => {
                        return c1.precedence - c2.precedence;
                    });
                },
                start: () => {
                    this.status = "running";
                    this.flow.queue = { current: 0, total: this.flow.secuence.length - 1 };
                    this.flow.sort();
                    this.flow.next();
                }
            };
        }
        setId() {
            let id = "";
            let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789".split("");
            while (id.length < 30) {
                id.concat(chars[Math.round(Math.random() * chars.length - 1)]);
            }
            return id;
        }
    }
    exports = Invention;
})(typeof (exports) === "undefined" ? window : exports);
//# sourceMappingURL=invention.js.map