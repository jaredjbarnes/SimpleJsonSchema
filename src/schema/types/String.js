import Primitive from "./Primitive";

export default class String extends Primitive {
    constructor({...args}) {
        super({ type: "string", ...args });
    }
}