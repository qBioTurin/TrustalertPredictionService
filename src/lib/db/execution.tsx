"use server";
import { QueryResult } from "pg";
import pool from "./db";

interface Execution {
  taskid: String;
  status: String;
}

export async function _addExecution(
  taskid: String,
  status: String
): Promise<void> {
  try {
    await pool.query("INSERT INTO execution (taskid, status) VALUES ($1, $2)", [
      taskid,
      status,
    ]);
  } catch (error) {
    console.error("Error executing query _addExecution", error);
    throw error;
  }
}

export async function _getExecutionStatusByTaskID(
  taskid: String
): Promise<String> {
  try {
    const result: QueryResult<Execution> = await pool.query(
      "SELECT * FROM execution WHERE taskid = $1",
      [taskid]
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

export async function _updateExecutionStatus(
  taskid: String,
  status: String
): Promise<void> {
  try {
    await pool.query("UPDATE execution SET status = $1 WHERE taskid = $2", [
      status,
      taskid,
    ]);
  } catch (error) {
    console.error("Error executing query _updateExecutionStatus", error);
    throw error;
  }
}
