export function Dispatch(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value.__type__ = "interaction"
    return descriptor
}