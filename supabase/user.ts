import { redirect } from "next/navigation";
import { createClient } from "./server";
export const getUser = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return data.user;
};
