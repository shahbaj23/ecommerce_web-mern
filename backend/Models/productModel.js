import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required: true},
    images: {type: [String], required: true},
    stock: {type: Number, require: true, default: 0},
    date:{type: Number, required: true}
})

const Product = mongoose.model('Product', productSchema)

export default Product