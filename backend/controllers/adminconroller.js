const db = require("../config/firebase");

module.exports.createAdmin = async function (req, res) {
  try {
    const data = req.body;
    await db.collection("admins").add(data);
    res.status(201).json("Admin Created Sucessfully");
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
module.exports.login = async function (req, res) {
  try {
    const useremail = req.body.email;
    const userPass = req.body.password;

    const snapsh = db.collection("admins");
    var ref = await snapsh.where("email", "==", `${useremail}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    // console.log(list);
    const user = list;
    if (user.length === 0) res.status(404).json("Admin Not Found");
    if (user[0].data.password != userPass) res.status(404).json("Password Incorrect");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
