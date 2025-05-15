import mongoose from "mongoose";

const PublicationsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "[model] El title es obligatorio"]
  },
  description: {
    type: String,
    required: [true, "[model]El description es obligatorio"]
  },
  category: {
    type: String,
    required: [true, "[model]El category es obligatorio"],
    enum: ["Practica_Supervisada", "Taller", "Tecnologia"]
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  }],
  photos: {
    type: [String],
    default: [
      "https://cdn.goconqr.com/uploads/media/image/33242840/desktop_d8a71414-d262-4f5f-9db9-11248601ac1a.jpg"
    ]
  },
  status: {
    type: Boolean,
    default: true
  }
},
);

export default mongoose.model("Publications", PublicationsSchema);
