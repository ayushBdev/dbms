const dayjs = require("dayjs");

const getallappointments = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    const appointments = await sql`select * from appointment where user_id = ${req.query.search} or doctor_id = ${req.query.search}`;

    const result = [];

    for (let i = 0; i < appointments.length; i++) {
      const userId = (await sql`select * from users where id = ${appointments[i].user_id}`)[0];
      const doctorId = (await sql`select * from users where id = ${appointments[i].doctor_id}`)[0];
      result.push({ ...appointments[i], userId, doctorId });
    };

    return res.send(result);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
  const appointment = await sql`
    insert into appointment (user_id, doctor_id, date, time, status, created_at, updated_at)
    values (${req.locals}, ${req.body.doctorId}, ${req.body.date}, ${req.body.time}, 'Pending', NOW(), NOW())
  `;

    await sql`insert into notification (user_id, content, is_read, created_at, updated_at) values (${req.locals}, ${`You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`}, false, NOW(), NOW())`;
    const user = await sql`select * from users where id = ${req.locals}`;
    await sql`insert into notification (user_id, content, is_read, created_at, updated_at) values (${req.body.doctorId}, ${`You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`}, false, NOW(), NOW())`;

    return res.status(201).send(appointment);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    const initSql = await require("../db/conn")
    const sql = await initSql()
    await sql`update appointment set status = 'Completed' where id = ${req.body.appointid}`;
    await sql`insert into notification (user_id, content, is_read, created_at, updated_at) values (${req.body.doctorId}, ${`You appointment with ${req.body.doctorname ?? "doctor"} has been completed`}, false, NOW(), NOW())`;
    const user = await sql`select * from users where id = ${req.locals}`;
    await sql`insert into notification (user_id, content, is_read, created_at, updated_at) values (${req.body.doctorId}, ${`Your appointment with ${user.firstname ?? "patient"} ${user.lastname ?? ""} has been completed`}, false, NOW(), NOW())`;
    return res.status(201).send("Appointment completed");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getallappointments,
  bookappointment,
  completed,
};
