import { api } from "@/lib/axios";

export interface MeResponse {
  id: string;
  name: string;
  email: string;
}

export async function fetchMe(): Promise<MeResponse> {
  const res = await api.get<MeResponse>("/auth/me");
  return res.data;
}
