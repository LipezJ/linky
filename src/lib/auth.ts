import { supabase } from "./supabase";
import type { AstroCookies } from "astro";

export class Auth {

  static async getUserData(cookies: AstroCookies) {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    if (!accessToken || !refreshToken) {
      return false;
    }

    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    if (error) {
      cookies.delete("sb-access-token", {
        path: "/",
      });
      cookies.delete("sb-refresh-token", {
        path: "/",
      });

      return false;
    }

    return data;
  }

  static isSignedIn(cookies: AstroCookies) {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    return Boolean(accessToken && refreshToken);
  }
}