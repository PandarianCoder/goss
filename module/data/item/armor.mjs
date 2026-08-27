import BaseItemData from "./base-item.mjs";

const { NumberField, StringField } = foundry.data.fields;

export default class ArmorData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            slot: new StringField({
                required: true,
                choices: ["body", "arm", "leg", "helmet", "shield"],
                initial: "body"
            }),

            encumbrance: new NumberField({ required: true, integer: true, min: 0, initial: 0}),
            armorRating: new NumberField({ required: true, integer: true, min: 0, initial: 0})
        };
    }
}