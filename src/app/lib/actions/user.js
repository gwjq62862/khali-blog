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

    const email = email_addresses[0].email_address;

    
    let existingUser = await User.findOne({ email });

    if (existingUser && existingUser.clerkId !== id) {
   
      existingUser.clerkId = id;
      existingUser.firstName = first_name;
      existingUser.lastName = last_name;
      existingUser.profilePicture = image_url;
      existingUser.username = username;
      await existingUser.save();
      return existingUser;
    }

    
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          email,
          profilePicture: image_url,
          username,
        },
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.log("Error in createOrUpdateUser:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
    try {
        await connectDb();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log("error in delete user", error);
    }
}