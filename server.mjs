import express from "express";
import path from "path";
import dotenv from "dotenv"
dotenv.config();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
import http from "http";
import cors from "cors";
const server = http.createServer(app);
import { router as userRoutes } from "./routes/user.routes.mjs";
import { router as authRoutes } from "./routes/auth.routes.mjs";
const corsOptions = {
    origin: "http://localhost:3000"
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/test", userRoutes);
app.use("/api/auth", authRoutes);
/*app.use(cookieSession({
    name: "AudioCloud-session",
    secret: process.env.secretKey,
    httpOnly: true,
}))*/
//

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//

server.listen(port, () => {
    console.log(`app listening at Port: ${port}`);
});