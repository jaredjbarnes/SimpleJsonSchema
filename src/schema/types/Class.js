import Any from "./Any";
import ArrayType from "./Array";
import Boolean from "./Boolean";
import Date from "./Date";
import Enum from "./Enum";
import Number from "./Number";
import Reference from "./Reference";
import String from "./String";
import Value from "./Value";

const types = {
    "any": Any,
    "array": ArrayType,
    "boolean": Boolean,
    "class": Class,
    "date": Date,
    "enum": Enum,
    "number": Number,
    "reference": Reference,
    "string": String,
    "value": Value
};

export default class Class {
    constructor({ environment, schema, value }) {
        this.type = "class";
        this.environment = environment;
        this.schema = schema;
        this.value = value;
    }

    assertDecorator(decorator) {
        if (decorator == null) {
            throw new Error("Expected the decorator to be an object.");
        }

        if (typeof decorator.name !== "string") {
            throw new Error("Expected the decorator's name property to be a string.");
        }

        if (decorator.config == null || (decorator.config != null && typeof decorator !== "object")) {
            throw new Error("Expected the decorator's config property to be an object.");
        }
    }

    async assertPropertyAsync(property) {
        let decorators = [];

        this.assertPropertySchema(property);

        if (Array.isArray(property.decorators)) {

            property.decorators.forEach((decorator) => {
                this.assertDecorator(decorator);
            });

            for (const decoratorInformation of property.decorators) {
                const decorator = await this.environment.getDecoratorAsync(decoratorInformation);
                decorators.push(decorator);
            }

        }

        const propertySchema = property.class;
        const propertyValue = this.value[property.name];

        const Validator = this.getValidatorBySchema(property.class);
        const propertyValidator = new Validator({
            environment: this.environment,
            schema: propertySchema,
            value: propertyValue
        });

        await propertyValidator.validateAsync()

        for (const decorator of decorators) {
            await decorator.validateAsync({
                schema: propertySchema,
                value: propertyValue
            });
        }
    }

    async assertPropertiesAsync() {
        const schema = this.schema;

        if (!Array.isArray(schema.properties)) {
            throw new Error("Expected the properties to be an array.");
        }

        for (const property of schema.properties) {
            await this.assertPropertyAsync(property);
        }

    }

    assertPropertySchema(property){
        if (typeof property.name !== "string") {
            throw new Error("Expected the name of a property to be a string.");
        }

        if (typeof property.class !== "string" && (property.class != null && typeof property.class === "object" && typeof property.class.type !== "string")) {
            throw new Error("Expected the class of a property to be a string, or an object with the type property being a string.");
        }

        if (typeof property.label !== "string") {
            throw new Error("Expected the label of a property to be a string.");
        }

        if (property.decorators != null && !Array.isArray(property.decorators)) {
            throw new Error(`Expected the decorators on the "${property.name}" property to be an Array.`);
        }
    }

     assertSchema(){
        const schema = this.schema;

        if (typeof schema.name !== "string") {
            throw new Error("Expected the name of a class to be a string.");
        }

        if (typeof schema.label !== "string") {
            throw new Error("Expected the label of a class to be a string.");
        }

        if (typeof schema.description !== "string") {
            throw new Error("Expected the description of a class to be a string.");
        }

        if (typeof schema.version !== "string") {
            throw new Error("Expected the version of a class to be a string.");
        }

        if (schema.decorators != null && !Array.isArray(schema.decorators)) {
            throw new Error("Expected the decorators of a class to be an array.");
        }
    }

    getValidatorBySchema(schema) {
        if (typeof schema === "string") {
            return types[schema];
        } else if (typeof schema === "object" && schema != null) {
            return types[schema.type];
        } else {
            throw new Error("Unsupported type.");
        }
    }

    async validateAsync() {
        const schema = this.schema;
        const value = this.value;
        const decorators = [];

        if (schema.type === "class") {
            this.assertSchema();

            await this.assertPropertiesAsync();

            if (Array.isArray(schema.decorators)) {
                schema.decorators.forEach((decorator) => {
                    this.assertDecorator(decorator);
                });

                for (const decoratorInformation of schema.decorators) {
                    const decorator = await this.environment.getDecoratorAsync(decoratorInformation);
                    decorators.push(decorator);
                }

                for (const decorator of decorators) {
                    await decorator.validateAsync({
                        schema: schema,
                        value: value
                    });
                }

            }

        }

        return true;

    }

}