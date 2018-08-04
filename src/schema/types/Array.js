export default class Array {
    constructor({environment, schema, value}) {
        this.type = "array";
        this.environment = environment;
        this.schema = schema;
        this.value = value;
    }

    async validateAsync() {
        if (this.schema.type === "array") {

            if (!Array.isArray(this.value)) {
                throw new Error("Expected a array.");
            }

            if (typeof this.schema.embedded !== "undefined" && typeof this.schema.embedded !== "boolean") {
                throw new Error("Expected the embedded property to be a boolean. ");
            }

            if (!Array(this.schema.itemClasses)) {
                throw new Error("Expected the itemClasses property to be a list. ");
            }

        }
    }
}