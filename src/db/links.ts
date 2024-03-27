import { supabase } from "@/lib/supabase";

export const createLink = async (link: string) => {

  const code =  crypto.randomUUID().split("-")[0];
  const { data } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("links").insert([
      {
        link,
        link_short_code: code,
        user: data.user?.id ?? null,
      },
    ]);

  if (error) 
    throw new Error(error.message);

  return code;
};

export const getLink = async (code: string) => {
  const { data, error } = await supabase
    .rpc("get_link_by_code", { code })

  if (error || data.length === 0 || data == "None")
    return null;

  return data;
};