export default class Reference {
    constructor({environment, schema, value}) {
        this.type = "reference";
        this.environment = environment;
        this.schema = schema;
        this.value = value;
    }

    async validateAsync() {
        if (this.schema.type === "reference") {
            const schema = await this.environment.getReferenceAsync(this.schema);
            const validator = new Validator(this.environment);
            await validator.validateAsync(schema, this.value);
        }
    }
}