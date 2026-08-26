import BaseActorData from "./base-actor.mjs";

export default class OperatorData extends BaseActorData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            // Identity
            name: new StringField({ required: true, blank: false }),
            callSign: new StringField({ required: false, blank: true }),
            age: new NumberField({ required: false, integer: true, min: 0}),
            country: new StringField({ required: false, blank: true }),
            career: new StringField({ required: false, blank: true }),
            looks: new StringField({ required: false, blank: true }),
            notes: new StringField({ required: false, blank: true }),

            // Attributes - 0 to 7
            attributes: new SchemaField({
                coordination: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
                reflexes: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
                fitness: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
                agility: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
                focus: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
                intellect: new NumberField({ required: true, integer: true, min: 0, max: 7, initial: 0 }),
            }),
            
            // Health - 0 to 12
            health: new SchemaField({
                wounds: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                max: new NumberField({ required: true, integer: true, min: 0, initial: 12 }),
            }),

            //Derived Stats
            derived: new SchemaField({
                damageBonus: new NumberField({ required: true, integer: true, initial: 0 }),
                defence: new NumberField({ required: true, integer: true, initial: 0 }),
                initiative: new NumberField({ required: true, integer: true, initial: 0 }),
                actions: new NumberField({ required: true, integer: true, initial: 0 }),
                encumbrance: new NumberField({ required: true, integer: true, initial: 0 }),
                perception: new NumberField({ required: true, integer: true, initial: 0 }),
            }),

            //Derived Stats Set Numbers
            preparedDerivedData() {
                super.preparedDerivedData();

                const attrs = this.attributes;
                const focusReflexes = attrs.focus + attrs.reflexes;

                this.derived.damageBonus = Math.ceil((attrs.fitness + attrs.agility) / 3);
                this.derived.defence = Math.ceil((attrs.reflexes + attrs.agility) / 2);
                this.derived.encumbrance = 10 + attrs.fitness;
                this.derived.initiative = Math.ceil(focusReflexes / 2);
                this.derived.perception = attrs.focus;

                //Actions
                let actionBonus = 0;
                if (focusReflexes >= 11) actionBonus = 2;
                else if (focusReflexes >= 7) actionBonus = 1;
                this.derived.actions = 2 + actionBonus;
            },

            //Resources
            unitReputation: new NumberField({ required: true, integer: true, initial: 0 }),
            advantage: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            boosts: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 3 }),
            advancementPoints: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        };
    }
}