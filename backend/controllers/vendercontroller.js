module.exports.createVender = async function (req, res) {
  try {
    res.json("Vender Created");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getVender = async function (req, res) {
  try {
    res.json("get Vender");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllVender = async function (req, res) {
  try {
    res.json("get all Vender");
  } catch (error) {
    console.log(error.message);
  }
};
