import jwt from "jsonwebtoken"

// function to be passed in the test route to check
// if you are authenticated as a User , for security purposes
export const shouldBeLoggedIn = async(req,res)=>{

    console.log(req.userId)
    // if the all conditions set true from verifyToken then , you are authenticated 
    res.status(200).json({message:"You are Authenticated"});

  };



// function to check to be passed in the test route to check if you are
// are logged in as an admin 

export const shouldBeAdmin = async(req,res)=>{

   // first step we check the user cookie if he is logged in 
   const token = req.cookies.token

   // second step,  if he is not logged in , we return an error 
   if (!token) return res.status(401).json({message:"Not Authenticated!"});
 
   // third step, verify if the user cookie's token is legit or not changed / if is different we return the error  
   jwt.verify(token,process.env.JWT_SECRET_KEY, async (err , payload)=>{
     if (err) return res.status(403).json({message: "Token is not Valid"});
     if(!payload.isAdmin){
      return res.status(403).json({message:"Not authorized !"});
     }
     // if the rest conditions are test to True , we confirm you are auuthenticated
     res.status(200).json({message:"You are Authenticated"});
 
   });

}