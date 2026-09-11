// Function that takes a class and returns a new class extending it with extra behavior.
// OperatorSheet, VehicleSheet, and SafehouseSheet all share these three methods without copy-pasting them —
// each just does `class X extends ItemCrudMixin(SomeBaseClass) { ... }`.

export default function ItemCrudMixin(Base) {

    // Provides default implementations for Create, Read, Update, and Delete (CRUD) operations
    return class extends Base {
        static DEFAULT_OPTIONS = {
            
            //ApplicationV2 automatically merges DEFAULT_OPTIONS up the whole chain —
            // mixin, then sheet class, then HandlebarsApplicationMixin, etc.
            // This "actions" block gets combined with whatever actions the sheet itself declares, rather than overwriting them.
            actions: {

                // Each key here is a data-action name a template button can reference
                // Foundry wires the click automatically — never attach our own event listeners.
                editItem: this.onEditItem,
                deleteItem: this.onDeleteItem,
                createItem: this.onCreateItem
            }
        };

        // Handle item edit action
        static async onEditItem(event, target) {
            
            // `this` is bound to the sheet instance (not the mixin), so `this.actor` correctly refers to whichever Actor this
            // particular sheet is open for.
            const item = this.actor.items.get(target.dataset.itemId);
            
            // item?.sheet.render(true) just opens that item's own sheet window —
            // the ?. guards against the item having been deleted by someone else
            item?.sheet.render(true);
        }

        // Handle item delete action
        static async onDeleteItem(event, target) {
            const item = this.actor.items.get(target.dataset.itemId);
            if (!item) return;
            
            // DialogV2.confirm is Foundry's built-in yes/no popup — resolves to
            // true/false depending on which button gets clicked. Using this instead
            // of a plain delete means a misclick can't silently destroy sheets.
            const confirmed = await foundry.applications.api.DialogV2.confirm({
                window: { title: "Delete Item" },
                content: `<p>Delete <strong>${item.name}</strong>?</p>`
            });
            if (!confirmed) return;

            await item.delete();
        }

        // Handle item create action
        static async onCreateItem(event, target) {

            // data-item-type on the clicked button tells what kind of Item to
            // make — e.g. a button with data-item-type="weapon" creates a weapon.
            const type = target.dataset.itemType;
            if (!type) return;

            // createEmbeddedDocuments adds a new Item onto an Actor —
            // "embedded" meaning it lives inside this actor, not standalone in the
            // sidebar. Takes an array since you can create several at once
            const label = type.charAt(0).toUpperCase() + type.slice(1);
            await this.actor.createEmbeddedDocuments("Item", [{ name: `New ${label}`, type }]);
        }
    };
}