export interface Component {
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