import express from "express";
import connectDB from "./utils/databsae.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import cors from "cors"
import path from "path"
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000

const _dirname = path.resolve();
// middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.static(path.join(_dirname, "Frontend", "dist")))

// API's

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)



app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"))
})

const server = app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at port ${PORT}`)
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else {
        console.error('Server error:', err);
    }
});