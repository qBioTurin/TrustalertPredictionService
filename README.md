# Trustalert Prediction Service

This is a Next.js application designed to predict if a patient will be hospitalize within three months using advanced BERT models. This application provides healthcare professionals with valuable insights to make informed decisions and improve patient outcomes.

## Features

- **Patient Data Input**: Upload patient medical history for analysis.
- **BERT Model Integration**: Leverages pre-trained BERT models for accurate predictions.
- **Real-time Results**: Get instant predictions on patients' future hospitalization.
- **User-Friendly Interface**: A clean, intuitive UI built with Next.js.

## Prerequisites

- **Docker**: Ensure you have Docker on your machine to build and run the container

## Installation

1. Build and run the docker compose:
   ```
   docker compose up --build
   ```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## How It Works

1. **Data Upload**:
   - Users upload patient data via a CSV file.
   
2. **Preprocessing**:
   - The application processes the data, ensuring it aligns with the input requirements of the BERT model.

3. **Model Prediction**:
   - The BERT model, running in HPC4AI Slurm infrastructure, analyzes the data and provides hospitalization predictions.

4. **Results Visualization**:
   - Predictions are downloadable in CSV format.

## Acknowledgements
This work is part of the TrustAlert project, which was supported by the Fondazione Compagnia San Paolo and Fondazione CDP under the “Artificial Intelligence” call.
HPC4AI (https://hpc4ai.unito.it) was set up thanks to an initial investment of 4.5M€ from a competitive funding call from the Piedmont Region via EU POR-FESR 2014-2020.
