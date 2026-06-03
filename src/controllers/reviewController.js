import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const createReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    const review = new Review({
      productId,
      userName,
      rating,
      comment,
    });

    const savedReview = await review.save();

    const reviews = await Review.find({ productId });

    const ratingCount = reviews.length;
    const ratingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
    const newRating = ratingSum / ratingCount;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(newRating * 10) / 10,
      ratingCount,
    });

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
