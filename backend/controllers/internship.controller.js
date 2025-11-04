

import Internship from '../models/internship.schema.js';


export const getInternships = async (req, res) => {
    try {
    
        const { location, roleType } = req.query;
        const query = {};
        
       
        if (location) {
            query.location = location; 
        }
      
        if (roleType) {
            query.roleType = roleType;
        }
               
        const internships = await Internship.find(query); 
        
        res.json(internships);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching internships.');
    }
};


export const createInternship = async (req, res) => {
  
    const { userId } = req.user; 
    const { title, companyName, location, roleType} = req.body;

    try {
        const newInternship = new Internship({
            employer: userId,
            title,
            companyName,
            location,
            roleType,
        });

        const internship = await newInternship.save();
        res.status(201).json(internship);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error creating internship.');
    }
};