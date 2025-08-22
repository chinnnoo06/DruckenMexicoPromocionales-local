const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ColorSchema = new Schema({
  color: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  hex: {
    type: String,
    required: true
  }
}, { _id: false }); // Sin _id para los subdocumentos colores

const ProductSchema = Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  span: {
    type: String,
    required: true
  },
  colors: {
    type: [ColorSchema],
    required: true,
    validate: {
      validator: function (val) {
        return val.length >= 1; // al menos un color
      },
      message: '{PATH} debe tener al menos un color'
    }
  },
  description: {
    type: String,
    required: true
  },
  minQuantity: {
    type: Number,
    required: true
  },
})

ProductSchema.plugin(mongoosePaginate);

module.exports = model("Product", ProductSchema, "products");