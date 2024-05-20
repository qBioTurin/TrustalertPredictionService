"use server";

import fs from "fs";
import path from "path";

export async function test() {
  const filePath = path.resolve("/app/public/prediction.csv");
  console.log("filePath", filePath)
  const imageBuffer = fs.readFileSync("/app/public/prediction.csv");
  
}
