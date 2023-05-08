// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();
// const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./configs/db.config";
import createRouter from "./routes/index.routing";

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));

// Routers
createRouter(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));