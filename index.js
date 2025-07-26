import ExpressConfig from "./server/express.config.js";
import middlewareConfig from "./services/middleware.config.js";
import routeConfig from "./services/route.config.js";

const app = ExpressConfig();

const port = process.env.PORT || 5000;

middlewareConfig(app);
routeConfig(app);

app.listen(port, () => {
  console.log(`Multi Tenant Backend running on port ${port}`);
});
