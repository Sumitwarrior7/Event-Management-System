module.exports.createAdmin = async function (req, res) {
  try {
    res.json("Admin Created");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAdmin = async function (req, res) {
  try {
    res.json("get Admin");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllAdmin = async function (req, res) {
  try {
    res.json("get all Admin");
  } catch (error) {
    console.log(error.message);
  }
};
