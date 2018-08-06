import "babel-polyfill";
import * as assert from "assert";
import Validator from "../schema/Validator";
import Environment from "./mock/Environment";

exports["schema.Validate: No environment."] = () => {
    assert.throws(() => {
        const validator = new Validator();
    }, "Expected to throw because there wasn't an environment.")
}

exports["schema.Validate: Invalid environment."] = () => {
    assert.throws(() => {
        const validator = new Validator({});
    }, "Expected to throw because the environment was invalid.")
}

exports["schema.Validate: Invalid schema."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: null,
        value: {}
    });

    validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    });
}

exports["schema.Validate: String (Long Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: { type: "string" },
        value: "String"
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: String (Short Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "string",
        value: "String"
    });

    return validator.validateAsync("string", "String").then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: String (Bad Value)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "string",
        value: 0
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a string.");
    });
}

exports["schema.Validate: Date (Long Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: {
            type: "date"
        },
        value: JSON.parse(JSON.stringify(new Date()))
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Date (Short Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "date",
        value: JSON.parse(JSON.stringify(new Date()))
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Date (Bad Value)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: {
            type: "date"
        },
        value: ""
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a date.");
    });
}

exports["schema.Validate: Boolean (Long Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: {
            type: "boolean"
        },
        value: false
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Boolean (Short Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "boolean",
        value: true
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Boolean (Bad Value)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "boolean",
        value: ""
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a boolean.");
    });
}

exports["schema.Validate: Number (Long Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: {
            type: "number"
        },
        value: 2
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Number (Short Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "number",
        value: 1
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Number (Bad Value)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "number",
        value: ""
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a number.");
    });
}

exports["schema.Validate: Any (Long Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: {
            type: "any"
        },
        value: {}
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Any (Short Hand)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "any",
        value: {}
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Any (Bad Value)."] = () => {
    const validator = new Validator({
        environment: new Environment(),
        schema: "any",
        value: undefined
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, `Type "any" cannot be undefined.`);
    });
}

exports["schema.Validate: Class."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human.",
        version: "1.0.0",
        properties: [
            {
                class: "string",
                name: "firstName",
                label: "FirstName"
            }
        ]
    };

    const object = {
        firstName: "John"
    };
    
    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Class with no name."] = () => {
    const model = {
        type: "class"
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the name of a class to be a string.");
    });
}

exports["schema.Validate: Class with no label."] = () => {
    const model = {
        type: "class",
        name: "Person"
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the label of a class to be a string.");
    });
}

exports["schema.Validate: Class with no description."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person"
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the description of a class to be a string.");
    });
}

exports["schema.Validate: Class with no version."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human"
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the version of a class to be a string.");
    });
}

exports["schema.Validate: Class with invalid decorators property."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        decorators: 0
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorators of a class to be an array.");
    });
}

exports["schema.Validate: Class with invalid decorator (null)."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [
            null
        ]
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator to be an object.");
    });
}

exports["schema.Validate: Class with invalid decorator (no name)."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [
            {}
        ]
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
}

exports["schema.Validate: Class with invalid properties."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: 0
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the properties to be an array.");
    });
}

exports["schema.Validate: Class with invalid decorator (invalid name)."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [
            {
                name: 0
            }
        ]
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
}

exports["schema.Validate: Class with invalid decorator (invalid config)."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [
            {
                name: "queryable",
                config: null
            }
        ]
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's config property to be an object.");
    });
}

exports["schema.Validate: Class with valid decorator."] = () => {
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [
            {
                name: "queryable",
                config: {}
            }
        ]
    };

    const object = {
        firstName: "John"
    };

    const validator = new Validator({
        environment: new Environment(),
        schema: model,
        value: object
    });

    return validator.validateAsync().then((result) => {
        assert.equal(result, true);
    });
}