"use client";
import { addExecution, getExecutionStatusByIDs } from "@/lib/actions/Execution";
import {
  Button,
  Card,
  FileButton,
  Group,
  Loader,
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
  const [startAnalysis, setStartAnalysis] = useState<boolean>(false);

  async function prediction() {
    if (file !== null) {
      const newFormData = new FormData();
      newFormData.append("file", file);
      try {
		const response = await fetch('/api/upload', {
		  method: 'POST',
		  body: newFormData,
		});
	
		const result = await response.json();
		console.log(result);
	  } catch (error) {
		console.error('Error uploading files:', error);
	  }

      setWaiting(true);
      setStartAnalysis(true);
      addExecution(1, 1, "Waiting");
      fetch("/api/test", { method: "POST" })
        .then((response) => response.json())
        .then((result) => {
          console.log("Dati recuperati:", result);
        })
        .catch((error) => {
          console.error("Errore durante il recupero dei dati:", error);
        });

      const interval = setInterval(async function () {
        const status = await getExecutionStatusByIDs(1, 1);
        if (status === "Finished") {
          clearInterval(interval);
          setWaiting(false);
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
        <Title order={1}>Hospitalization Prediction</Title>
        <p>
          Get an estimate of the probability of hospitalization for a patient.
        </p>

        <Group justify="center">
          <TextInput disabled placeholder={file?.name} />
          <FileButton onChange={setFile} accept="text/csv">
            {(props) => <Button {...props}>Upload CSV file</Button>}
          </FileButton>
          <Button disabled={file === null} onClick={prediction}>
            Prediction
          </Button>
        </Group>
        {waiting && <Loader color="blue" />}
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
              `http://trustalert.hpc4ai.unito.it:8000/prediction.csv`,
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
