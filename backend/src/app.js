import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import session from "express-session";
import MonogoStore from "connect-mongo";
import helmet from "helmet";
import { swaggerUi, specs } from "./config/swagger.js";
import expressMongoSanitize from "@exortek/express-mongo-sanitize";
import { errorHandler } from "./middlewares/auth.middleware.js";

dotenv.config();
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

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "supersecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24 // 1일
//     }
//   })
// );

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes);

export default app;