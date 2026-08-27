import BaseItemData from "./base-item.mjs";

const { SchemaField, NumberField, StringField, ArrayField, DocumentUUIDField } = foundry.data.fields;

export default class WeaponData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            category: new StringField({ 
                required: true,
                choices: [
                    "assaultRifle", "battleRifle", "carbine", "handgun", "lmg", "shotgun", "smg", "sniperRifle",
                    "rocketLauncher", "grenadeLauncher", 
                    "unarmed", "handheld", "bow", "crossbow", "throwingKnife"
                ],

                initial: "assaultRifle"
            }),

            encumbrance: new NumberField({ required: true, integer: true, min: 0, initial: 0}),

            rangeBands: (() => {
                const modifiers = ["dav2", "dav1", "none", "adv1", "adv2"];
                const band = () => new StringField({
                    required: false,
                    nullable: true,
                    blank: false,
                    choices: modifiers,
                    initial: null
                });

                return new SchemaField({
                    cqb: band(),
                    short: band(),
                    medium: band(),
                    long: band(),
                    extreme: band(),
                });
            })(),

            calibre: new StringField({ required: false, blank: true }), // ammo type this weapon takes

            railPoints: new NumberField({ required: false, integer: true, min: 0, initial: 0 }),


            attachments: new ArrayField(
                new DocumentUUIDField({ required: true, type: "Item" }),
                { required: false }
            ),


            location: new StringField({
                required: false,
                choices: ["carried", "weaponMounted"],
                initial: "carried"
            }),

            damage: new NumberField({ required: false, integer: true, initial: 0 }),
            areaOfEffect: new NumberField({ required: false, integer: true, initial: 0 }),
            range: new NumberField({ required: false, integer: true, initial: 0 })

        };
    }
}