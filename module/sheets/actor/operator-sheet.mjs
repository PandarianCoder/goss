const { HandlebarsApplicationMixin } = foundry.application.api;
const { ActorSheetV2 } =  foundry.applications.sheets;

export default class OperatorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        classes: ["goss", "sheet", "actor", "operator"],
        position: {width: 720, height: 780},
        window: { resizable: true }
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
        return context;
    }
}