const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export default class VehicleSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        classes: ["goss", "sheet", "actor", "vehicle"],
        position: { width: 560, height: 640 },
        window: { resizable: true },
        dragDrop: [{ dragSelector: null, dropSelector: 
            ".occupants-drop-zone" }],
        actions: {
            removeOccupant: VehicleSheet.#onRemoveOccupant,
            editItem: VehicleSheet.#onEditItem,
            deleteItem: VehicleSheet.#onDeleteItem,
            createItem: VehicleSheet.#onCreateItem
        }
    };

    static PARTS = {
        form: { template: "systems/goss/templates/actor/vehicle/form.hbs",
            scrollable:[""] }
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.actor = this.actor;
        context.system = this.actor.system;

        const occupants = await Promise.all(
            (this.actor.systems.occupants ?? []).map((uuid) => fromUuid(uuid))
        );

        context.occupants = occupants.filter((a) => a);

        context.weapons = this.actor.items.filter((i) => i.type === "weapon");

        context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
            this.actor.system.description,
            { relativeTo: this.actor, secrets: this.actor.isOwner}
        );

        return context;
    }

    async _onDropActor(event, data) {
        if (!event.target.closest(".occupants-drop-zone")) {
            return super._onDropActor(event, data);
        }

        const droppedActor = await fromUuid(data.uuid);
        if (!droppedActor) return;

        const current = this.actor.system.occupants ?? [];
        if (current.includes(droppedActor.uuid)) return;

        await this.actor.update({"system.occupants": [...current, droppedActor.uuid]});
    }

    static async #onRemoveOccupant(event, target) {
        const current = this.actor.system.occupants ?? [];
        await this.actor.update({ 
            "system.occupants": current.filter((uuid) => uuid !== target.dataset.uuid)
        });
    }

    static async #onEditItem(event, target) {
        const item = this.actor.items.get(target.dataset.itemId);
        item?.sheet.render(true);
    }

    static async #onDeleteItem(event, target) {
        const item = this.actor.items.get(target.dataset.itemId);
        if(!item) return;

        const confirmed = await foundry.applications.api.DialogV2.confirm({
            window: { title: "Delete Item" },
            content: `<p>Delete <strong>${item.name}</strong>?</p>`
        });
        if(!confirmed) return;

        await item.delete();
    }

    static async #onCreateItem(event, target) {
        const type = target.dataset.itemType;
        if (!item) return;

        const label = type.charAt(0).toUpperCase() + type.slice(1);
        await this.actor.createEmbeddedDocuments("item", [
            { name: `New ${label}`, type}
        ]);
    }
}