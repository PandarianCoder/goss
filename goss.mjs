//Actor Data Models
import OperatorData from "./module/data/actor/operator.mjs";
import K9Data from "./module/data/actor/k9.mjs";
import VehicleData from "./module/data/actor/vehicle.mjs";
import SafehouseData from "./module/data/actor/safehouse.mjs";
import TangoData from "./module/data/actor/tango.mjs";
import HvtData from  "./module/data/actor/hvt.mjs";

//Actor Sheets
import OperatorSheet from "./module/sheets/actor/operator-sheet.mjs";
import K9Sheet from "./module/sheets/actor/k9-sheet.mjs";
import VehicleSheet from "./module/sheets/actor/vehicle-sheet.mjs";
import SafehouseSheet from "./module/sheets/actor/safehouse-sheet.mjs";
import TangoSheet from "./module/sheets/actor/tango-sheet.mjs";
import HvtSheet from "./module/sheets/actor/hvt-sheet.mjs";

//Item Data Models
import SpecializationData from "./module/data/item/specialization.mjs";
import GearData from "./module/data/item/gear.mjs";
import ArmorData from "./module/data/item/armor.mjs";
import WeaponData from "./module/data/item/weapon.mjs";
import AttachmentData from "./module/data/item/attachment.mjs";
import AmmoData from "./module/data/item/ammo.mjs";
import ExplosiveData from "./module/data/item/explosive.mjs";
import DroneData from "./module/data/item/drone.mjs";

//Item Sheets
import SpecializationSheet from "./module/sheets/item/specialization-sheet.mjs";
import GearSheet from "./module/sheets/item/gear-sheet.mjs";

//System Initialization
Hooks.once("init", () => {
    console.log("Ghost Ops: Second Strike | Initializing system");

    CONFIG.Actor.dataModels.operator = OperatorData;
    CONFIG.Actor.dataModels.k9 = K9Data;
    CONFIG.Actor.dataModels.vehicle = VehicleData;
    CONFIG.Actor.dataModels.safehouse = SafehouseData;
    CONFIG.Actor.dataModels.tango = TangoData;
    CONFIG.Actor.dataModels.hvt = HvtData;

    CONFIG.Item.dataModels.specialization = SpecializationData;
    CONFIG.Item.dataModels.gear = GearData;
    CONFIG.Item.dataModels.armor = ArmorData;
    CONFIG.Item.dataModels.weapon = WeaponData;
    CONFIG.Item.dataModels.attachment = AttachmentData;
    CONFIG.Item.dataModels.ammo = AmmoData;
    CONFIG.Item.dataModels.explosive = ExplosiveData;
    CONFIG.Item.dataModels.drone = DroneData;

    const { DocumentSheetConfig } = foundry.applications.apps;
    // makeDefault: true means this sheet is what opens automatically — without it, Foundry would keep using its bare built-in sheet.

    // Register Actor Sheets
    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", OperatorSheet, {
        types: ["operator"],
        makeDefault: true,
        label: "GOSS.SheetLabels.Operator"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", K9Sheet, {
        types: ["k9"],
        makeDefault: true,
        label: "GOSS.SheetLabels.K9"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", VehicleSheet, {
        types: ["vehicle"],
        makeDefault: true,
        label: "GOSS.SheetLabels.Vehicle"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", SafehouseSheet, {
        types: ["safehouse"],
        makeDefault: true,
        label: "GOSS.SheetLabels.Safehouse"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", TangoSheet, {
        types: ["tango"],
        makeDefault: true,
        label: "GOSS.SheetLabels.Tango"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Actor, "goss", HvtSheet, {
        types: ["hvt"],
        makeDefault: true,
        label: "GOSS.SheetLabels.HVT"
    });

    // Register Item Sheets
    DocumentSheetConfig.registerSheet(foundry.documents.Item, "goss", SpecializationSheet, {
        types: ["specialization"],
        makeDefault: true,
        label: "GOSS.SheetLabels.Specialization"
    });

    DocumentSheetConfig.registerSheet(foundry.documents.Item, "goss", GearSheet, {
        types: ["gear"],
        
        makeDefault: true,
        label: "GOSS.SheetLabels.Gear"
    });

});