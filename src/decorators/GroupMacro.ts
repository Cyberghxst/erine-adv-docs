import { GroupObject } from "../main"

export function Group(options: GroupObject | string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value!.__group__ = {}
        if(typeof options == "object") {
            for(const property of Object.keys(options)) {
                descriptor.value.__group__[property] = options[property as keyof GroupObject]
            }
        } else descriptor.value.__group__.name = options
        if(!descriptor.value.__group__.description) descriptor.value.__group__.description = "..."
    }
}