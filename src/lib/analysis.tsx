"use server";
import { exec } from "child_process";
import { _updateExecutionStatus } from "./db/execution";
import { promisify } from "util";

const execCommand = promisify(exec);

export async function startAnalysis(timestamp: string) {
  const generateInput = `python3 ./bert_medical_records/preprocessing_python/text_generator.py \
						--file_path ./storage/${timestamp}/prediction.csv \
						--output_folder ./storage/${timestamp} \
						--output_name infer_dataset.txt --create_infer_text_data`;

  const prediction = `python3 ./bert_medical_records/run_glue.py \
						--predict \
						--model_input ./models/model/finetuned_model \
						--input_file ./storage/${timestamp}/infer_dataset.txt \
						--output_dir ./storage/${timestamp}`;

  try {
    await execCommand(generateInput);
    await _updateExecutionStatus(timestamp, "Step 1");
  } catch (error) {
    console.error(`An error occurred during generateInput: ${error}`);
  }

  try {
    await execCommand(prediction);
    await _updateExecutionStatus(timestamp, "Finished");
  } catch (error) {
    console.error(`An error occurred during prediction: ${error}`);
  }
}
