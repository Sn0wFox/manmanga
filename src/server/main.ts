import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";

import apiRouter from "./routes/server.api-router";
import mainRouter from "./routes/server.main-router";

const app: any = express();

app.set('port', process.env.PORT || 3000);

// Log the requests
app.use(morgan("dev"));

// Configure the server to parse body
app.use(cookieParser("ManManGa awesome app!"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure routes
// NOTE: globalRouter must be the last used, since it defines defaults routes
app.use(apiRouter);
app.use(mainRouter);

// Start the server
app.listen(app.get('port'), () => {
  console.log('Express server started at http://localhost:' + app.get('port'));
});