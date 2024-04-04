import { supabase } from "@/lib/supabase";
import type { AggregatorData } from "@/db/types/aggregator.types";

export class Aggregator {
  
  static async init() {
    const { error } = await supabase.from("aggregator").insert([
      { status: true }
    ])

    if (error) {
      throw new Error(error.message);
    }
  }

  static async get(username: string) {
    return await supabase
      .from("public_aggregator")
      .select("*")
      .eq("user_name", username)
      .single<AggregatorData>();
  }
}