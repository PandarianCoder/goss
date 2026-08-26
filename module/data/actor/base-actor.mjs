const { HTMLField } = foundry.data.fields;

export default class BaseActorData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            description: new HTMLField({ required: false, blank: true })
        };
    }
}