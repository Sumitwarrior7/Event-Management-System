module.exports.createUser = async function (req, res) {
  try {
    res.json("user Created");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getUser = async function (req, res) {
  try {
    res.json("get User");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllUser = async function (req, res) {
  try {
    res.json("get all user");
  } catch (error) {
    console.log(error.message);
  }
};
