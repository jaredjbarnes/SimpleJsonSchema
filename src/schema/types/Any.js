export default class Any {
    constructor({ environment, schema, value }) {
        this.type = "any";
        this.environment = environment;
        this.schema = schema;
        this.value = value;
    }

    async validateAsync() {
        if (this.schema.type === this.type) {

            if (typeof this.value === "undefined") {
                throw new Error(`Type "any" cannot be undefined.`);
            }

        }
    }
}