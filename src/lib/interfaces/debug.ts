export interface Debug{
    // true-> debugging = on, false-> debugging = off
    status: boolean;
    // method used to debug, defaults to console.log() in the class constructor
    method: Function;
}