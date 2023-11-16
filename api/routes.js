import { Router } from "@edgio/core/router";
import { nodejsRoutes } from "@edgio/nodejs-connector";

export default new Router().use(nodejsRoutes);
