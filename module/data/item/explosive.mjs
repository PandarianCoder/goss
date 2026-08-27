import BaseItemData from "./base-item.mjs";

const { NumberField, StringField } = foundry.data.fields;

export default class ExplosiveData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),

      category: new StringField({
        required: true,
        choices: ["explosives", "minesIeds", "grenades"],
        initial: "explosives"
      }),

      damage: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      effectRadius: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

      requisitionPoints: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
    };
  }
}