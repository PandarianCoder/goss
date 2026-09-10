export default function ItemCrudMixin(Base) {
    return class extends Base {
        static DEFAULT_OPTIONS = {
            actions: {
                editItem: this.onEditItem,
                deleteItem: this.onDeleteItem,
                createItem: this.onCreateItem
            }
        };

        static async onEditItem(event, target) {
            const item = this.actor.items.get(target.dataset.itemId);
            item?.sheet.render(true);
        }

        static async onDeleteItem(event, target) {
            const item = this.actor.items.get(target.dataset.itemId);
            if (!item) return;

            const confirmed = await foundry.application.api.DialogV2.confirm({
                window: { title: "Delete Item" },
                content: `<p>Delete <strong>${item.name}</strong>?</p>`
            });
            if (!confirmed) return;

            await item.delete();
        }

        static async onCreateItem(event, target) {
            const type = target.dataset.itemType;
            if (!type) return;

            const label = type.charAt(0).toUpperCase() + type.slice(1);
            await this.actor.createEmbeddedDocuments("Item", [{ name: `New ${label}`, type }]);
        }
    };
}