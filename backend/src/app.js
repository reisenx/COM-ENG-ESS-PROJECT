import cors from "cors";
import express from "express";

import UserRoute from "./routes/userRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/users", UserRoute);

export default app;
