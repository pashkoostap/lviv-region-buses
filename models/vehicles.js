const rp = require("request-promise");
const { getVehiclesUrl } = require("../config");
const { Vehicle } = require("../schemas/Vehicle");

const saveVehicles = async () => {
  await clearVehicles();

  const vehicles = await rp.get(getVehiclesUrl);
  const parsedVehicles = JSON.parse(vehicles).Data;

  for (let vehicle of parsedVehicles) {
    const doc = { ...vehicle, id: vehicle.$id };
    delete doc["$id"];
    const vehicleDoc = new Vehicle(doc);
    await vehicleDoc.save();
  }
  console.log("Vehicles done.");
  process.exit();
};

const clearVehicles = async () => {
  try {
    await Vehicle.deleteMany({});
    console.log("deleted all the vehicles");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { saveVehicles, clearVehicles };
