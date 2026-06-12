import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export async function generateCase() {
  const responde = await api.get("/cases/generate");
  return responde.data;
}
