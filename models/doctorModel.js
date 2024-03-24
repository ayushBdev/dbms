const createDoctorTable = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS doctor (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      specialization VARCHAR(255) NOT NULL,
      experience INTEGER NOT NULL,
      fees INTEGER NOT NULL,
      is_doctor BOOLEAN NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    );
  `;
};

const insertInitialDoctorData = async (sql) => {
  await sql`INSERT INTO doctor VALUES(1, 1, 'Cardiologist', 5, 500, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(2, 2, 'Dentist', 10, 1000, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(3, 3, 'Dermatologist', 15, 1500, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(4, 4, 'Endocrinologist', 20, 2000, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(5, 5, 'Gastroenterologist', 25, 2500, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(6, 6, 'Hematologist', 30, 3000, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(7, 7, 'Infectious Disease Specialist', 35, 3500, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(8, 8, 'Internist', 40, 4000, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(9, 9, 'Medical Geneticist', 45, 4500, true, NOW(), NOW())`;
  await sql`INSERT INTO doctor VALUES(10, 10, 'Neurologist', 50, 5000, true, NOW(), NOW())`;
};

module.exports = {
  createDoctorTable,
  insertInitialDoctorData
};