import { model, Schema } from "mongoose";

const collection = "tickets";

const schema = new Schema({
  code: { type: String, required: true, index: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const TicketModel = model(collection, schema);
export default TicketModel;
