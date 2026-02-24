import Product from '../models/Product.js';

export const rateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Новий середній рейтинг
    const newRatingCount = product.ratingCount + 1;
    const newRating =
      (product.rating * product.ratingCount + rating) / newRatingCount;

    product.rating = newRating;
    product.ratingCount = newRatingCount;

    await product.save();

    res.json({
      message: 'Rating updated',
      rating: product.rating,
      ratingCount: product.ratingCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
