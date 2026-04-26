import User from "../models/User.js";

//get userdata using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update userdata

export const updateUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { username, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);

    !username && (username = tempUser.username);

    if (tempUser.username !== username) {
      const user = User.findOne({ username });
      if (user) {
        //we will not change if already taken
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
    };
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
