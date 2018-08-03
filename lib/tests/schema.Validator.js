"use strict";

require("babel-polyfill");

var _assert = require("assert");

var assert = _interopRequireWildcard(_assert);

var _Validator = require("../schema/Validator");

var _Validator2 = _interopRequireDefault(_Validator);

var _Environment = require("./mock/Environment");

var _Environment2 = _interopRequireDefault(_Environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports["schema.Validate: No environment."] = function () {
    assert.throws(function () {
        var validator = new _Validator2.default();
    }, "Expected to throw because there wasn't an environment.");
};

exports["schema.Validate: Invalid environment."] = function () {
    assert.throws(function () {
        var validator = new _Validator2.default({});
    }, "Expected to throw because the environment was invalid.");
};

exports["schema.Validate: Invalid schema."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    validator.validateAsync(null, {}).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    });
};

exports["schema.Validate: String (Long Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync({ type: "string" }, "String").then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: String (Short Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("string", "String").then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: String (Bad Value)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("string", 0).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected a string.");
    });
};

exports["schema.Validate: Date (Long Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("date", JSON.parse(JSON.stringify(new Date()))).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Date (Short Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("date", JSON.parse(JSON.stringify(new Date()))).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Date (Bad Value)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("date", "").then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected a date.");
    });
};

exports["schema.Validate: Boolean (Long Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("boolean", false).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Boolean (Short Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("boolean", true).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Boolean (Bad Value)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("boolean", "").then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected a boolean.");
    });
};

exports["schema.Validate: Number (Long Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("number", 2).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Number (Short Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("number", 1).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Number (Bad Value)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("number", "").then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected a number.");
    });
};

exports["schema.Validate: Any (Long Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("any", 2).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Any (Short Hand)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("any", {}).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Any (Bad Value)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());

    return validator.validateAsync("any", undefined).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Type any cannot be undefined.");
    });
};

exports["schema.Validate: Class."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human.",
        version: "1.0.0",
        properties: [{
            class: "string",
            name: "firstName",
            label: "FirstName"
        }]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.equal(result, true);
    });
};

exports["schema.Validate: Class with no name."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class"
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the name of a class to be a string.");
    });
};

exports["schema.Validate: Class with no label."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person"
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the label of a class to be a string.");
    });
};

exports["schema.Validate: Class with no description."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person"
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the description of a class to be a string.");
    });
};

exports["schema.Validate: Class with no version."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human"
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the version of a class to be a string.");
    });
};

exports["schema.Validate: Class with invalid decorators property."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        decorators: 0
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the decorators of a class to be an array.");
    });
};

exports["schema.Validate: Class with invalid decorator (null)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [null]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the decorator to be an object.");
    });
};

exports["schema.Validate: Class with invalid decorator (no name)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [{}]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
};

exports["schema.Validate: Class with invalid properties."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: 0
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the properties to be an array.");
    });
};

exports["schema.Validate: Class with invalid decorator (invalid name)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [{
            name: 0
        }]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the decorator's name property to be a string.");
    });
};

exports["schema.Validate: Class with invalid decorator (invalid config)."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [{
            name: "queryable",
            config: null
        }]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.fail(result, false, "Unexpected result", "=");
    }).catch(function (error) {
        assert.equal(error.message, "Expected the decorator's config property to be an object.");
    });
};

exports["schema.Validate: Class with valid decorator."] = function () {
    var validator = new _Validator2.default(new _Environment2.default());
    var model = {
        type: "class",
        name: "Person",
        label: "Person",
        description: "A Human",
        version: "1.0.0",
        properties: [],
        decorators: [{
            name: "queryable",
            config: {}
        }]
    };

    var object = {
        firstName: "John"
    };

    return validator.validateAsync(model, object).then(function (result) {
        assert.equal(result, true);
    });
};
//# sourceMappingURL=schema.Validator.js.map