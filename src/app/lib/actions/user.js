import User from "../model/mode.user";

import connectDb from "../mongodb/mongoose";

export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    username
) => {
    try {
        await connectDb();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    email: email_addresses[0].email_address,
                    profilePicture: image_url,
                    username: username,
                }
            }, { new: true, upsert: true })
        return user;
    } catch (error) {
        console.log("Error in createOrUpdateUser:", error);
    }
}

export const deleteUser = async (id) => {
    try {
        await connectDb();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log("error in delete user", error);
    }
}