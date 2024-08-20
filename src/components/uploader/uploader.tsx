"use client";

import { startAnalysis } from "@/lib/analysis";
import { _addExecution, _getExecutionStatusByTaskID } from "@/lib/db/execution";
import { uploadFile } from "@/lib/upload-file";
import { Button, Card, FileInput, Group, Progress, Title } from "@mantine/core";
import { useState } from "react";
import useDownloader from "react-use-downloader";
import fileDownload from "js-file-download";
import { getFile } from "@/lib/download-file";

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);

  const [waiting, setWaiting] = useState<boolean>(false);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [checkAnalysis, setCheckAnalysis] = useState<boolean>(false);

  const [timeStamp, setTimeStamp] = useState<string>("");

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  async function prediction() {
    if (!file) return;

    const formData = new FormData();
    const date = new Date();
    const time = date.getTime().toString();
    setTimeStamp(time);

    formData.append("file", file);
    formData.append("timestamp", time);

    setWaitingTime(0);
    setWaiting(true);
    setCheckAnalysis(true);

    await uploadFile(formData);

    await _addExecution(time, "Waiting");
    await startAnalysis(time);

    const interval = setInterval(async function () {
      const status = await _getExecutionStatusByTaskID(time);
      if (status === "Finished") {
        setWaitingTime(100);
        clearInterval(interval);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setWaiting(false);
      } else if (status === "Step 1") {
        setWaitingTime(50);
      } else if (status === "Waiting") {
        setWaitingTime(25);
      }
    }, 3000);
  }

  async function handleDownload(url: string, filename: string) {
    fileDownload(await getFile(url), filename);
  }

  return (
    <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={1}>PHeP - Healthcare Predictive System</Title>
        <p>
          Get an estimate of the probability of hospitalization for a patient.
        </p>
        <p>
          Try with your own data or download the sample file from{" "}
          <a href="https://shorturl.at/xaecv">here</a>.
        </p>

        <Group justify="center">
          <FileInput
            onChange={setFile}
            accept="text/csv"
            style={{ width: "30%" }}
          />
          <Button disabled={file === null || waiting} onClick={prediction}>
            Prediction
          </Button>
        </Group>
        {waiting && (
          <Progress
            style={{ marginTop: "4%" }}
            size="lg"
            value={waitingTime}
            striped
            animated
          />
        )}
      </Card>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ marginTop: "2%" }}
      >
        <Title order={1}>Prediction</Title>
        <p>Download results.</p>

        <Button
          disabled={waiting || !checkAnalysis}
          onClick={() =>
            handleDownload(
              `https://download-server:8443/download/${timeStamp}`,
              "prediction.csv"
            )
          }
        >
          Download
        </Button>
      </Card>
    </div>
  );
}
