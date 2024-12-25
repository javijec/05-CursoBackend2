import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.pluralize(null);

const collection = "carts";

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  state: { type: String, default: "reserved", enum: ["reserved", "delivered", "paid"] },
});

schema.pre("find", function () {
  this.populate("products.product");
});

schema.pre("findOne", function () {
  this.populate("products.product");
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
