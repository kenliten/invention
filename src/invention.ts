import { Component } from './lib/interfaces/component';
import { Debug } from './lib/interfaces/debug';
import { Flow } from './lib/interfaces/flow';
import { Secuence } from './lib/interfaces/secuence';

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