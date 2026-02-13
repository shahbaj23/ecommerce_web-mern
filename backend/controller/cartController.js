import User from "../Models/userModel.js";

export const addtoCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    const userData = await User.findById(userId);
    let cartData = userData.cartData;

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = 0;

    cartData[itemId][size] += 1;

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, cartData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async(req, res)=>{
  try {

    const userId = req.userId;
    const { itemId, size, qty } = req.body;

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = qty

    await User.findByIdAndUpdate(userId, {cartData})

    res.json({success: true, message: "item updated successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}


export const removeCartItem = async(req, res)=>{
  try {
    const userId = req.userId;
    const {itemId, size} = req.body;

    const user = await User.findById(userId)

    let cartData = user.cartData

    if(!cartData[itemId] || !cartData[itemId][size]){
      return res.json({success: false, cartData})
    }

    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    await User.findByIdAndUpdate(userId, {cartData})

    res.json({success: true, message: "Item remove from cart"})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
