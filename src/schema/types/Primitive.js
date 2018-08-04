export default class Primitive {
    constructor({ type, schema, value }) {
        this.type = type;
        this.schema = typeof schema === "string" ? { type: schema } : schema;
        this.value = value;
    }

    async validateAsync() {
        if (this.schema.type === this.type && typeof this.value !== this.type) {
            throw new Error(`Expected a ${this.type}.`);
        }
    }
}