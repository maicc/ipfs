import express from "express";
import crustDirectRoutes from "./routes/crustDirect.routes.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api/ipfs', crustDirectRoutes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
