const userData = require("../model/userModal");



const getUsersOnload = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const users = await userData.find({ isAdmin: false, Deleted: false }).skip(skip).limit(limit);
    const count = await userData.countDocuments({ isAdmin: false });
    //   console.log(users)
    //   res.status(200).json({
    //     Name:users.Name,
    //     Email:users.Email,
    //     Phone:users.Phone,
    //     Deleted:users.Deleted,
    //     isAdmin:users.isAdmin,
    //     Profile:users. Profile

    //   });

    const userDetails = users.map(user => ({
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      Deleted: user.Deleted,
      isAdmin: user.isAdmin,
      Profile: user.Profile,

    }));

    console.log(userDetails, count);
    res.status(200).json(userDetails);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const saveEdits = async (req, res) => {
  try {
    const name = req.body.name;
    const phonenumber = req.body.phone;
    const urlOFprofilePic = req.file.filename;
    const email = req.body.email;

    console.log("middleware post:::", req.body.name)
    console.log(" incoming images::::", req.file.filename)
    const User = await userData.findOneAndUpdate(
      { Email: email },
      {
        $set: {
          Name: name,
          Phone: phonenumber,
          Profile: `/${urlOFprofilePic}`
        }
      },
      { new: true }
    );
    res.status(200).json(User);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const deleteUser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log("delete post:::", req.body.email)
    const User = await userData.findOneAndUpdate(
      { Email: email },
      {
        $set: {
          Deleted: true
        }
      },

    );
    const newUser = await userData.find({ Deleted: false });
    res.status(200).json(newUser);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const searchit = async (req, res) => {
  try {
    console.log("req.body:::", req.body.val)
    const searchedUser = await userData.find({ Name: req.body.val });

    console.log("searched LENGTH:::", searchedUser.length)
    if (searchedUser.length != 0) {
      const searchedUserDetails = searchedUser.map(user => ({
        Name: user.Name,
        Email: user.Email,
        Phone: user.Phone,
        Deleted: user.Deleted,
        isAdmin: user.isAdmin,
        Profile: user.Profile,

      }));
      res.status(200).json(searchedUserDetails);
    } else {
      res.status(200).json(null);
    }
 
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}



module.exports = { getUsersOnload, saveEdits, deleteUser, searchit }