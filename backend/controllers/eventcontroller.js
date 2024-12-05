module.exports.createEvent = async function (req, res) {
  try {
    res.json("Event Created");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getEvent = async function (req, res) {
  try {
    res.json("get Event");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllEvent = async function (req, res) {
  try {
    res.json("get all Event");
  } catch (error) {
    console.log(error.message);
  }
};
