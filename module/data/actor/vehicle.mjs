import BaseActorData from "./base-actor.mjs";

const { NumberField, StringField, ArrayField, HTMLField, DocumentUUIDField } = foundry.data.fields;

export default class VehicleData extends BaseActorData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            notes: new HTMLField({ required: false, blank: true }),

            //Identity
            category: new StringField({
                required: true,
                choices: ["ground", "aviation", "maritime", "uav", "ugv"],
                initial: "ground"
            }),

            speed: new NumberField({ required: true, integer: true, min: 0, initial: 0}),
            armourRating: new NumberField({ required: true, integer: true, min: 0, initial: 0}),

            //Crew & Passengers
            occupants: new ArrayField(
                new DocumentUUIDField({ required: true, type: "Actor" }),
                { required: false }
            )
        }
    }
}