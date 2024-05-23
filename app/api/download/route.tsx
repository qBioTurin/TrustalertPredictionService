"use server";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const filePath = path.join("app", "public", "prediction.csv");
  try {
    const fileContent = await fs.promises.readFile(filePath);
    console.log(fileContent);
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="prediction.csv"',
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "File not found", file: filePath }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
