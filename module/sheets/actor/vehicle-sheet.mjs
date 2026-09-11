import ItemCrudMixin from "../mixins/item-crud-mixin.mjs";
import OccupantsDropMixin from "../mixins/occupants-drop-mixin.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

// Sheet for vehicles
export default class VehicleSheet extends ItemCrudMixin(OccupantsDropMixin(HandlebarsApplicationMixin(ActorSheetV2))) {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "actor", "vehicle"],
    position: { width: 560, height: 640 },
    window: { resizable: true }
  };

  // Template parts for the sheet
  static PARTS = {
    form: { template: "systems/goss/templates/actor/vehicle/form.hbs", scrollable: [""] }
  };

  // Prepare data for rendering the sheet
  async _prepareContext(options) {
    const context = await super._prepareContext(options); // occupants already included, via the mixin
    context.actor = this.actor;
    context.system = this.actor.system;

    context.weapons = this.actor.items.filter((i) => i.type === "weapon");

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