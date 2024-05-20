import { QueryResult } from "pg";
import pool from "./db";
import { Execution } from "../model/Execution";

export async function _addExecution(personid: number, taskid: number, status: String): Promise<void> {
	try {
	  await pool.query(
		"INSERT INTO execution (personid, taskid, status) VALUES ($1, $2, $3)",
		[personid, taskid, status]
	  );
	} catch (error) {
	  console.error("Error executing query _addExecution", error);
	  throw error;
	}
  }

  export async function _updateExecutionStatus(personid: number, taskid: number, status: String): Promise<void> {
	try {
	  await pool.query(
		"UPDATE execution SET status = $3 WHERE taskid = $2 and personid = $1",
		[personid, taskid, status]
	  );
	} catch (error) {
	  console.error("Error executing query _updateExecutionStatus", error);
	  throw error;
	}
  }


export async function _getExecutionStatusByIDs(personid: number, taskid: number): Promise<String> {
	try {
	  const result: QueryResult<Execution> = await pool.query(
		"SELECT * FROM execution WHERE taskid = $1 and personid = $2",
		[taskid, personid]
	  );
	  if (result.rowCount !== null && result.rowCount === 0) {
		throw new Error("Error in _getExecutionStatusByIDs");
	  }
	  return result.rows[0].status;
	} catch (error) {
	  console.error("Error executing query _getExecutionStatusByIDs", error);
	  throw error;
	}
  }
  