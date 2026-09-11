const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

// Sheet for Tango actors
export default class TangoSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "actor", "tango"],
    position: { width: 420, height: 480 },
    window: { resizable: true }
  };

  // Template parts for this sheet
  static PARTS = {
    form: { template: "systems/goss/templates/actor/tango/form.hbs", scrollable: [""] }
  };

  // Prepare data for rendering the sheet
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;

    context.descriptionHTML = await foundry.applications.ux.TextEditor.enrichHTML(
      this.actor.system.description,
      { relativeTo: this.actor, secrets: this.actor.isOwner }
    );

    return context;
  }
}