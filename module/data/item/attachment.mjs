import BaseItemData from "./base-item.mjs";

const { NumberField, StringField } = foundry.data.fields;

export default class AttachmentData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),

      category: new StringField({
        required: true,
        choices: ["standard", "sights", "gunsmith"],
        initial: "standard"
      }),

      effects: new ArrayField(
        new SchemaField({
          type: new StringField({
            required: true,
            choices: ["hitBonus", "rangeBandModifier", "removeDisadvantage", "other"],
            initial: "hitBonus"
          }),
          value: new NumberField({ required: false, integer: true }),
          rangeBand: new StringField({
            required: false,
            nullable: true,
            choices: ["cqb", "short", "medium", "long", "extreme"],
            initial: null // null = not tied to a specific band
          }),
          weaponCategories: new ArrayField(
            new StringField({ required: true }),
            { required: false }
          ),
          condition: new StringField({ required: false, blank: true }) 
        }),
        { required: false }
      ),

      encumbrance: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      requisitionPoints: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
    };
  }
}