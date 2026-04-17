import Cart from "../models/Cart.js";

export const addToCartController = async (req, res) => {
    try {
        const { userId, productId, name, description, productImage, customImage, price, quantity } = req.body;
        const totalAmount = price * quantity;

        let cartItem = await Cart.findOne({ userId, productId, description });
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalAmount = cartItem.price * cartItem.quantity;
        } else {
            cartItem = new Cart({ userId, productId, name, description, productImage, customImage, price, quantity, totalAmount });
        }

        await cartItem.save();
        res.json({ success: true, message: "Added to cart", cartItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

export const getCartController = async (req, res) => {
    try {
        const { userId } = req.query;
        const cartItems = await Cart.find({ userId });
        res.json(cartItems);
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch cart" });
    }
};