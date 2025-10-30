import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  brand: { type: String, require: true },
  sku: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
});

export default mongoose.model('Product', productsSchema);
