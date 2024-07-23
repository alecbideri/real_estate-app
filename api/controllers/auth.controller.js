import bcrypt from "bcrypt"; // encryption library imported 
import jwt from "jsonwebtoken"; // this is a jws webtoken library , that helps customize our cookie formats. for the webclient's browser.  
import  prisma  from "../lib/prisma.js";  // prisma library import 
import { use } from "bcrypt/promises.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
      try{
      // Hash password  using the bcrypt library 
      const hashed_password = await bcrypt.hash(password, 10);
      console.log(hashed_password);
      
      // creating and testing new user
      const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed_password,
      },
    });
    console.log(newUser);
    res.status(201).json({message:"Users created successfully"}) ;  // once created successfully 
  }catch(err){
    console.log(err)
    res.status(500).json({message :"Failed to create user"}) ; // once failed to create the user . 
  }
};

export const login = async (req, res) => {

    const {username , password} = req.body;
    try {
      // method to check if the user exists or not ?

      const user = await prisma.user.findUnique({
        where:{username}
      })
      if(!user) return res.status(401).json({message:"Invalid Credentials!"})

      // checking the password validity comparing the encrypted one from the db to the provided one . 

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid) return res.status(401).json({message:"Invalid Credentials!"})

      // Generating a cookie response 

      // res.setHeader("Set-Cookie", "test=" + "myValue").json({message:"Login success"})
      
      const age = 1000 * 60 * 60 * 24 * 7 ;  // time to live for a cookie
      
      // program for a token , instead of a cookie to have a name and value specified, we generate random token instead and this is only for security purposes
      const token = jwt.sign(
      {
        id:user.id,
        isAdmin : true, // token refered to the id of the user
      }, 
      process.env.JWT_SECRET_KEY, // the random key was generated using base64 rand and kept in the env.file 
      { expiresIn: age }      // we set the cookie age 
    );

    const { password: hashedPassword, ...userInfo } = user;

      res.cookie("token" , token , {
        httpOnly:true,
        // secure:true , in case you are in production . this is j ust for learning purposes so no true set in place . 
        maxAge: age,
      }).status(200).json(userInfo) // passing information instead of a simple message such as 

      
    }catch(err){
      console.log(err)
      res.status(500).json({message:"Failed to login"}) // for any other unspecified reason , This is our handling options. 
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message: "logout Successfull"}) // in case the logout is complete we should clear our cookie from the client side web browser.
};
