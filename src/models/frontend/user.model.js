const db = require('../../config/db.congfig');

const users = 'users';
const students = 'students';
const accademics = 'accademics';
const parent_details = 'parent_details';
const address = 'address';
const admission_fee = 'admission_fee';

// Register a new user
exports.Resgister_User = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${users} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${users}] create error:`, error.message);
      throw error;
   }
};

// Verify User Email
exports.Verif_Email = async (userId) => {
   try {
      const [result] = await db.query(`UPDATE ${users} SET is_email_verified = ? WHERE id = ?`, [1, userId]);
      return result;
   } catch (error) {
      console.error(`[${users}] create error:`, error.message);
      throw error;
   }
};

// User Login
exports.Login = async (username) => {
   try {
      const [result] = await db.query(`SELECT * FROM ${users} WHERE username = ?`, [username]);
      return result[0] || null;
   } catch (error) {
      console.error(`[${users}] Failed to fetch users with username ${username}:`, error);
      throw error;
   }
};

// Create a new student
exports.Create_Student = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${students} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${students}] create error:`, error.message);
      throw error;
   }
};

// Create Student Accademics
exports.Create_Accademic = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${accademics} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${student_app_form}] create error:`, error.message);
      throw error;
   }
};

// Create Student Parent Details
exports.Parent_Details = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${parent_details} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${parent_details}] create error:`, error.message);
      throw error;
   }
};

// Create User Address Details
exports.Address = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${address} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${address}] create error:`, error.message);
      throw error;
   }
};

exports.Admission_Fee = async (data) => {
   try {
      const [result] = await db.query(`INSERT INTO ${admission_fee} SET ?`, data);
      return result;
   } catch (error) {
      console.error(`[${admission_fee}] create error:`, error.message);
      throw error;
   }
}