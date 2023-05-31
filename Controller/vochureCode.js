var voucher_codes = require('voucher-code-generator');
const {vocherModel, countModel} = require("../Model/vochercodeModel");
const fs = require('fs');

const createCoupan = async (req, res) => {
  try {
    const voucher = voucher_codes.generate({
        length: 15,
        count: 100,
        charset: voucher_codes.charset("alphabetic")
    });
    if(voucher){
      for(let i = 0; i < voucher.length; i++){
        const result = new vocherModel({
            coupan : voucher[i]
           })
           await result.save();
           const vochers = `${voucher[i]}\n`
           fs.appendFile('data.csv', vochers, (err) => {
            if (err) {
              console.error('Error writing CSV file:', err);
            } else {
              console.log('Data has been stored successfully!');
            }
          });
      }
       return res.status(200).json({status : "success", message : "coupans created successfully"});
    }
  } catch (e) {
   return res.status(400).json({status: "error", message: e.message})
  }
}

const redeemCoupan = async (req, res) => {
  try {
    const coupan = req.body.coupan;
    if (!coupan) {
      return res.status(400).json({ status: "error", message: "Coupon required" });
    }

    let resultCount = await countModel.findOne({ userId: req.user.id });
    if (!resultCount) {
      resultCount = await countModel.create({ userId: req.user.id, count: 0 });
    }

    const currentTime = new Date();
    const addHourCreatedTime = new Date(resultCount.updatedAt);
    addHourCreatedTime.setMinutes(addHourCreatedTime.getMinutes() + 5);
    const futureDate = addHourCreatedTime.getTime();
    const timeLeft = futureDate - currentTime.getTime();

    if (resultCount.count > 4 && currentTime < addHourCreatedTime) {
      const secondsLeft = Math.ceil(timeLeft / 1000);
      const minutesLeft = Math.floor(secondsLeft / 60);
      const remainingSeconds = secondsLeft % 60;

      if (minutesLeft === 0) {
        return res.status(400).json({
          status: "error",
          message: `Please wait for ${remainingSeconds} seconds before trying again.`,
        });
      }

      return res.status(400).json({
        status: "error",
        message: `Please wait for ${minutesLeft} minutes and ${remainingSeconds} seconds before trying again.`,
      });
    }

    const result = await vocherModel.findOne({ coupan: coupan });
    if (result) {
      if (result.useStatus) {
        const updateCount = await countModel.updateOne({ userId: req.user.id }, { $set: { count: resultCount.count + 1 } });
        return res.status(400).json({ status: "error", message: "Given coupon is invalid or already used" });
      }

      await countModel.updateOne({ userId: req.user.id }, { $set: { count: 0 } });
      await vocherModel.updateOne({ coupan: coupan }, { $set: { userId: req.user.id, useStatus: true } });
      return res.status(200).json({ status: "success", message: "Coupon added successfully" });
    }

    const updateCount = await countModel.updateOne({ userId: req.user.id }, { $set: { count: resultCount.count + 1 } });
    return res.status(400).json({ status: "error", message: "Given coupon is invalid or already used" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "error", message: err.message });
  }
};

      
  

  
  

module.exports = {
  createCoupan: createCoupan,
  redeemCoupan: redeemCoupan
}
