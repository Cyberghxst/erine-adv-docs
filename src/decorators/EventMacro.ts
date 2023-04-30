export function Event(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value.__type__ = "event"
    return descriptor
}