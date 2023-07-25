const { Schema, model } = require("mongoose");

const negotiationSchema = new Schema({
   productName: {
    type: String,
    ref: "Product",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  demandingPrice: {
    type: Number,
    required: [true, "Please enter negotiation price"],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
 
});

const Negotiation = model("Negotiation", negotiationSchema);

module.exports = Negotiation;
