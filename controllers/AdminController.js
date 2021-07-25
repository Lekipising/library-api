import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Admins from "../models/admins.js";

dotenv.config();

//Add a Admin
export async function addAdmin(req, res) {
    try {
        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            let adminObj = {
                email: req.body.email,
                password: hash,
                name: req.body.name
            }
            let admin = await Admins.create(adminObj);
            if (admin) {
                res.status(200).json({
                    success: true,
                    message: 'Admins created successfully',
                    data: admin
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Admins could not be created at this time'
                })
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a admin
export async function viewAdmin(req, res) {
    try {
        let admin = await Admins.findAll({ where: { adminid: req.params.id } });
        if (admin) {
            res.json({
                success: true,
                message: 'Admins records retrieved successfully',
                data: admin
            })
        } else {
            res.json({
                success: true,
                message: 'No Admins records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View all admins
export async function viewAllAdmins(req, res) {
    try {
        let alladmins = await Admins.findAll();
        if (alladmins) {
            res.json({
                success: true,
                message: 'Admins records retrieved successfully',
                data: alladmins
            })
        } else {
            res.json({
                success: true,
                message: 'No Admins records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Sign In
export async function signIn(req, res) {
    try {
        let admin = await Admins.findOne({ where: { email: req.body.email } })
        if (!admin) {
            return res.status(401).json({
                status: failed,
                message: "Authentication Failed: Admins with email address not found."
            })
        }
        bcrypt.compare(req.body.password, admin.password).then(response => {
            if (!response) {
                return res.status(401).json({
                    status: failed,
                    message: "Authentication Failed: Incorrect password."
                })
            }
            let authToken = jwt.sign({ email: admin.email, adminid: admin.adminid },
                process.env.AUTH_KEY, { expiresIn: "1h" });
            return res.status(200).json({
                status: true,
                message: "Admins authentication successful",
                admin: { name: admin.name, email: admin.email, adminid: admin.adminid },
                token: authToken,
                expiresIn: 3600
            })
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}