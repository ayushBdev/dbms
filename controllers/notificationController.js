const getallnotifs = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const notifs = await sql`select * from notification where user_id = ${req.locals}`;
    return res.send(notifs);
  } catch (error) {
    console.log("Error", error)
    res.status(500).send("Unable to get all notifications");
  }
};

module.exports = {
  getallnotifs,
};
