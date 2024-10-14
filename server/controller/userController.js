const userData = require("../model/userModal");
require('dotenv').config();
const JWT =require ("jsonwebtoken");
const JWTcode= process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    console.log("data reaching backend:::", name);

    // Check if user already exists
    const existingUser = await userData.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // if not create new user
    const newUser = new userData({
      Name: name,
      Email: email,
      Password: password,
      Phone: phone,
    });

    // Save user to the DB
    await newUser.save();

    
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.Name,
        email: newUser.Email,
        phone: newUser.Phone,
      },
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const Login = async (req, res) => {
  try {
    const inputemail = req.body.email;
    const inputpassword = req.body.password;
    console.log("received:::", inputemail, inputpassword)
    const UserExistInDb = await userData.findOne({ Email: inputemail });
    if (UserExistInDb) {
      if (UserExistInDb.Password === inputpassword) {
       
        const token = JWT.sign({ email: UserExistInDb.Email, id: UserExistInDb._id }, JWTcode, { expiresIn: '2h' });
        console.log("token::",token)

        console.log("is logged")
      
        res.status(201).json({
          Name: UserExistInDb.Name,
          Email: UserExistInDb.Email,
          Phone: UserExistInDb.Phone,
          Profile:UserExistInDb.Profile,
          IsAdmin:UserExistInDb.isAdmin,
          IsDeleted:UserExistInDb.Deleted,
          message: "Signup successful",
          token,
          message: "Login successful.",
        });


      } else {
        console.log("not logged")
        return res.status(401).json({ error: "Invalid password" });
      }
    } else {
      return res.status(400).json({ error: "User does not exists, sign up" });
    }
    console.log(inputemail, inputpassword)
   
  }
  catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

}


const Editprofilepage = async (req, res) => {
  try {
const name=req.body.name;
const phonenumber=req.body.phone;
const urlOFprofilePic=req.file.filename;
const email=req.body.email;

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
      { new: true } // This option returns the updated document
    );
    res.status(200).json(User);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}




const Logout=async(req,res)=>{
  try{

  }
  catch(error){
    console.log(error.message)
  }
}

module.exports = { signup, Login, Editprofilepage ,Logout};
