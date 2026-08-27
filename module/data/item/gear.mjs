import BaseItemData from "./base-item.mjs";

const { NumberField } = foundry.data.fields;

export default class GearData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            quantity: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
            encumbrance: new NumberField({ required: true, integer: true, min: 0, initial: 0}),
            requisitionPoints: new NumberField({ required: true, integer: true, min: 0, initial: 0})
        };
    }
}