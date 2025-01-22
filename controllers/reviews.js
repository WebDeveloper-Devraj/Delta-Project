const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
