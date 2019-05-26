const rp = require("request-promise");
const {
  getRoutesUrl,
  getRouteStops,
  getRouteStopSchedule
} = require("../config");
const { Route } = require("../schemas/Route");
const { RouteStop } = require("../schemas/RouteStop");
const { RouteStopSchedule } = require("../schemas/RouteStopSchedule");
const { waitFor } = require("../utils");

const saveRoutes = async () => {
  await clearRoutes();

  const routes = await rp.get(getRoutesUrl);
  const parsedRoutes = JSON.parse(routes).Data;
  let done = 0;

  for (let route of parsedRoutes) {
    const routeDoc = new Route(route);

    // route stops
    const stops = await waitFor(rp.get(getRouteStops(route.Id)), 200);
    const parsedStops = JSON.parse(stops).Data;

    let stopsArr = [];
    for (let stop of parsedStops) {
      const routeStopDoc = new RouteStop(stop);

      // schedule
      let schedulesArr = [];
      const schedules = await waitFor(
        rp.get(getRouteStopSchedule(route.Id, stop.Code)),
        200
      );
      const parsedSchedules = JSON.parse(schedules).Data;

      for (let schedule of parsedSchedules) {
        const scheduleDoc = new RouteStopSchedule(schedule);
        const savedScheduleDoc = await scheduleDoc.save();

        schedulesArr.push(savedScheduleDoc._id);
      }

      console.log("schedule", schedulesArr);
      routeStopDoc.schedule = schedulesArr;
      const saved = await routeStopDoc.save();

      stopsArr.push(saved._id);
    }
    console.log("stops", stopsArr);

    routeDoc.stops = stopsArr;
    await routeDoc.save();
    done = done + 1;
    console.log(`Route ${done} of ${parsedRoutes.length}`);
  }
  console.log("Routes done.");
  process.exit();
};

const clearRoutes = async () => {
  try {
    await Route.deleteMany({});
    console.log("deleted all the routes");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { saveRoutes, clearRoutes };
