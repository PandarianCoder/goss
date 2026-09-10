import BaseItemData from "./base-item.mjs";

const { NumberField, StringField, SchemaField, ArrayField } = foundry.data.fields;

export default class AmmoData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            trackingType: new StringField({
                required: true,
                choices: ["magazine", "stack"],
                initial: "magazine"
            }),

            damage: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

            magazines: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
            roundsUsed: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 0 }),

            quantity: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
        };
    }
}