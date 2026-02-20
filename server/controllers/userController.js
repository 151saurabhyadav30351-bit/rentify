import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const { name, email, avatar } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;

  if (avatar) user.avatar = avatar;

  await user.save();

  res.json(user);
};
