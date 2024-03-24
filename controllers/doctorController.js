const getalldoctors = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    let docs;
    if (!req.locals) {
      docs = await sql`select * from doctor where is_doctor = true`;
    } else {
      docs  = await sql`select * from doctor where is_doctor = true and id != ${req.locals}`;
    }

    const result = [];

    for (let i = 0; i < docs.length; i++) {
      const userId = (await sql`select * from users where id = ${docs[i].user_id}`)[0];
      result.push({ ...docs[i], userId: {
        ...userId,
        _id: userId.id,
      } });
    }

    return res.send(result);
  } catch (error) {
    console.debug("error", error);
    res.status(500).send("Unable to get doctors");
  }
};

const getnotdoctors = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const docs = await sql`select * from doctor where is_doctor = false`;

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non doctors");
  }
};

const applyfordoctor = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const alreadyFound = (await sql`select * from doctor where user_id = ${req.locals}`)[0];
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const props = { ...req.body.formDetails, userId: req.locals, is_doctor: true };

    await sql`
      insert into doctor (user_id, specialization, experience, fees, is_doctor, created_at, updated_at)
      values (${props.userId}, ${props.specialization}, ${props.experience}, ${props.fees}, ${props.is_doctor}, NOW(), NOW())
    `;
    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    console.debug("error", error);
    res.status(500).send("Unable to submit application");
  }
};


module.exports = {
  getalldoctors,
  getnotdoctors,
  applyfordoctor,
};
