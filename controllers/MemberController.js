import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Members from "../models/member.js";

dotenv.config();

//Add a Members
export async function addMember(req, res) {
  try {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      let memberObj = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
      };
      let member = await Members.create(memberObj);
      if (member) {
        res.status(200).json({
          success: true,
          message: "Member created successfully",
          data: member,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Member could not be created at this time",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

export async function signinMember(req, res) {
  try {
    let member = await Members.findOne({ where: { email: req.body.email } });
    if (!member) {
      return res.status(401).json({
        status: failed,
        message: "Authentication Failed: Members with email address not found.",
      });
    }
    bcrypt.compare(req.body.password, member.password).then((response) => {
      if (!response) {
        return res.status(401).json({
          status: failed,
          message: "Authentication Failed: Incorrect password.",
        });
      }
      let authToken = jwt.sign(
        { email: member.email, memberid: member.memberid },
        process.env.AUTH_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        status: true,
        message: "Members authentication successful",
        member: {
          name: member.name,
          email: member.email,
          memberid: member.memberid,
        },
        token: authToken,
        expiresIn: 3600,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//View a member
export async function viewMember(req, res) {
  try {
    let allmembers = await Members.findAll({
      where: { memberid: req.params.id },
    });
    if (allmembers) {
      res.json({
        success: true,
        message: "Members records retrieved successfully",
        data: allmembers,
      });
    } else {
      res.json({
        success: true,
        message: "No Members records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

//View all members
export async function viewAllMembers(req, res) {
  try {
    let allmembers = await Members.findAll();
    if (allmembers) {
      res.json({
        success: true,
        message: "Members records retrieved successfully",
        data: allmembers,
      });
    } else {
      res.json({
        success: true,
        message: "No Members records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

export async function updateMember(req, res) {
  try {
    let updatedmember = await Members.update(req.body, {
      where: { memberid: req.params.id },
    });
    if (updatedmember) {
      res.json({
        success: true,
        message: "Member records updated successfully",
        data: updatedmember,
      });
    } else {
      res.json({
        success: true,
        message: "No Member records found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}

export async function deleteMember(req, res) {
  try {
    let memberToDelete = await Members.findAll({
      where: { memberid: req.params.id },
    });
    if (memberToDelete) {
      let deletedMember = await Member.destroy({
        where: { memberid: req.params.id },
      });
      if (deletedMember) {
        res.json({
          success: true,
          message: "Member records deleted successfully",
        });
      } else {
        res.json({
          success: true,
          message: "No Member records found.",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
}
