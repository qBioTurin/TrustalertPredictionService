"use server";
import { promises as fs } from "fs";
import path from "path";

async function saveFile(file: File, dir: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(dir, "prediction.csv");

  await fs.writeFile(filePath, buffer);
  const fileHandle = await fs.open(filePath, "r");
  await fileHandle.close();
}

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const timestamp = formData.get("timestamp") as string;

  const dir = path.join(process.cwd(), "storage", timestamp);

  await fs.mkdir(dir, { recursive: true });

  console.log("Uploading file", file.name);
  await saveFile(file, dir);
  console.log("Uploaded file", file.name);
}
