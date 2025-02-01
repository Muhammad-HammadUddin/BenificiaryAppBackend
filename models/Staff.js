import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      
    },
    Password:{
        type:String,
    },
    Role:{
        type:String
    }    
  },
  
);

export default mongoose.model('Staff', StaffSchema);
