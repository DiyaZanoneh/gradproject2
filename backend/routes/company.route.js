import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, registerCompany, updateCompany , getAllCompanies} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,singleUpload,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);

router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
router.get("/all", getAllCompanies); // GET /api/company/all

export default router;

