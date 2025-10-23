import express from "express";
import crustDirectRoutes from "./routes/crustDirect.routes.js";
import donwloadFilesRoutes from './routes/downloadLocal.routes.js';

const app = express();
app.use(express.json());

app.use('/api/ipfs', crustDirectRoutes)
app.use('/api/ipfs/', donwloadFilesRoutes)

export default app