import { supabase } from "../lib/supabase";

export const createLink = async (link: string) => {

  const code =  crypto.randomUUID().split("-")[0];

  const { error } = await supabase
    .from("link_temp").insert([
      {
        link,
        link_short_code: code,
      },
    ]);

  if (error) 
    throw new Error(error.message);

  return code;
};

export const getLink = async (code: string) => {

  const { data, error } = await supabase
    .from("link_temp")
    .select("id,link,uses")
    .eq("link_short_code", code);

  if (error || data.length === 0)
    return null
  
  if (data[0].uses <= 5) {
    await supabase.from("link_temp")
      .update({ uses: data[0].uses + 1 })
      .eq("id", data[0].id);
  } else {
    await supabase.from("link_temp")
      .delete()
      .eq("id", data[0].id);
  }

  return data[0].link;
};