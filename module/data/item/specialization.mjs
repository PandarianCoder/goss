import BaseItemData from "./base-item.mjs";

const { NumberField, StringField } = foundry.data.fields;

export default class SpecializationData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            rating: new NumberField({ required: true, integer: true, min: 1, max: 3, initial: 1 }),

            attribute: new StringField({
                required: true,
                choices: ["coordination", "reflexes", "focus", "fitness", "agility", "intellect"],
                initial: "coordination"
            })
        };
    }
}