"use server";

import { _addExecution, _getExecutionStatusByIDs, _updateExecutionStatus } from "../db/Execution";

export async function addExecution(
  personid: number,
  taskid: String,
  status: String
) {
  await _addExecution(personid, taskid, status);
}

export async function updateExecutionStatus(
  personid: number,
  taskid: String,
  status: String
) {
  await _updateExecutionStatus(personid, taskid, status);
}

export async function getExecutionStatusByIDs(personid: number, taskid: String) {
  return await _getExecutionStatusByIDs(personid, taskid);
}
