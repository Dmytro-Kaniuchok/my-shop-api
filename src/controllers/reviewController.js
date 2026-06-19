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

    const updatedProduct = await Product.findById(productId);

    res.status(201).json({ review: savedReview, product: updatedProduct });
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

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: 'Review not found',
      });
    }

    const productId = review.productId;

    await Review.findByIdAndDelete(req.params.id);

    const reviews = await Review.find({ productId });

    const ratingCount = reviews.length;

    const newRating =
      ratingCount > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount
        : 0;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(newRating * 10) / 10,
      ratingCount,
    });

    res.json({
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
