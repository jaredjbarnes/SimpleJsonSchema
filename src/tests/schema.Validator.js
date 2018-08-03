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
    const validator = new Validator(new Environment());
    validator.validateAsync(null, {}).then((result)=>{
        assert.fail(result, false, "Unexpected result", "=");
    });
}

exports["schema.Validate: String (Long Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync({ type: "string" }, "String").then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: String (Short Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("string", "String").then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: String (Bad Value)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("string", 0).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a string.");
    });
}

exports["schema.Validate: Date (Long Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("date", JSON.parse(JSON.stringify(new Date()))).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Date (Short Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("date", JSON.parse(JSON.stringify(new Date()))).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Date (Bad Value)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("date", "").then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a date.");
    });
}

exports["schema.Validate: Boolean (Long Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("boolean", false).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Boolean (Short Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("boolean", true).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Boolean (Bad Value)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("boolean", "").then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a boolean.");
    });
}

exports["schema.Validate: Number (Long Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("number", 2).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Number (Short Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("number", 1).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Number (Bad Value)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("number", "").then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected a number.");
    });
}

exports["schema.Validate: Any (Long Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("any", 2).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Any (Short Hand)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("any", {}).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Any (Bad Value)."] = () => {
    const validator = new Validator(new Environment());

    return validator.validateAsync("any", undefined).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Type any cannot be undefined.");
    });
}

exports["schema.Validate: Class."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.equal(result, true);
    });
}

exports["schema.Validate: Class with no name."] = () => {
    const validator = new Validator(new Environment());
    const model = {
        type: "class"
    };

    const object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the name of a class to be a string.");
    });
}

exports["schema.Validate: Class with no label."] = () => {
    const validator = new Validator(new Environment());
    const model = {
        type: "class",
        name: "Person"
    };

    const object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the label of a class to be a string.");
    });
}

exports["schema.Validate: Class with no description."] = () => {
    const validator = new Validator(new Environment());
    const model = {
        type: "class",
        name: "Person",
        label: "Person"
    };

    const object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the description of a class to be a string.");
    });
}

exports["schema.Validate: Class with no version."] = () => {
    const validator = new Validator(new Environment());
    const model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human"
    };

    const object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the version of a class to be a string.");
    });
}

exports["schema.Validate: Class with invalid decorators property."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorators of a class to be an array.");
    });
}

exports["schema.Validate: Class with invalid decorator (null)."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator to be an object.");
    });
}

exports["schema.Validate: Class with invalid decorator (no name)."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
}

exports["schema.Validate: Class with invalid properties."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the properties to be an array.");
    });
}

exports["schema.Validate: Class with invalid decorator (invalid name)."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
}

exports["schema.Validate: Class with invalid decorator (invalid config)."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch((error) => {
        assert.equal(error.message, "Expected the decorator's config property to be an object.");
    });
}

exports["schema.Validate: Class with valid decorator."] = () => {
    const validator = new Validator(new Environment());
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

    return validator.validateAsync(model, object).then((result) => {
        assert.equal(result, true);
    });
}