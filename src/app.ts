import express from "express";
import crustDirectRoutes from "./routes/crustDirect.routes.js";
import downloadFilesLocalRoutes from './routes/downloadLocal.routes.js';
import downloadFiles from './routes/downloadFiles.routes.js'

const app = express();
app.use(express.json());

app.use('/api/ipfs', crustDirectRoutes)
app.use('/api/ipfs/', downloadFilesLocalRoutes)
app.use('/api/ipfs', downloadFiles)

export default app