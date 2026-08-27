import BaseItemData from "./base-item.mjs";

const { NumberField, StringField, ArrayField, DocumentUUIDField } = foundry.data.fields;

export default class DroneData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),

      category: new StringField({
        required: true,
        choices: ["uav", "ugv"],
        initial: "uav"
      }),

      range: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      encumbrance: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      requisitionPoints: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),

      loadout: new ArrayField(
        new DocumentUUIDField({ required: true, type: "Item" }),
        { required: false }
      )
    };
  }
}