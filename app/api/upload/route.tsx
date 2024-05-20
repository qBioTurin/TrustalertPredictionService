import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  console.log("FILE", file);
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public", file.name);

  try {
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
