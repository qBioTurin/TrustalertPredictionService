"use server";

import { _addExecution, _getExecutionStatusByIDs, _updateExecutionStatus } from "../db/Execution";

export async function addExecution(
  personid: number,
  taskid: number,
  status: String
) {
  await _addExecution(personid, taskid, status);
}

export async function updateExecutionStatus(
  personid: number,
  taskid: number,
  status: String
) {
  await _updateExecutionStatus(personid, taskid, status);
}

export async function getExecutionStatusByIDs(personid: number, taskid: number) {
  return await _getExecutionStatusByIDs(personid, taskid);
}
