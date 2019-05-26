const rp = require("request-promise");
const { getStopsUrl } = require("../config");
const { Stop } = require("../schemas/Stop");

const saveStops = async () => {
  await clearStops();

  const stops = await rp.get(getStopsUrl);
  const parsedStops = JSON.parse(stops).Data;

  for (let stop of parsedStops) {
    const doc = { ...stop, id: stop.$id };
    delete doc["$id"];
    const stopDoc = new Stop(doc);
    await stopDoc.save();
  }
  console.log("Stops done.");
  process.exit();
};

const clearStops = async () => {
  try {
    await Stop.deleteMany({});
    console.log("deleted all the stops");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { saveStops, clearStops };
