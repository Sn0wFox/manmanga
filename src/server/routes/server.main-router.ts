import * as express from 'express';
import * as path    from 'path';

const baseFolder: string          = path.resolve(__dirname + '/../../client');
const mainRouter: express.Router  = express.Router();

// Serve static files
mainRouter.use(express.static(baseFolder));

// Match angular routes
function handleAngularRoutes(req: express.Request, res: express.Response) {
  res.status(200).sendFile('index.html', { root: baseFolder });
}
mainRouter.get('/about', handleAngularRoutes);
mainRouter.get('/home', handleAngularRoutes);

// Serve a custom 404 page in case of an unknown route
mainRouter.all('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({status: 404, message: "Resource not found"});
});

export default mainRouter;
