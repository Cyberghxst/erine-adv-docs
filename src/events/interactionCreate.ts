import { Event, Erine, Interaction } from "../main"

class interactionCreate extends Event {
    constructor(bot: Erine) {
        super(bot)
    }
    async code(interaction: Interaction): Promise<void> {
        
    }
}

export const data = interactionCreate