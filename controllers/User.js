
import User from '../models/User.js'; 
import createError from '../error.js';
import { stat } from 'fs';

export const Registration = async (req, res, next) => {
  console.log(req.body);

  try {
      // Destructure the fields from the incoming request body
      const { Name, CNIC, phoneNumber, address, purpose, token } = req.body;

      // Check if the user already exists based on CNIC
      const existingUser = await User.findOne({ CNIC });

      // If the user exists, check their last status
      if (existingUser) {
          // If the last status is "Pending", prevent a new request
          if (existingUser.status === "Pending") {
              return res.status(400).json({
                  message: "You cannot submit a new request while your previous request is still Pending."
              });
          }

          // Increment the visit count
          existingUser.visitCount += 1;

          // Update user details (no need to update status or add status history)
          existingUser.Name = Name;
          existingUser.phoneNumber = phoneNumber;
          existingUser.address = address;
          existingUser.purpose = purpose;
          existingUser.token = token;

          // Save the updated user data
          await existingUser.save();

          return res.status(200).json({
              message: "Request updated successfully",
              userData: {
                  Name: existingUser.Name,
                  phoneNumber: existingUser.phoneNumber,
                  address: existingUser.address,
                  purpose: existingUser.purpose,
                  token: existingUser.token,
                  visitCount: existingUser.visitCount
              }
          });
      }

      // If the user does not exist, create a new user
      const newUser = new User({
          Name,
          CNIC,
          phoneNumber,
          address,
          purpose,
          token,
          visitCount: 1  // First visit
      });

      // Save the new user to the database
      await newUser.save();

      return res.status(201).json({
          message: "Request submitted successfully",
          userData: {
              Name: newUser.Name,
              phoneNumber: newUser.phoneNumber,
              address: newUser.address,
              purpose: newUser.purpose,
              token: newUser.token,
              visitCount: newUser.visitCount
          }
      });

  } catch (err) {
      next(err);  // Handle errors
  }
};

 // Assuming User model is in models/User.js

export const searchUser = async (req, res, next) => {
    try {
      
        const { id } = req.params;
        console.log(req.params)
        console.log(id);
        

        
        const user = await User.findById(id);  // Assuming you're using MongoDB with Mongoose

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        res.status(200).json({
            message: "User found",
            user,
        });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "An error occurred while searching for the user" });
    }
};
export const UpdateStatus=async (req,res,next)=>{
    try {
        const { id } = req.params;
        const { status } = req.body; 
        console.log(id,status)
    
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        
        user.status = status;
        await user.save();
    
        res.status(200).json({ message: 'Status updated successfully', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
export const UserDetails=async(req,res,next)=>{

    try {
      console.log("idhar hun")
        const users = await User.find();
        res.json(users); 
        console.log(users);
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }


}
export const UpdateUser = async (req, res, next) => {
    const { id } = req.params;
    const { Name, phoneNumber, purpose, status } = req.body;
  
    try {
      // Use await to ensure the update happens before moving forward
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { Name, phoneNumber, purpose, status },
        { new: true } // This option ensures the returned object is the updated one
      );
  
      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      // Return the updated user
      res.status(200).json({
        message: "User updated successfully",
        updatedUser, // Returning the full updated user object
      });
    } catch (err) {
      next(err); // Pass the error to the next middleware
    }
  };

  export const DeleteUser=async(req,res,next)=>{
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
        
    } catch (error) {
        next(error);
        
    }
  }


  export const filterbyStatus = async (req, res, next) => {
    try {
      console.log("idhar hun");
  
      // Extract status from the query parameters
      const { status } = req.query;
      console.log("Status received:", status);
  
      // Validate if status is provided
      if (!status) {
        return res.status(400).json({ message: "Status query parameter is required" });
      }
  
      console.log("Filtering by status:", status);
  
      // Ensure case-insensitive search (optional)
      const users = await User.find({ status: { $regex: new RegExp(`^${status}$`, 'i') } });
  
      console.log("Users found:", users); // Log the found users
  
      // If no users are found, return a 404 error
      if (users.length === 0) {
        return res.status(404).json({ message: `No users found with the status: ${status}` });
      }
  
      // If users are found, return them in the response
      return res.status(200).json({
        users, // Returning the filtered users
      });
  
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };