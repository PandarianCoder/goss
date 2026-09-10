import ItemCrudMixin from "../mixins/item-crud-mixin.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export default class OperatorSheet extends ItemCrudMixin(HandlebarsApplicationMixin(ActorSheetV2)) {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "actor", "operator"],
    position: { width: 720, height: 780 },
    window: { resizable: true },
    actions: {
      toggleEquipped: OperatorSheet.#onToggleEquipped,
      setSpecializationRating: OperatorSheet.#onSetSpecializationRating,
      reloadAmmo: OperatorSheet.#onReloadAmmo
    }
  };

    static PARTS = {
        header: { template: "systems/goss/templates/actor/operator/header.hbs" },
        tabs: { template: "templates/generic/tab-navigation.hbs" },
        main: { template: "systems/goss/templates/actor/operator/main.hbs", scrollable: [""] },
        inventory: { template: "systems/goss/templates/actor/operator/inventory.hbs", scrollable: [""] },
        specializations: { template: "systems/goss/templates/actor/operator/specializations.hbs", scrollable: [""] },
        background: { template: "systems/goss/templates/actor/operator/background.hbs", scrollable: [""] }
    };

    static TABS = {
        primary: {
            tabs: [
                { id: "main", icon: "fa-solid fa-user" },
                { id: "inventory", icon: "fa-solid fa-briefcase" },
                { id: "specializations", icon: "fa-solid, fa-star" },
                { id: "background", icon: "fa-solid fa-book" }
            ],
            labelPrefix: "GOSS.Operator.Tabs",
            initial: "main"
        }
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);

        context.actor = this.actor;
        context.system = this.actor.system;
        context.tabs = this._preparedTabs("primary");

        context.equippedWeapons = this.actor.items.filter(
            (item) => item.type === "weapon" && item.system.equipped
        );
        context.weapons = this.actor.items.filter((i) => i.type === "weapon");
        context.armor = this.actor.items.filter((i) => i.type === "armor");
        context.gear = this.actor.items.filter((i) => i.type === "gear");
        context.ammo = this.actor.items.filter((i) => i.type === "ammo");
        context.attachments = this.actor.items.filter((i) => i.type === "attachments");
        context.explosives = this.actor.items.filter((i) => i.type === "explosives");
        context.drones = this.actor.items.filter((i) => i.type === "drones");
        context.specializations = this.actor.items.filter((i) => i.type === "specialization");

        return context;
    }

    async _preparePartContext(partId, context) {
        switch (partId) {
            case "main":
            case "inventory":
            case "specializations":
            case "background":
                context.tab = context.tabs[partId];
                break;
        }

        if (partId === "background"){
            context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
                this.actor.system.description, 
                { relativeTo: this.actor, secrets: this.actor.isOwner }
            );
            context.notesHTML = await foundry.applications.ux.TextEditor.enrichHTML(
                this.actor.system.notes,
                { relativeTo: this.actor, secrets: this.actor.isOwner }
            );
        }
        return context;
    }

    static async #onToggleEquipped(event, target) {
    const item = this.actor.items.get(target.dataset.itemId);
    if (!item) return;
    await item.update({ "system.equipped": !item.system.equipped });
  }

  static async #onSetSpecializationRating(event, target) {
    const item = this.actor.items.get(target.dataset.itemId);
    if (!item) return;
    await item.update({ "system.rating": Number(target.dataset.value) });
  }

  static async #onReloadAmmo(event, target) {
    const item = this.actor.items.get(target.dataset.itemId);
    if (!item || item.system.trackingType !== "magazine") return;
    if (item.system.magazines <= 0) return;

    await item.update({
      "system.magazines": item.system.magazines - 1,
      "system.roundsUsed": 0
    });
  }
}