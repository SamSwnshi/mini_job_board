import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyName: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    location: { 
        type: String, 
        default: 'Remote', 
        trim: true 
    },
    roleType: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String, 
        required: true 
    },
 
  
}, { 

    timestamps: true 
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;