  import Favorite from "../../models/Favorite.js";
import { findPositionOfItem } from "../../helpers/helpers.js";

export const toggleFavoriteController = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;
  const favorite = await Favorite.findOne({ userId });

  if (favorite) {
    const productIndex = findPositionOfItem(favorite.items, productId);

    if (productIndex !== -1) {
      favorite.items.splice(productIndex, 1);
      await favorite.save();
      return res
        .status(200)
        .send({ message: "Product removed from favorites" });
    } else {
      favorite.items.push({ product: productId });
      await favorite.save();
      return res.status(200).send({ message: "Product added to favorites" });
    }
  } else {
    await Favorite.create({
      userId,
      items: [{ product: productId }],
    });
    return res
      .status(201)
      .send({ message: "Product added to new favorites list" });
  }
};
