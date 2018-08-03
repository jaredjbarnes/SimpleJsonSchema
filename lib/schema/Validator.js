"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator(environment) {
        _classCallCheck(this, Validator);

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

        if (typeof this.environment.getReferenceAsync !== "function" || typeof this.environment.getDecoratorAsync !== "function") {
            throw new Error("The environment needs to have both getReferenceAsync and getDecoratorAsync functions.");
        }
    }

    _createClass(Validator, [{
        key: "assertAnyAsync",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.schema.type === "any")) {
                                    _context.next = 3;
                                    break;
                                }

                                if (!(typeof this.value === "undefined")) {
                                    _context.next = 3;
                                    break;
                                }

                                throw new Error("Type any cannot be undefined.");

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function assertAnyAsync() {
                return _ref.apply(this, arguments);
            }

            return assertAnyAsync;
        }()
    }, {
        key: "assertArrayAsync",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.schema.type === "array")) {
                                    _context2.next = 7;
                                    break;
                                }

                                if (Array.isArray(this.value)) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("Expected an array.");

                            case 3:
                                if (!(typeof this.schema.embedded !== "undefined" && typeof this.schema.embedded !== "boolean")) {
                                    _context2.next = 5;
                                    break;
                                }

                                throw new Error("Expected the embedded property to be a boolean. ");

                            case 5:
                                if (Array(this.schema.itemClasses)) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new Error("Expected the itemClasses property to be an array. ");

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function assertArrayAsync() {
                return _ref2.apply(this, arguments);
            }

            return assertArrayAsync;
        }()
    }, {
        key: "assertBooleanAsync",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(this.schema.type === "boolean" && typeof this.value !== "boolean")) {
                                    _context3.next = 2;
                                    break;
                                }

                                throw new Error("Expected a boolean.");

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function assertBooleanAsync() {
                return _ref3.apply(this, arguments);
            }

            return assertBooleanAsync;
        }()
    }, {
        key: "assertClassAsync",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this = this;

                var schema, value, decorators, validations;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                schema = this.schema;
                                value = this.value;

                                if (!(schema.type === "class")) {
                                    _context4.next = 23;
                                    break;
                                }

                                if (!(typeof schema.name !== "string")) {
                                    _context4.next = 5;
                                    break;
                                }

                                throw new Error("Expected the name of a class to be a string.");

                            case 5:
                                if (!(typeof schema.label !== "string")) {
                                    _context4.next = 7;
                                    break;
                                }

                                throw new Error("Expected the label of a class to be a string.");

                            case 7:
                                if (!(typeof schema.description !== "string")) {
                                    _context4.next = 9;
                                    break;
                                }

                                throw new Error("Expected the description of a class to be a string.");

                            case 9:
                                if (!(typeof schema.version !== "string")) {
                                    _context4.next = 11;
                                    break;
                                }

                                throw new Error("Expected the version of a class to be a string.");

                            case 11:
                                if (!(schema.decorators != null && !Array.isArray(schema.decorators))) {
                                    _context4.next = 13;
                                    break;
                                }

                                throw new Error("Expected the decorators of a class to be an array.");

                            case 13:
                                _context4.next = 15;
                                return this.assertPropertiesAsync();

                            case 15:
                                if (!Array.isArray(schema.decorators)) {
                                    _context4.next = 23;
                                    break;
                                }

                                schema.decorators.forEach(function (decorator) {
                                    _this.assertDecorator(decorator);
                                });

                                _context4.next = 19;
                                return Promise.all(schema.decorators.map(function (decoratorInformation) {
                                    return _this.environment.getDecoratorAsync(decoratorInformation);
                                }));

                            case 19:
                                decorators = _context4.sent;
                                validations = decorators.map(function (decorator) {
                                    if (decorator != null && typeof decorator.validateAsync === "function") {
                                        return decorator.validateAsync(schema, value);
                                    }
                                });
                                _context4.next = 23;
                                return Promise.all(validations);

                            case 23:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function assertClassAsync() {
                return _ref4.apply(this, arguments);
            }

            return assertClassAsync;
        }()
    }, {
        key: "assertDateAsync",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!(this.schema.type === "date")) {
                                    _context5.next = 3;
                                    break;
                                }

                                if (this.dateFormat.test(this.value)) {
                                    _context5.next = 3;
                                    break;
                                }

                                throw new Error("Expected a date.");

                            case 3:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function assertDateAsync() {
                return _ref5.apply(this, arguments);
            }

            return assertDateAsync;
        }()
    }, {
        key: "assertDecorator",
        value: function assertDecorator(decorator) {
            if (decorator == null) {
                throw new Error("Expected the decorator to be an object.");
            }

            if (typeof decorator.name !== "string") {
                throw new Error("Expected the decorator's name property to be a string.");
            }

            if (decorator.config == null || decorator.config != null && (typeof decorator === "undefined" ? "undefined" : _typeof(decorator)) !== "object") {
                throw new Error("Expected the decorator's config property to be an object.");
            }
        }
    }, {
        key: "assertNumberAsync",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!(this.schema.type === "number" && typeof this.value !== "number")) {
                                    _context6.next = 2;
                                    break;
                                }

                                throw new Error("Expected a number.");

                            case 2:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function assertNumberAsync() {
                return _ref6.apply(this, arguments);
            }

            return assertNumberAsync;
        }()
    }, {
        key: "assertIsReady",
        value: function assertIsReady() {
            if (this.schema == null) {
                throw new Error("Schema and value need to be set before validating.");
            }
        }
    }, {
        key: "assertPropertiesAsync",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _this2 = this;

                var schema, value;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                schema = this.schema;
                                value = this.value;

                                if (Array.isArray(schema.properties)) {
                                    _context7.next = 4;
                                    break;
                                }

                                throw new Error("Expected the properties to be an array.");

                            case 4:
                                return _context7.abrupt("return", schema.properties.reduce(function (promise, property) {
                                    return promise.then(function () {
                                        var resolvedDecorators = Promise.resolve([]);

                                        if (typeof property.name !== "string") {
                                            throw new Error("Expected the name of a property to be a string.");
                                        }

                                        if (typeof property.class !== "string" && property.class != null && _typeof(property.class) === "object" && typeof property.class.type !== "string") {
                                            throw new Error("Expected the class of a property to be a string, or an object with the type property being a string.");
                                        }

                                        if (typeof property.label !== "string") {
                                            throw new Error("Expected the label of a property to be a string.");
                                        }

                                        if (property.decorators != null && !Array.isArray(property.decorators)) {
                                            throw new Error("Expected the decorators on the \"" + property.name + "\" property to be an Array.");
                                        }

                                        if (Array.isArray(property.decorators)) {

                                            property.decorators.forEach(function (decorator) {
                                                _this2.assertDecorator(decorator);
                                            });

                                            resolvedDecorators = Promise.all(property.decorators.map(function (decoratorInformation) {
                                                return _this2.environment.getDecoratorAsync(decoratorInformation);
                                            }));
                                        }

                                        var propertySchema = property.class;
                                        var propertyValue = value[property.name];
                                        var propertyValidator = new Validator(_this2.environment);

                                        return propertyValidator.validateAsync(propertySchema, propertyValue).then(function () {
                                            return resolvedDecorators;
                                        }).then(function (decorators) {

                                            var validations = decorators.map(function (decorator) {
                                                return decorator.validateAsync(propertySchema, propertyValue);
                                            });

                                            return Promise.all(validations);
                                        });
                                    });
                                }, Promise.resolve()));

                            case 5:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function assertPropertiesAsync() {
                return _ref7.apply(this, arguments);
            }

            return assertPropertiesAsync;
        }()
    }, {
        key: "assertReferenceAsync",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var schema, validator;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (!(this.schema.type === "reference")) {
                                    _context8.next = 7;
                                    break;
                                }

                                _context8.next = 3;
                                return this.environment.getReferenceAsync(this.schema);

                            case 3:
                                schema = _context8.sent;
                                validator = new Validator(this.environment);
                                _context8.next = 7;
                                return validator.validateAsync(schema, this.value);

                            case 7:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function assertReferenceAsync() {
                return _ref8.apply(this, arguments);
            }

            return assertReferenceAsync;
        }()
    }, {
        key: "assertStringAsync",
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                if (!(this.schema.type === "string" && typeof this.value !== "string")) {
                                    _context9.next = 2;
                                    break;
                                }

                                throw new Error("Expected a string.");

                            case 2:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function assertStringAsync() {
                return _ref9.apply(this, arguments);
            }

            return assertStringAsync;
        }()
    }, {
        key: "assertSchema",
        value: function assertSchema() {
            if (!this.knownTypes[this.schema.type]) {
                throw new Error("Unknown schema, \"" + this.schema.type + "\".");
            }
        }
    }, {
        key: "validateAsync",
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(schema, value, options) {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                if (typeof schema === "string") {
                                    schema = {
                                        type: schema
                                    };
                                }

                                this.value = value;
                                this.schema = schema;
                                this.options = options;

                                this.assertIsReady();
                                this.assertSchema();

                                _context10.next = 8;
                                return this.assertAnyAsync();

                            case 8:
                                _context10.next = 10;
                                return this.assertArrayAsync();

                            case 10:
                                _context10.next = 12;
                                return this.assertBooleanAsync();

                            case 12:
                                _context10.next = 14;
                                return this.assertClassAsync();

                            case 14:
                                _context10.next = 16;
                                return this.assertReferenceAsync();

                            case 16:
                                _context10.next = 18;
                                return this.assertDateAsync();

                            case 18:
                                _context10.next = 20;
                                return this.assertNumberAsync();

                            case 20:
                                _context10.next = 22;
                                return this.assertStringAsync();

                            case 22:
                                return _context10.abrupt("return", true);

                            case 23:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function validateAsync(_x, _x2, _x3) {
                return _ref10.apply(this, arguments);
            }

            return validateAsync;
        }()
    }]);

    return Validator;
}();

exports.default = Validator;
//# sourceMappingURL=Validator.js.map