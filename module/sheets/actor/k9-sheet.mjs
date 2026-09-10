const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export default class K9Sheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        classes: ["goss", "sheet", "actor", "k9"],
        position: {width: 480, height: 560},
        window: { resizable: true},
        actions: {
            clearHandler: K9Sheet.#onClearHandler
        }
    }

    static PARTS = {
        form: { template: "systems/goss/templates/actor/k9/form.hbs", scrollable: [""] 
        }
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.actor = this.actor;
        context.system = this.actor.system;

        context.handlerActor = this.actor.system.handler 
        ? await fromUuid(this.actor.system.handler) 
        : null;

        context.notesHTML = await foundry.applications.ux.TextEditor.enrichHTML(
            this.actor.system.notes,
            { relativeTo: this.actor, secrets: this.actor.isOwner }
        );

        return context;
    }

    async _onDropActor(event, data) {
        if (!event.target.closest(".handler-drop-zone")) {
            return super._onDropActor(event, data);
        }

        const droppedActor = await fromUuid(data.uuid);
        if (!droppedActor) return;

        await this.actor.update({ "system.handler": droppedActor.uuid });
    }
 
    static async #onClearHandler(event, target) {
        await this.actor.update({ "system.handler": null});
    }
}