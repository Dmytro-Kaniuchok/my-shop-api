import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productsSchema);
export default Product;
