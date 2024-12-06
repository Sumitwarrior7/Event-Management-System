const db = require("../config/firebase");

module.exports.createUser = async function (req, res) {
  try {
    const data = req.body;
    await db.collection("users").add(data);
    res.status(201).json("User Created Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getUser = async function (req, res) {
  try {
    const useremail = req.body.email;
    const snapsh = db.collection("users");
    var ref = await snapsh.where("email", "==", `${useremail}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });

    res.status(200).json(list);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAllUser = async function (req, res) {
  try {
    const snapsh = db.collection("users");
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
