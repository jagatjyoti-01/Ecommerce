const userModel = require("../models/Usermodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function userSignInController(req, res) {
    try {
        const {  email, password } = req.body;
        if (!email) {
            throw new Error("please provide email")
        }
        if (!password) {
            throw new Error("please provide password")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("user not found ")
        }
        const checkPsassword = await bcrypt.compare(password, user.password)
        console.log("checkPsassword", checkPsassword)

        if (checkPsassword) {
            const tokondata = {
                _id: user._id,
                email: user.email,
                password:user.password,
               
            }
            const token = jwt.sign(
                { tokondata }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
            console.log("token", token)
            const tokenoption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenoption).json({
                message: "login successfull",
                data: token,
                success: true,
                error: false

            })

        } else {
            throw new Error("password is incorrect cheak the password")
        }

    }
    catch (err) {
        //return res.status(400).json({message:"Invalid request"});
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController