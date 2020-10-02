interface Component {
    // the name to identify and execute with
    name: string;
    /* number of order of preference to be execute inside the flow
    the higher value, minor preference have to be executed
    all components will be executed from lower to higher precedence value */
    precedence: number;
    // grants access to certain objects/methods/properties in the main class
    access: string[];
    // function to be execute in the main flow
    member: Function;
}

interface Debug{
    // true-> debugging = on, false-> debugging = off
    status: boolean;
    // method used to debug, defaults to console.log() in the class constructor
    method: Function;
}

interface Flow{
    // A function to add new elements to the flow
    add: Function;
    commute: Function;
    error: Function;
    next: Function;
    queue: {
        current: number;
        total: number;
    };
    secuence: Secuence[];
    sort: Function;
    start: Function;
}

interface Secuence{
    name: string;
    precedence: number;
}

class Invention{
    id: string;
    flow: Flow;
    components: any;
    debugging: Debug;
    status: "stop" | "running" | "paused" | "playing" | "game over" | "won";
    stats: object;
    constructor(debug: Debug = {status: false, method: (err:Error) => {console.log(err)}}){
        this.id = this.setId();
        this.flow = this.__initFlow();
        this.components = new Array();
        this.debugging = debug;
        this.status = "stop";
        this.stats = {};
    }

    debug(error: Error): void{
        if (this.debugging.status){
            this.debugging.method(error);
        }
    }

    extend(component: Component):boolean {
        if (this.flow.add(component)){
            return true;
        }else{
            return false;
        }
    }

    __initFlow(): Flow{
        return {
            add: (component:Component): boolean =>{
                if (this.components[component.name] = component){
                    this.flow.secuence.push({name: component.name, precedence: component.precedence})
                    return true;
                }else{
                    return false;
                }
            },
            commute: (property: string, value: any): boolean =>{
                if (true){
                    return true;
                }else{
                    return false;
                }
            },
            error: (err: Error, fatal: boolean = false): void =>{
                if (fatal){
                    throw err;
                }else{
                    this.debug(err);
                    if (this.flow.queue.current + 1 == this.flow.queue.total){
                        this.flow.next()
                    }
                }
            },
            next: (): any =>{
                if (this.flow.queue.current + 1 == this.flow.queue.total){
                    this.flow.queue = { current: 0, total: this.flow.secuence.length-1 };
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
            sort: (): void =>{
                this.flow.secuence.sort((c1, c2) =>{
                    return c1.precedence - c2.precedence;
                });
            },
            start: ():void =>{
                this.status = "running";
                this.flow.queue = {current: 0, total: this.flow.secuence.length-1 };
                this.flow.sort();
                this.flow.next();
            }
        }
    }

    setId(): string {
        let id = "";
        let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789".split("");
        while(id.length < 30){
            id.concat(chars[Math.round(Math.random()*chars.length - 1)]);
        }
        return id;
    }
}
    
if(typeof(module) !== "undefined"){
    module.exports = Invention;
}