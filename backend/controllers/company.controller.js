import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file; // for logo (optional)

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        let logo = "";
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const newCompany = await Company.create({
            name: companyName,
            description,
            website,
            location,
            logo,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company: newCompany,
            success: true
        });

    } catch (error) {
        console.error("Error in registerCompany:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
    
}
// get company by id

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

// GET ALL COMPANIES
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("userId", "fullname email"); // optional: populate user info
        return res.status(200).json({
            success: true,
            companies,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching companies.",
        });
    }
};
