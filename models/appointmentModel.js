const createAppointmentTable = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS appointment (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      doctor_id INTEGER REFERENCES users(id),
      date DATE NOT NULL,
      time TIME NOT NULL,
      status VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    );
  `;
};

const insertInitialAppointMentData = async (sql) => {
  await sql`INSERT INTO appointment VALUES(1, 11, 1, '2024-04-15', '10:00:00', 'pending', '2024-03-20', '2024-03-20')`;
  await sql`INSERT INTO appointment VALUES(2, 11, 2, '2024-04-10', '11:00:00', 'pending', '2024-04-19', '2024-03-19')`;
  await sql`INSERT INTO appointment VALUES(3, 11, 4, '2024-03-10', '12:00:00', 'Completed', '2024-03-18', '2024-03-18')`;
  await sql`INSERT INTO appointment VALUES(4, 11, 3, '2024-03-10', '13:00:00', 'Completed', '2024-03-16', '2024-03-16')`;
};


module.exports = {
  createAppointmentTable,
  insertInitialAppointMentData
};