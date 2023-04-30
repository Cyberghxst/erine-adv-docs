import { Interaction, Maker } from "../main";
declare class InteractionHandler extends Maker {
    interactionCreate(interaction: Interaction): Promise<boolean | undefined>;
}
export declare const data: typeof InteractionHandler;
export {};
