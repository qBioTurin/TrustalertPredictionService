"use server";
import { addExecution, updateExecutionStatus } from "@/lib/actions/Execution";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

async function test() {
  exec(
    "python3 ./predictionPython/text_generator.py \
  --file_path ./predictionPython/base.csv \
  --output_folder ./predictionPython/ \
  --output_name infer_dataset.txt \
  --create_infer_text_data",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return "e";
      }
      updateExecutionStatus(1, 1, "Step 1");
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  exec(
    "python3 ./predictionPython/run_glue.py \
  --predict \
  --model_input ./predictionPython/finetuned_model \
  --input_file  ./predictionPython/infer_dataset.txt \
  --output_dir /app/public",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return "e";
      }
      updateExecutionStatus(1, 1, "Finished");
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  await test();
  return NextResponse.json({ success: true });
}
