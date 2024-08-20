"use server";
import https from "https";
import fs from "fs";
import path from "path";
import axios from "axios";

export async function getFile(url: string): Promise<string> {
  const certificate = fs.readFileSync(
    path.resolve(`${process.cwd()}/sslcert/server.crt`)
  );
  const privateKey = fs.readFileSync(
    path.resolve(`${process.cwd()}/sslcert/server.key`)
  );

  const httpsAgent = new https.Agent({
    key: privateKey,
    cert: certificate,
    rejectUnauthorized: false,
  });

  return axios
    .get(url, { httpsAgent })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in getFile", error);
    });
}
