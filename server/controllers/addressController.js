import Address from '../models/Address.js';
 
 
export const addAddress = async (req, res) => {
   

    try {
        const { address, userId } = req.body;
         await Address.create({...address,userId})
        res.status(201).json({
            success: true,
            message:"Address added successfully"
        });
    } catch (error) {
        res.status(400).json({ success:false,message:error.message });
    }
};

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.query; // <- ✅ use req.query here

        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required." });
        }

        const addresses = await Address.find({ userId });

        res.status(200).json({
            success: true,
            addresses,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
  
