import Primitive from "./Primitive";

export default class Any extends Primitive {
    constructor({ ...args }) {
        super({ type: "any", ...args });
    }

    async validateAsync() {
        if (this.schema.type === this.type) {

            if (typeof this.value === "undefined") {
                throw new Error(`Type "any" cannot be undefined.`);
            }

        }
    }
}