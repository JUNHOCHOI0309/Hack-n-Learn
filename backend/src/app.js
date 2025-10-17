import express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js";
import session from "express-session";
import MonogoStore from "connect-mongo";
import helmet from "helmet";
import passport from "passport";
import { swaggerUi, specs } from "./config/swagger.js";
import expressMongoSanitize from "@exortek/express-mongo-sanitize";
import { errorHandler } from "./middlewares/auth.middleware.js";
import { initPassport } from "./config/passport.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(expressMongoSanitize());
app.use(errorHandler);

app.use(
        session({
                secret: process.env.SESSION_SECRET || "supersecret",
                resave: false,
                saveUninitialized: false,
                store: MonogoStore.create({
                        mongoUrl: process.env.MONGO_URI,
                        collectionName: "sessions",
                        ttl: 60 * 60, // 1 hour
                }),
                cookie: {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax",// CSRF 방지
                        maxAge : 60 * 60 // 1 hour

                },
        })
);

initPassport();

app.get("/lab/:sessionId/:file", async (req, res) => {
        const { sessionId, file } = req.params;

        const filePath = path.join(process.cwd(), "labs", sessionId, file);

        res.sendFile(filePath, (err) => {
                if (err) {
                        res.status(404).send("File not found");
                }
        });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes);

export default app;