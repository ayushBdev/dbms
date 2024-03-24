const bcrypt = require("bcrypt");

const createUserTable = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN NOT NULL,
      is_doctor BOOLEAN NOT NULL,
      age INTEGER NOT NULL
    )
  `;
};

const insertInitialUsersData = async (sql) => {
  const hashedPass = await bcrypt.hash("123456", 10);

  await sql`INSERT INTO users VALUES(1, 'John', 'Doe', 'john@gmail.com', ${hashedPass}, false, true, 25)`;
  await sql`INSERT INTO users VALUES(2, 'Ravi', 'Kumar', 'ravi@gmail.com', ${hashedPass}, false, true, 30)`;
  await sql`INSERT INTO users VALUES(3, 'Joshua', 'Martinez', 'joshua@gmail.com', ${hashedPass}, false, true, 31)`;
  await sql`INSERT INTO users VALUES(4, 'Emily', 'Johnson', 'emily@gmail.com', ${hashedPass}, false, true, 33)`;
  await sql`INSERT INTO users VALUES(5, 'Rajiv', 'Kapoor', 'rajiv@gmail.com', ${hashedPass}, false, true, 24)`;
  await sql`INSERT INTO users VALUES(6, 'Arjun', 'Desai', 'arjun@gmail.com', ${hashedPass}, false, true, 42)`;
  await sql`INSERT INTO users VALUES(7, 'Rahul ', 'Singh', 'rahul@gmail.com', ${hashedPass}, false, true, 35)`;
  await sql`INSERT INTO users VALUES(8, 'Aarav ', 'Sharma', 'aarav@gmail.com', ${hashedPass}, false, true, 25)`;
  await sql`INSERT INTO users VALUES(9, 'Vikram', 'Mehta', 'vikram@gmail.com', ${hashedPass}, false, true, 30)`;
  await sql`INSERT INTO users VALUES(10, 'Ananya', 'Joshi', 'ananya@gmail.com', ${hashedPass}, false, true, 40)`;
  await sql`INSERT INTO users VALUES(11, 'Ayush', 'Bhatt', 'ayush@gmail.com', ${hashedPass}, false, false, 20)`;
};

module.exports = {
  createUserTable,
  insertInitialUsersData,
};