import mongoose from "mongoose";

const collection = "Users";

const userSchema = new mongoose.Schema({
    first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		required: true,
	},
});
const userModel = mongoose.model(collection,userSchema);

export default userModel;