const mongoose = require("mongoose");
const Router = require("koa-router");
const routes = new Router();
const { Route } = require("../schemas/Route");
const { RouteStop } = require("../schemas/RouteStop");
const { RouteStopSchedule } = require("../schemas/RouteStopSchedule");
const { RouteVehicle } = require("../schemas/RouteVehicle");

routes
  .get("/", async (ctx, next) => {
    const routes = await Route.find({}, "-stops -routeVehicles");

    ctx.body = routes;
  })
  .get("/:id", async (ctx, next) => {
    const { routeId, date } = ctx.query;

    const route = await Route.findOne({ Id: parseInt(routeId) }, "Name -_id")
      .populate({
        path: "stops",
        model: RouteStop,
        select: "Name X Y -_id",
        populate: {
          path: "schedule",
          model: RouteStopSchedule,
          select: "TimeToPoint -_id"
        }
      })
      .populate({
        path: "routeVehicles",
        model: RouteVehicle,
        match: {
          created: {
            $gt: parseInt(date),
            $lt: parseInt(date) + 24 * 60 * 60 * 1000
          }
        },
        select: "X Y created VehicleName"
      });
    ctx.body = route;
  });

module.exports = routes;
