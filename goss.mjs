import OperatorData from "./module/data/actor/operator.mjs";
import K9Data from "./module/data/actor/k9.mjs";
import VehicleData from "./module/data/actor/vehicle.mjs";
import SafehouseData from "./module/data/actor/safehouse.mjs";
import TangoData from "./module/data/actor/tango.mjs";
import HvtData from  "./module/data/actor/hvt.mjs";

import SpecializationData from "./module/data/item/specialization.mjs";
import GearData from "./module/data/item/gear.mjs";
import ArmorData from "./module/data/item/armor.mjs";
import WeaponData from "./module/data/item/weapon.mjs";
import AttachmentData from "./module/data/item/attachment.mjs";
import AmmoData from "./module/data/item/ammo.mjs";
import ExplosiveData from "./module/data/item/explosive.mjs";
import DroneData from "./module/data/item/drone.mjs";

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
});