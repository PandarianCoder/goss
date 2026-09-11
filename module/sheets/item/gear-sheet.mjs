const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;
// ItemSheetV2 is the base class for any custom Item sheet

export default class GearSheet extends HandlebarsApplicationMixin(ItemSheetV2) {

  static DEFAULT_OPTIONS = {
    // Starting window size
    classes: ["goss", "sheet", "item", "gear"],
    position: { width: 420, height: 360 },
    window: { resizable: true }
  };

  static PARTS = {
    // Tells the HandlebarsApplicationMixin which .hbs file(s) render this sheet
    form: { template: "systems/goss/templates/item/gear/form.hbs", scrollable: [""] }
  };

  async _prepareContext(options) {
    // Runs every time the sheet renders. Builds the data object ("context") that gets handed to the Handlebars template — anything the .hbs file references (like {{system.quantity}}) come from here.
    const context = await super._prepareContext(options);
    context.item = this.item; // ItemSheetV2's equivalent of ActorSheetV2's this.actor
    context.system = this.item.system;

    // Foundry's process for turning things like @UUID links into real clickable elements before the rich-text editor can safely display it.
    context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
      this.item.system.description,
      { relativeTo: this.item, secrets: this.item.isOwner }
    );

    return context;
  }
}