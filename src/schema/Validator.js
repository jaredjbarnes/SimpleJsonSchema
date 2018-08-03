export default class Validator {
    constructor(environment) {
        this.environment = environment;
        this.value = null;
        this.schema = null;
        this.options = null;
        this.dateFormat = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        this.knownTypes = {
            "any": "any",
            "array": "array",
            "boolean": "boolean",
            "class": "class",
            "date": "date",
            "enum": "enum",
            "number": "number",
            "value": "value",
            "reference": "reference",
            "string": "string"
        };

        if (environment == null) {
            throw new Error("Expected an enviroment.");
        }

        if (typeof this.environment.getReferenceAsync !== "function" ||
            typeof this.environment.getDecoratorAsync !== "function") {
            throw new Error("The environment needs to have both getReferenceAsync and getDecoratorAsync functions.");
        }
    }

    async assertAnyAsync() {
        if (this.schema.type === "any") {

            if (typeof this.value === "undefined") {
                throw new Error("Type any cannot be undefined.");
            }

        }
    }

    async assertArrayAsync() {
        if (this.schema.type === "array") {

            if (!Array.isArray(this.value)) {
                throw new Error("Expected an array.");
            }

            if (typeof this.schema.embedded !== "undefined" && typeof this.schema.embedded !== "boolean") {
                throw new Error("Expected the embedded property to be a boolean. ");
            }

            if (!Array(this.schema.itemClasses)) {
                throw new Error("Expected the itemClasses property to be an array. ");
            }

        }
    }

    async assertBooleanAsync() {
        if (this.schema.type === "boolean" && typeof this.value !== "boolean") {
            throw new Error("Expected a boolean.");
        }
    }

    async assertClassAsync() {
        const schema = this.schema;
        const value = this.value;

        if (schema.type === "class") {
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

            await this.assertPropertiesAsync();

            if (Array.isArray(schema.decorators)) {
                schema.decorators.forEach((decorator) => {
                    this.assertDecorator(decorator);
                });

                const decorators = await Promise.all(schema.decorators.map((decoratorInformation) => {
                    return this.environment.getDecoratorAsync(decoratorInformation);
                }));

                const validations = decorators.map((decorator) => {
                    if (decorator != null && typeof decorator.validateAsync === "function"){
                        return decorator.validateAsync(schema, value);
                    }
                });

                await Promise.all(validations);

            }

        }
    }

    async assertDateAsync() {
        if (this.schema.type === "date") {

            if (!this.dateFormat.test(this.value)) {
                throw new Error("Expected a date.");
            }

        }
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

    async assertNumberAsync() {
        if (this.schema.type === "number" && typeof this.value !== "number") {
            throw new Error("Expected a number.");
        }
    }

    assertIsReady() {
        if (this.schema == null) {
            throw new Error("Schema and value need to be set before validating.");
        }
    }

    async assertPropertiesAsync() {
        const schema = this.schema;
        const value = this.value;

        if (!Array.isArray(schema.properties)) {
            throw new Error("Expected the properties to be an array.");
        }

        return schema.properties.reduce((promise, property) => {
            return promise.then(() => {
                let resolvedDecorators = Promise.resolve([]);

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

                if (Array.isArray(property.decorators)) {

                    property.decorators.forEach((decorator) => {
                        this.assertDecorator(decorator);
                    });

                    resolvedDecorators = Promise.all(property.decorators.map((decoratorInformation) => {
                        return this.environment.getDecoratorAsync(decoratorInformation);
                    }));

                }

                const propertySchema = property.class;
                const propertyValue = value[property.name];
                const propertyValidator = new Validator(this.environment);

                return propertyValidator.validateAsync(propertySchema, propertyValue).then(() => {
                    return resolvedDecorators;
                }).then((decorators) => {

                    const validations = decorators.map((decorator) => {
                        return decorator.validateAsync(propertySchema, propertyValue);
                    });

                    return Promise.all(validations);
                });

            });

        }, Promise.resolve());
    }

    async assertReferenceAsync() {
        if (this.schema.type === "reference") {
            const schema = await this.environment.getReferenceAsync(this.schema);
            const validator = new Validator(this.environment);
            await validator.validateAsync(schema, this.value);
        }
    }

    async assertStringAsync() {
        if (this.schema.type === "string" && typeof this.value !== "string") {
            throw new Error("Expected a string.");
        }
    }

    assertSchema() {
        if (!this.knownTypes[this.schema.type]) {
            throw new Error(`Unknown schema, "${this.schema.type}".`);
        }
    }

    async validateAsync(schema, value, options) {
        if (typeof schema === "string") {
            schema = {
                type: schema
            }
        }

        this.value = value;
        this.schema = schema;
        this.options = options;

        this.assertIsReady();
        this.assertSchema();

        await this.assertAnyAsync();
        await this.assertArrayAsync();
        await this.assertBooleanAsync();
        await this.assertClassAsync();
        await this.assertReferenceAsync();
        await this.assertDateAsync();
        await this.assertNumberAsync();
        await this.assertStringAsync();

        return true;
    }
}