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
    console.log("Email received from request body:", useremail);

    const snapsh = db.collection("events");
    const ref = await snapsh.where("createdBy", "==", useremail).get();

    console.log("Number of documents found:", ref.docs.length);

    const list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    console.log(list);
    res.status(200).json({
      message: "Get Event",
      list,
    });
  } catch (error) {
    console.error("Error in getEvent:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
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
