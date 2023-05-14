import { ApplicationCommandTypes } from "oceanic.js"

export function ContextMenu(component: ApplicationCommandTypes.MESSAGE | ApplicationCommandTypes.USER) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value.__type__ = "context"
        descriptor.value.__component__ = component
        return descriptor
    }
}