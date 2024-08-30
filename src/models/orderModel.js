import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    items: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['COD', 'Online'],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;