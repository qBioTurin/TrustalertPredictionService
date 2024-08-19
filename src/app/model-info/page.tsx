"use client";
import { Card, Table, Title } from "@mantine/core";

export default function ModelInfo() {
  const hyperparameters = [
    { hyperparameter: "Epochs", value: "8" },
    { hyperparameter: "Max sequence length", value: "512" },
    { hyperparameter: "Train Batch Size", value: "10" },
    { hyperparameter: "Learning Rate", value: "1e-8" },
    { hyperparameter: "Hidden Size", value: "768" },
    { hyperparameter: "Number of Hidden Layer", value: "12" },
    { hyperparameter: "Number of Attention Layer", value: "12" },
    { hyperparameter: "Intermediate Size", value: "3072" },
    { hyperparameter: "Hidden Act", value: "gelu" },
    { hyperparameter: "Hidden Dropout Prob", value: ".1" },
    { hyperparameter: "Initializer Range", value: ".02" },
  ];

  const rows = hyperparameters.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td style={{fontWeight: "800"}}>{element.hyperparameter}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={1}>PHeP - Healthcare Predictive System</Title>
        <p>Model hyperparameters</p>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </div>
  );
}
