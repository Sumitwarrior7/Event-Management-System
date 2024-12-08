const db = require("../config/firebase");

module.exports.createVender = async function (req, res) {
  try {
    const data = req.body;
    await db.collection("venders").add(data);
    res.status(201).json("Vender Created Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getVender = async function (req, res) {
  try {
    const useremail = req.body.email;
    const snapsh = db.collection("venders");
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
module.exports.getAllVender = async function (req, res) {
  try {
    const snapsh = db.collection("venders");
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

    const snapsh = db.collection("venders");
    var ref = await snapsh.where("email", "==", `${useremail}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    // console.log(list);
    const user = list;
    if (user.length === 0) res.status(404).json("Vendor Not Found");
    if (user[0].data.password != userPass) res.status(404).json("Password Incorrect");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.addItem = async function (req, res) {
  const useremail = req.body.email;
  const newItem = req.body.item;

  try {
    const snapsh = db.collection("venders");
    const ref = await snapsh.where("email", "==", useremail).get();

    if (ref.empty) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const batch = db.batch();

    ref.forEach((doc) => {
      const currentItems = doc.data().items || [];
      const updatedItems = [...currentItems, newItem];
      const docRef = snapsh.doc(doc.id);

      batch.update(docRef, { items: updatedItems });
    });

    await batch.commit();
    res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports.deleteVender = async function (req, res) {
  try {
    const useremail = req.query.email; // Use req.query to access email sent as query parameter
    console.log("email",useremail);
    const snapsh = db.collection("venders");
    const ref = await snapsh.where("email", "==", useremail).get();

    if (ref.empty) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const batch = db.batch();
    ref.forEach((doc) => {
      const docRef = snapsh.doc(doc.id);
      batch.delete(docRef);
    });

    await batch.commit();
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
