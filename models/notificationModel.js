const createNotificationTable = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS notification (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      content VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    );
  `;
};

const insertInitialNotifyData = async (sql) => {
  await sql`INSERT INTO notification VALUES(1, 1, false, 'Your appointment is scheduled for 10th October 2021 at 10:00 AM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(2, 2, false, 'Your appointment is scheduled for 10th August 2021 at 11:00 AM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(3, 3, false, 'Your appointment is scheduled for 10th August 2021 at 12:00 PM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(4, 4, false, 'Your appointment is scheduled for 10th July 2021 at 01:00 PM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(5, 11, false, 'Your appointment with Dr John Doe is scheduled for 10th October 2021 at 10:00 AM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(6, 11, false, 'Your appointment with Dr Ravi Kumar is scheduled for 10th August 2021 at 11:00 AM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(7, 11, false, 'Your appointment with Dr Joshua Martinez is scheduled for 10th August 2021 at 12:00 PM', NOW(), NOW())`;
  await sql`INSERT INTO notification VALUES(8, 11, false, 'Your appointment with Dr Emily Johnson is scheduled for 10th July 2021 at 01:00 PM', NOW(), NOW())`;
};

module.exports = {
  createNotificationTable,
  insertInitialNotifyData
};