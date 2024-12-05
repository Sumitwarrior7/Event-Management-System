const db = require("../config/firebase");

module.exports.createEvent = async function (req, res) {
  try {
    const data = req.body;
    await db.collection("events").add(data);
    res.status(201).json("Event Created Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getEvent = async function (req, res) {
  try {
    const useremail = req.body.email;
    const snapsh = db.collection("events");
    var ref = await snapsh.where("email", "==", `${useremail}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });

    res.status(200).json({
      message: "Get Event ",
      list,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllEvent = async function (req, res) {
  try {
    const snapsh = db.collection("events");
    var ref = await snapsh.get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    res.status(200).json(list);
  } catch (error) {
    console.log(error.message);
  }
};
