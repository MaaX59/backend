const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  shippingInfo: {
    name: {
      type: String,
    },
    address: {
      type: String,
      
    },
    country: {
      type: String,
      
    },
    city: {
      type: String,
      
    },
    phoneNo: {
      type: String,
      
    },
    postalCode: {
      type: String,
      
    },
  },
  buyer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        
      },
      amount: {
        type: Number,
        
      },

      price: {
        type: Number,
        
      },
      _id: {
        type: Schema.Types.ObjectId,
        
        ref: "Product",
      },
      seller:{
        type: Schema.Types.ObjectId,
        

      }
      //   image: {
      //     type: String,
      //     
      //   },
    },
  ],
  //   itemsPrice: {
  //     type: Number,
  //     required: true,
  //     default: 0.0,
  //   },
  // taxPrice: {
  //     type: Number,
  //     required: true,
  //     default: 0.0
  // },
  // shippingPrice: {
  //     type: Number,
  //     required: true,
  //     default: 0.0
  // },
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0.0,
//   },
  // paymentInfo: {
  //     id: {
  //         type: String,

  //     },
  //     status: {
  //         type: String,

  //     }
  // },
  // paidAt: {
  //     type: Date
  // },
  // deliveredAt: {
  //     type: Date
  // },
  // orderStatus: {
  //     type: String,
  //     required: true,
  //     default: 'Processing'
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

module.exports = Order;
