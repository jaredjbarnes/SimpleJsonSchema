export default class Enviroment {
    constructor() {
        this.references = {

        };
    }

    getDecoratorAsync() {
        return {
            validateAsync() {
                return true;
            }
        }
    }

    getReferenceAsync() { }
}