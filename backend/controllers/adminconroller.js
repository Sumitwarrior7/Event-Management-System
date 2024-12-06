const db = require("../config/firebase");

module.exports.createAdmin = async function (req, res) {
  try {
    const data = req.body;
    await db.collection("admins").add(data);
    res.status(201).json("User Created Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getAdmin = async function (req, res) {
  try {
    const useremail = req.body.email;
    const snapsh = db.collection("admins");
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
module.exports.getAllAdmin = async function (req, res) {
  try {
    const snapsh = db.collection("admins");
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
