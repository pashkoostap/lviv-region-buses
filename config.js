const dbUrl = 'mongodb://localhost:27017/buses-lviv-region__02-08-2019';
const baseApiUrl =
  'http://82.207.107.126:13541/tms/loda/api/389C2151-C5E9-4D47-8B94-5F643CA0AFEB/';
const config = {
  dbUrl,
  getStopsUrl: `${baseApiUrl}/GetStops`,
  getRoutesUrl: `${baseApiUrl}/GetRoutes`,
  getVehiclesUrl: `${baseApiUrl}/GetVehicles`,
  getRouteStops: routeId => `${baseApiUrl}/GetRouteStops?routeId=${routeId}`,
  getRouteStopSchedule: (routeId, stopCode) =>
    `${baseApiUrl}/GetScheduleRouteStopInfo?routeId=${routeId}&stopCode=${stopCode}`,
  getRouteVehiclesInfo: routeId =>
    `${baseApiUrl}/GetRouteInfo?routeId=${routeId}`
};

module.exports = config;
