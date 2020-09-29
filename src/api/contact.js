import axios from "axios";
import { API_URL } from "@/settings";

export async function getContactList() {
  const result = await axios.post(API_URL + "/Siteinfo/ContactInfo");
  return result.data;
}
