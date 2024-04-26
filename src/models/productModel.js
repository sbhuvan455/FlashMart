import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ['Fruits & Vegetables', 'Daily use Products', 'Masala & Dry Fruits', 'Toys', 'Baby Products', 'Dairy Bread and Eggs']
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }]
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;