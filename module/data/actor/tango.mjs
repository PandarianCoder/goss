import BaseActorData from "./base-actor.mjs";

const { SchemaField, NumberField, StringField } = foundry.data.fields;

export default class TangoData extends BaseActorData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            tier: new StringField({
                required: true,
                choices: ["minor", "standard", "major"],
                initial: "standard"
            }),

            //Stats, all editable
            awareness: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            skill: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            ranged: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            melee: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            defence: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            morale: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

            //Wounds
            wounds: new SchemaField({
                value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                max: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            })
        };
    }
}