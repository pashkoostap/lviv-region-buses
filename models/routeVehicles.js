const rp = require("request-promise");
const { getRouteVehiclesInfo } = require("../config");
const { Route } = require("../schemas/Route");
const { RouteVehicle } = require("../schemas/RouteVehicle");
const { waitFor } = require("../utils/index");

const saveRouteVehicles = async () => {
  const routes = await Route.find();

  loadRouteVehicles(routes);
};

const loadRouteVehicles = async routes => {
  console.log("Load route vehicles start", new Date());
  try {
    for (let route of routes) {
      const index = routes.indexOf(route);
      const vehicles = await waitFor(
        rp.get(getRouteVehiclesInfo(route.Id)),
        500
      );
      const parsedVehicles = JSON.parse(vehicles).Data;
      let ids = [];

      for (let vehicle of parsedVehicles) {
        const doc = { ...vehicle, id: vehicle.$id, created: Date.now() };
        delete doc["$id"];
        const vehicleDoc = new RouteVehicle(doc);
        await vehicleDoc.save();
        ids.push(vehicleDoc._id.toString());
      }

      if (ids.length) {
        // console.log("Route vehicles", ids.length);
        const routeObj = await Route.findById(route.id);
        if (routeObj.routeVehicles) {
          routeObj.routeVehicles = [...routeObj.routeVehicles, ...ids];
        } else {
          routeObj.routeVehicles = [...ids];
        }
        await routeObj.save();
      }

      console.log(
        `Route ${index} of ${routes.length} / Vehicles ${ids.length}`
      );

      if (index === routes.length - 1) {
        console.log("Load route vehicles end", new Date());
        loadRouteVehicles(routes);
      }
    }
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      loadRouteVehicles(routes);
    }, 1000 * 60);
  }
};

const resetRoutesVehicles = async () => {
  try {
    await Route.updateMany(
      {},
      { $set: { routeVehicles: [] } },
      { multi: true }
    );
    console.log("Reset routes vehicles done");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { saveRouteVehicles, resetRoutesVehicles };
