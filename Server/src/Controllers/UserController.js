import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// getAll User

export const getAllUser = async (req, res) => {
  const id = req.params.id;

  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherdetails } = user._doc;
      return otherdetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Access denied.You can only update your own profile");
  }
};

// delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus } = req.body;
  if (id === _id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User delete successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Access denied.You can only delete your own profile");
  }
};

// follower user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id == id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { followings: id } });
        res.status(200).json("User followed Success!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// unFollower user

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id == id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("User unfollowed Success!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
