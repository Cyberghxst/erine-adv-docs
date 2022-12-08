import { ErineClient } from "@types";

class Coreback {
    client: ErineClient
    constructor(client: ErineClient) {
        if(!client) throw new SyntaxError('Missing client')
        this.client = client
    }
    isType<T, R>(obj: any, func: (obj: R) => boolean): obj is T {
        return func(obj)
    }
}

export { Coreback }