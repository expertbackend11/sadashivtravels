import Tour from '../models/Tour.js'
import Review from '../models/Review.js'

export const createReview = async (req, res) => {

    const tourId=req.params.tourId
    const newReview= new Review({ ...req.body})
console.log('req.user',req.user);
    try{
        const existingReview = await Review.findOne({  username:req.body.username });

        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already submitted a review for this tour." });
        }
        const savedReview= await newReview.save()
        await Tour.findByIdAndUpdate(tourId,{
            $push:{reviews:savedReview._id}
        })
        res.status(200).json({success:true,message:'Review Submitted',
      data:savedReview})

    }catch(err){
       res.status(500).json({ success:false, message:"Failed to Submit"})
    }
};