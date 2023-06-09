const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    images: {
        type: [String],
        default: []
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}


module.exports = model('Product', ProductSchema);