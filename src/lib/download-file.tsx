"use server";
import https from "https";
import axios from "axios";

export async function getFile(timestamp: string): Promise<string> {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  return axios
    .get(`https://download-server:8443/download/${timestamp}`, { httpsAgent })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in getFile", error);
    });
}
