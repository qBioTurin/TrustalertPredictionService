"use server";

import fs from "fs";
import path from "path";

export async function test(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await fs.promises.writeFile(
      path.join(process.cwd(), "public/" + filename),
      buffer
    );
    return { Message: "Success", status: 201 };
  } catch (error) {
    console.log("Error occured ", error);
    return { Message: "Failed", status: 500 };
  }
}
