import BaseActorData from "./base-actor.mjs";

const { NumberField, StringField, ArrayField, HTMLField, DocumentUUIDField } = foundry.data.fields;

export default class SafehouseData extends BaseActorData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            notes: new HTMLField({ required: false, blank: true }),

            category: new StringField ({
                required: true,
                choices: ["apartment", "house", "front", "bunker"],
                initial: "apartment"
            }),

            level: new NumberField({ required: true, integer: true, min: 1, max: 3, initial: 1}),

            occupants: new ArrayField(
                new DocumentUUIDField({ required: true, type: "Actor" }),
                { required: false }
            )
        }
    }
}