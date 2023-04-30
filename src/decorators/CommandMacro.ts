export interface CommandOptions {
    name?: string
    description?: string
    aliases?: string[]
    usage?: string
    prefix?: boolean
    slash?: boolean
}

export function Command(options: CommandOptions) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value!.__builder__ = {}
        descriptor.value.__allowed__ = ["prefix", "slash"]
        for(const property of Object.keys(options)) {
            descriptor.value.__builder__[property] = options[property as keyof CommandOptions]
        }
        if(!descriptor.value.__builder__.description) descriptor.value.__builder__.description = "..."
        descriptor.value.__type__ = "command"
        if(!descriptor.value.__builder__.name) descriptor.value.__builder__.name = key.toLowerCase()
    }
}