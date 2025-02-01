import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      
    },
    CNIC: {
      type: String,
      unique:true
     
      
    },
    phoneNumber: {
      type: String,
      required: true,
    
    },
    address: {
      type: String,
      
    },
    purpose: {
      type: String,
      
    },
    token:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"
        
    },
    visitCount:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model('User', UserSchema);
