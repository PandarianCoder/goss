import BaseActorData from "./base-actor.mjs";

const { SchemaField, NumberField, StringField, HTMLField, DocumentUUIDField } = foundry.data.fields;

export default class K9Data extends BaseActorData {
    static defineSchema() {

        const { description, ...base } = super.defineSchema();

        return {
            ...base,
            notes: new HTMLField({ required: false, blank: true }),

            //Identity
            handler: new DocumentUUIDField({ required: false, nullable: true, type: "Actor" }),
            breed: new StringField({ required: false, blank: true }),

            //Attributes - 0 to 7
            attributes: new SchemaField({
                track: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 3 }),
                combat: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 3 }),
                detect: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 3 }),
                stealth: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 3 }),
                fitness: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 3 }),
            }),

            //Health - 9 Boxes
            health: new SchemaField({
                wounds: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                max: new NumberField({ required: true, integer: true, min: 0, initial: 9 }),
            }),

            //Derived Stats
            derived: new SchemaField({
                damageBonus: new NumberField({ required: true, integer: true, initial: 0 }),
                defence: new NumberField({ required: true, integer: true, initial: 0 }),
                initiative: new NumberField({ required: true, integer: true, initial: 0 }),
                perception: new NumberField({ required: true, integer: true, initial: 0 }),
                actions: new NumberField({ required: true, integer: true, initial: 3 }),
            }),

            //Derived Stats Set Numbers
            preparedDerivedData() {
                super.preparedDerivedData();

                const attrs = this.attributes;

                this.derived.damageBonus = Math.ceil((attrs.combat + attrs.fitness) / 2);
                this.derived.defence = Math.ceil((attrs.combat + attrs.detect) / 2) + 1;
                this.derived.initiative = Math.ceil((attrs.fitness + attrs.detect) / 2);
                this.derived.perception = attrs.detect;
                this.derived.actions = 3;
            },
            //Resources
            boosts: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 3 }),
        }
    }
}