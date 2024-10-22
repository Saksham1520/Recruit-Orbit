import express from "express";
import isAuthenticated from "../middelware/isAuthenticated.js";
import { applyJob, getApplicant, getAppliedJob, updatestatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicant);
router.route("/status/:id/update").post(isAuthenticated, updatestatus);


export default router;
