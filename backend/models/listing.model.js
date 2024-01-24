import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    startingDateTime: {
      type: String,
      required: true,
    },
    endingDateTime: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    winner1: {
      type: String,
      default:"After 1 hour winner will be updated",
      required: true,
    },
    winner2: {
      type: String,
      default:"After 1 hour winner will be updated",
      required: true,
    },
    winner3: {
      type: String,
      default:"After 1 hour winner will be updated",
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
