//"drag an Actor onto this sheet to add it as an occupant" behavior shared by Vehicle and Safehouse.

export default function OccupantsDropMixin(Base) {
  // Adds support for dropping actors into the "occupants" section
  return class extends Base {
    static DEFAULT_OPTIONS = {

      // dragDrop configures which CSS selector on the sheet acts as a valid
      // drop target. dragSelector: null means "this sheet doesn't let you
      // drag things OUT of it" — only drops coming in.
      dragDrop: [{ dragSelector: null, dropSelector: ".occupants-drop-zone" }],
      actions: {
        removeOccupant: this.onRemoveOccupant
      }
    };

    // Override to add occupants to the context
    async _prepareContext(options) {

      // Because this mixin overrides _prepareContext too, both Vehicle's and
      // Safehouse's own _prepareContext can call super._prepareContext() and
      // get this occupants-resolving logic "for free" without repeating it.
      const context = await super._prepareContext(options);

      // system.occupants only stores UUID strings (references), not full
      // Actor data — fromUuid() looks each one up to get the real Actor object
      // the template can actually display a name for.
      const occupants = await Promise.all(
        (this.actor.system.occupants ?? []).map((uuid) => fromUuid(uuid))
      );

      // .filter((a) => a) drops any null results — e.g. if an occupant Actor
      // was deleted from the world entirely, its stale UUID won't crash the sheet.
      context.occupants = occupants.filter((a) => a); // drop any broken references

      return context;
    }

    // Override to handle dropping actors into the occupants section
    async _onDropActor(event, data) {

      // ActorSheetV2 already listens for drops and dispatches by document type
      // (_onDropActor for Actors, _onDropItem for Items, etc.)

      // Guard clause: only treat this as "add an occupant" if the drop actually
      // landed inside specific drop zone element, not just anywhere on the
      // sheet. Otherwise, fall through to whatever the default behavior would be.
      if (!event.target.closest(".occupants-drop-zone")) {
        return super._onDropActor(event, data);
      }

      const droppedActor = await fromUuid(data.uuid);
      if (!droppedActor) return;

      const current = this.actor.system.occupants ?? [];
      if (current.includes(droppedActor.uuid)) return; // already aboard, don't duplicate 

      // Arrays in Foundry data updates get replaced wholesale, not appended to —
      // so this builds a new array with the old contents plus the new one, then
      // writes that whole array back.
      await this.actor.update({ "system.occupants": [...current, droppedActor.uuid] });
    }

    // Action handler for removing an occupant
    static async onRemoveOccupant(event, target) {
      const current = this.actor.system.occupants ?? [];

      // .filter() here builds a new array excluding the one matching UUID —
      // same "replace the whole array" pattern as adding one above.
      await this.actor.update({
        "system.occupants": current.filter((uuid) => uuid !== target.dataset.uuid) 
      });
    }
  };
}