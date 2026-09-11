import ItemCrudMixin from "../mixins/item-crud-mixin.mjs";
import OccupantsDropMixin from "../mixins/occupants-drop-mixin.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

// Safehouse Sheet
export default class SafehouseSheet extends ItemCrudMixin(OccupantsDropMixin(HandlebarsApplicationMixin(ActorSheetV2))) {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "actor", "safehouse"],
    position: { width: 560, height: 640 },
    window: { resizable: true }
  };

  // 
  static PARTS = {
    form: { template: "systems/goss/templates/actor/safehouse/form.hbs", scrollable: [""] }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options); // occupants included via the mixin
    context.actor = this.actor;
    context.system = this.actor.system;

    context.items = this.actor.items.contents;

    context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
      this.actor.system.description,
      { relativeTo: this.actor, secrets: this.actor.isOwner }
    );
    context.notesHTML = await foundry.applications.ux.TextEditor.enrichHTML(
      this.actor.system.notes,
      { relativeTo: this.actor, secrets: this.actor.isOwner }
    );

    return context;
  }
}