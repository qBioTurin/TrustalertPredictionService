"use server";
import { updateExecutionStatus } from "@/lib/actions/Execution";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

async function test(timestamp: string) {
  const name = "input_" + timestamp + ".csv";
  const command =
    "python3 ./predictionPython/text_generator.py \
	--file_path /app/public/" +
    name +
    " \
	--output_folder ./predictionPython/ \
	--output_name " + timestamp +"_infer_dataset.txt \
	--create_infer_text_data";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return "e";
    }
    updateExecutionStatus(1, 1, "Step 1");
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  const command2 = "python3 ./predictionPython/run_glue.py \
  --predict \
  --model_input ./predictionPython/finetuned_model \
  --input_file  ./predictionPython/" + timestamp + "_infer_dataset.txt \
  --output_dir /app/public/" + timestamp;
  exec(command2,
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
  const data = await req.formData();
  const timestamp: string = data.get("timestamp") as unknown as string;
  await test(timestamp);
  return NextResponse.json({ success: true });
}
