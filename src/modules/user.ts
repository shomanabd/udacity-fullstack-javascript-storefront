import pool from "../database";
import bcrypt from "bcrypt";
import { generateTokenForUser } from "../middleware/auth";
export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  password?: string;
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT id, first_name, last_name FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT id, first_name, last_name FROM users WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<string> {
    try {
      if (!u.password) {
        throw new Error("Password is required");
      }
      const conn = await pool.connect();
      const sql = `INSERT INTO users (first_name, last_name, password_digest   )
                    VALUES($1, $2, $3) RETURNING id, first_name, last_name`;
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];

      conn.release();
      return generateTokenForUser(user);
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }
}
