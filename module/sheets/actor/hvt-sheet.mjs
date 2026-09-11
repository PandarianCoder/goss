import TangoSheet from "./tango-sheet.mjs";

export default class HvtSheet extends TangoSheet {
  static DEFAULT_OPTIONS = {
    classes: ["goss", "sheet", "actor", "hvt"]
  };

  static PARTS = {
    form: { template: "systems/goss/templates/actor/hvt/form.hbs", scrollable: [""] }
  };
}