export default function OccupantsDropMixin(Base) {
  return class extends Base {
    static DEFAULT_OPTIONS = {
      dragDrop: [{ dragSelector: null, dropSelector: ".occupants-drop-zone" }],
      actions: {
        removeOccupant: this.onRemoveOccupant
      }
    };

    async _prepareContext(options) {
      const context = await super._prepareContext(options);

      const occupants = await Promise.all(
        (this.actor.system.occupants ?? []).map((uuid) => fromUuid(uuid))
      );
      context.occupants = occupants.filter((a) => a); // drop any broken references

      return context;
    }

    async _onDropActor(event, data) {
      if (!event.target.closest(".occupants-drop-zone")) {
        return super._onDropActor(event, data);
      }

      const droppedActor = await fromUuid(data.uuid);
      if (!droppedActor) return;

      const current = this.actor.system.occupants ?? [];
      if (current.includes(droppedActor.uuid)) return; // already aboard

      await this.actor.update({ "system.occupants": [...current, droppedActor.uuid] });
    }

    static async onRemoveOccupant(event, target) {
      const current = this.actor.system.occupants ?? [];
      await this.actor.update({
        "system.occupants": current.filter((uuid) => uuid !== target.dataset.uuid)
      });
    }
  };
}