import Any from "./types/Any";
import Array from "./types/Array";
import Boolean from "./types/Boolean";
import Class from "./types/Class";
import Date from "./types/Date";
import Enum from "./types/Enum";
import Number from "./types/Number";
import Reference from "./types/Reference";
import String from "./types/String";
import Value from "./types/Value";

const types = {
    "any": Any,
    "array": Array,
    "boolean": Boolean,
    "class": Class,
    "date": Date,
    "enum": Enum,
    "number": Number,
    "reference": Reference,
    "string": String,
    "value": Value
};

export default class Validator {
    constructor({ environment, schema, value }) {
        this.environment = environment;
        this.value = value;
        this.schema = schema;

        if (environment == null) {
            throw new Error("Expected an enviroment.");
        }

        if (typeof this.environment.getReferenceAsync !== "function" ||
            typeof this.environment.getDecoratorAsync !== "function") {
            throw new Error("The environment needs to have both getReferenceAsync and getDecoratorAsync functions.");
        }
    }

    getTypeBySchema() {
        if (typeof this.schema === "string" && types[this.schema] != null) {
            return types[this.schema];
        } else if (typeof this.schema === "object" && this.schema != null && types[this.schema.type] != null) {
            return types[this.schema.type];
        } else {
            throw new Error("Unknown type.");
        }
    }

    async validateAsync() {
        const Validator = this.getTypeBySchema();

        const validator = new Validator({
            environment: this.environment,
            schema: this.schema,
            value: this.value
        });

        await validator.validateAsync();
        return true;
    }
}