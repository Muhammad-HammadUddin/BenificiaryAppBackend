import Staff from '../models/Staff.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const verifyUserDetails = async (req, res) => {
  try {
    const { token, purpose } = req.body;
    console.log(token,purpose);

    // Search for a user by both token and purpose (department)
    const findUser = await User.findOne({ token, purpose });

    
    if (!findUser) {
      console.log("No Application found or department mismatch");
      return res.status(404).json({ message: 'No Application found or department mismatch' });
    } else {
      console.log(findUser);
      return res.status(200).json({ user: findUser });
    }

  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




export const verifyDepartmentStaff=async(req,res,next)=>{

  const {Name,Password,Role}=req.body;
    

    
    const findDeparment = await Staff.findOne({ Name,Password,Role });
    if (!findDeparment) {
      console.log("No  department Staf  Found");
      const token = jwt.sign({ Name }, "1232fdsfas", );
      
           
            res.cookie("access_token", token, {
              httpOnly: true, 
              secure: false,
              sameSite: 'Strict', 
              maxAge: 3600 * 1000,  
              path: '/',  
            });
            console.log(token);

      return res.status(404).json({ message: 'No Staff Department found with these Credentials' });


      
      
    } else {
      console.log(findDeparment);
      return res.status(200).json({ findDeparment});
    }

}


export const CreateDepartmentStaff = async (req, res, next) => {
  console.log(req.body);
  
  try {
      // Destructure the fields from the incoming request body (ensure these match the form input names)
      const { Name,  Password,Role } = req.body;

      // Hash the CNIC to store securely in the database
      

      // Create a new User object with the form data
      const newDepartmenter = new Staff({
          Name,
          Password,
          Role
      });

     
      await newDepartmenter.save();

      
      res.status(201).json({
          message: "Request Submitted successfully",
            
      });
  } catch (err) {
      next(err);  // Handle errors
  }
};