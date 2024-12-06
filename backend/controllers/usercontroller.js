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

module.exports.login = async function (req, res) {
  try {
    const useremail = req.body.email;
    const userPass = req.body.password;

    const snapsh = db.collection("users");
    var ref = await snapsh.where("email", "==", `${useremail}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    // console.log(list);
    const user = list;
    if (user.length === 0) res.status(404).json("User Not Found");
    if (user[0].data.password != userPass) res.status(404).json("Password Incorrect");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
