import TangoData from "./tango.mjs";

const { StringField } = foundry.data.fields;

export default class HvtData extends TangoData {
    static defineSchema() {
        const schema = super.defineSchema();

        schema.tier = new StringField ({
            required: true,
            choices: ["influential", "untouchable"],
            initial: "influential"
        });

        schema.role = new StringField({ required: false, blank: true});

        return schema;
    }
}