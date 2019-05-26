const mongoose = require("mongoose");
const { dbUrl } = require("./config");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const static = require("koa-static");
const app = new Koa();
const PORT = process.env.PORT || 7777;
const router = new Router();

const { routes, stops, vehicles } = require("./routes");

mongoose.connect(dbUrl);

app.use(cors());

router.use("/routes", routes.routes());
router.use("/stops", stops.routes());
router.use("/vehicles", vehicles.routes());

app.use(router.routes());

app.use(static("./map"));

app.listen(PORT, () => {
  console.log("start");
});
