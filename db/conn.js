const postgres = require('postgres');
const { createAppointmentTable, insertInitialAppointMentData } = require('../models/appointmentModel');
const { createDoctorTable, insertInitialDoctorData } = require('../models/doctorModel');
const { createUserTable, insertInitialUsersData } = require('../models/userModel');
const { createNotificationTable, insertInitialNotifyData } = require('../models/notificationModel');
require("dotenv").config();

sql = null;

async function initSql () {
  if (!!sql) {
    return sql;
  }

  try {
    let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

    sql = postgres({
      host: PGHOST,
      database: PGDATABASE,
      username: PGUSER,
      password: PGPASSWORD,
      port: 5432,
      ssl: 'require',
      connection: {
        options: `project=${ENDPOINT_ID}`,
      },
    });

    async function getPgVersion() {
      const result = await sql`select version()`;
      console.log(result);
    }

    getPgVersion();

    await sql` DROP table doctor`;
    await sql` DROP table appointment`;
    await sql` DROP table notification`;
    await sql` DROP table users`;

    await createUserTable(sql);
    await createDoctorTable(sql);
    await createNotificationTable(sql);
    await createAppointmentTable(sql);

    await insertInitialUsersData(sql);
    await insertInitialDoctorData(sql);
    await insertInitialAppointMentData(sql);
    await insertInitialNotifyData(sql);

    console.debug("All tables created successfully");
  } catch(e) {
    console.error('Error connecting to DB: ' + e.stack);
    throw e;
  }
};

module.exports = initSql;