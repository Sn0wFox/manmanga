import * as express from "express";
import * as path from "path";

export const mainRouter: any = express.Router();
// NOTE: the type 'any' fixes a bug between WebStorm and @Types

// Serve static files
mainRouter.use(express.static(path.resolve(__dirname + "/../../client")));

// Server a custom 404 page in case of an unknown route
mainRouter.get("*", (req: any, res: any) => {
  res.status(404).json({status: 404, message: "Resource not found"});
});

export default mainRouter;
