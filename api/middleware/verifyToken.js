import jwt from "jsonwebtoken"

export const verifyToken = (req,res ,next) =>{
    // first step we check the user cookie if he is logged in 
    const token = req.cookies.token

    // second step,  if he is not logged in , we return an error 
    if (!token) return res.status(401).json({message:"Not Authenticated!"});
  
    // third step, verify if the user cookie's token is legit or not changed / if is different we return the error  
    jwt.verify(token,process.env.JWT_SECRET_KEY, async (err , payload)=>{
      if (err) return res.status(403).json({message: "Token is not Valid"});
      
      req.userId = payload.id;

      next();
    });
}