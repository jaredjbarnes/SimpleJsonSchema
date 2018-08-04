import Primitive from "./Primitive";

export default class Boolean extends Primitive {
    constructor({...args}) {
        super({ type: "boolean", ...args });
    }
}