import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const {userName, fullName, password, confirmPassword, gender } = req.body;

		if (!userName || !fullName || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

        const userProfile = await User.findOne({ userName})

        if(userProfile){
            return res.status(400).json({
                error:"User profile already exists"
            });
        }


		const newUser = new User({
            userName,
			fullName,
			password: hashedPassword,
			gender,
			id: generateUniqueId(), 
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		// await newUser.save();

		// // Generate JWT token here
		// generateTokenAndSetCookie(newUser._id, res);

		// res.status(201).json({
		// 	_id: newUser._id,
		// 	fullName: newUser.fullName,
		// 	userName: newUser.userName,
		// 	profilePic: newUser.profilePic,
		// });

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				userName: newUser.userName,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const generateUniqueId = () => {
    // Generate a unique ID logic goes here
    // For simplicity, you can use a timestamp-based ID or any other unique identifier generation logic
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};


export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};