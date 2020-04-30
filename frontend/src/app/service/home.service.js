import axios from "axios";

export const DASHBOARD_URL = "/api/main/dashboard/";

export function getDashboard() {
  return axios.get(DASHBOARD_URL);
}
