import { countGrandTotal, findPositionOfItem } from "../../helpers/helpers.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
export const decreaseCartFromCartController = async (req , res) =>{
   const {userId} = req.user
   const { productId } = req.params;
   console.log(productId);
     const product = await Product.findById(productId);
     if (!product) return res.status(404).send({ message: "Product not found" });
     const cart = await Cart.findOne({ userId });
     if(cart){
      const itemIndex = findPositionOfItem(cart.items, productId);
      if (itemIndex !== -1) {
         cart.items[itemIndex].quantity -= 1;
         cart.items[itemIndex].total =
             cart.items[itemIndex].total - product.price;
           cart.grandTotal = countGrandTotal(cart.items, "total").toFixed(2);
           if( cart.items[itemIndex].quantity<1){
            console.log(cart.items[itemIndex]._id ,"item deleted");
            cart.items.splice(itemIndex, 1);    
             }
           await cart.save();
      return res
        .status(200)
        .send({ message: "Product quantity decreased in cart" });
      }
     }
}