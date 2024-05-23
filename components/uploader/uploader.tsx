"use client";
import { addExecution, getExecutionStatusByIDs } from "@/lib/actions/Execution";
import {
  Button,
  Card,
  FileButton,
  Group,
  Loader,
  Progress,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import useDownloader from "react-use-downloader";

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
  const [content, setContent] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<string>("");
  const [startAnalysis, setStartAnalysis] = useState<boolean>(false);
  const [waitingTime, setWaitingTime] = useState<number>(0);

  async function prediction() {
    if (file !== null) {
      const newFormData = new FormData();
      const date = new Date();
      const time = date.getTime().toString();
      setTimeStamp(time);
      newFormData.append("file", file);
      newFormData.append("timestamp", time);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: newFormData,
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error uploading files:", error);
      }

      setWaiting(true);
      setStartAnalysis(true);
	  setWaitingTime(0);
      addExecution(1, time, "Waiting");
      fetch("/api/test", { method: "POST", body: newFormData })
        .then((response) => response.json())
        .then((result) => {
          console.log("Dati recuperati:", result);
        })
        .catch((error) => {
          console.error("Errore durante il recupero dei dati:", error);
        });

      const interval = setInterval(async function () {
        const status = await getExecutionStatusByIDs(1, time);
        if (status === "Finished") {
          setWaitingTime(100);
          clearInterval(interval);
		  await new Promise(resolve => setTimeout(resolve, 2000));
          setWaiting(false);
        } else if (status === "Step 1") {
          setWaitingTime(50);
        } else if (status === "Waiting") {
          setWaitingTime(25);
        }
      }, 3000);
    }
  }

  const handleDownload = (url: string, filename: string) => {
    download(url, filename);
  };

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
          <TextInput disabled placeholder={file?.name} />
          <FileButton onChange={setFile} accept="text/csv">
            {(props) => <Button {...props}>Upload CSV file</Button>}
          </FileButton>
          <Button disabled={file === null || waiting} onClick={prediction}>
            Prediction
          </Button>
        </Group>
        {waiting && <Progress style={{marginTop: "4%"}} size="lg" value={waitingTime} striped animated />}
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
          disabled={waiting || !startAnalysis}
          onClick={() =>
            handleDownload(
              `http://trustalert.hpc4ai.unito.it:8000/${timeStamp}/prediction.csv`,
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
