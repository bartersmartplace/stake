const config = require("./config");
const controllers = require("./controllers");
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const { sequelize } = require("./models");


const app = express();

app.disable("etag");
app.disable("x-powered-by");
app.enable("trust proxy");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/",
  routes.submit.createRouter(new controllers.SubmitController()),
  routes.stakes.createRouter(new controllers.StakesController()),
  routes.tokenInfo.createRouter(new controllers.TokenInfoController()),
  routes.circulationSupply.createRouter(new controllers.CirculationSupplyController()),
);

(async () => {
  await sequelize.sync();

  app.listen(config.API_PORT, () => {
    console.log(`Barter Website API started listening at :${config.API_PORT}`);
  });
})();