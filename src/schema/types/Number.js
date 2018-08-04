import Primitive from "./Primitive";

export default class Number extends Primitive {
    constructor({...args}) {
        super({type: "number", ...args});
    }
}