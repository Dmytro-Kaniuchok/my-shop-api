import Product from '../models/Product.js';

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Fetch product by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
