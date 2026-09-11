const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

// Specialization Sheet
export default class SpecializationSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "item", "specialization"],
    position: { width: 420, height: 360 },
    window: { resizable: true }
  };

  // Override the default template for this sheet
  static PARTS = {
    form: { template: "systems/goss/templates/item/specialization/form.hbs", scrollable: [""] }
  };

  // Prepare data for rendering the sheet
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;

    context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
      this.item.system.description,
      { relativeTo: this.item, secrets: this.item.isOwner }
    );

    return context;
  }
}