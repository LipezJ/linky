import { map } from "nanostores";
import { supabase } from "./supabase";
import type { AstroCookies } from "astro";
import type { Session, User } from "@supabase/supabase-js";

interface AuthInterface {
  userData: {
    user: User | null
    session: Session | null
  } | null
}

export class Auth {

  private static auth = map<AuthInterface>({
    userData: null,
  });

  static async getUserData(cookies: AstroCookies) {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    if (!accessToken || !refreshToken) {
      this.auth.set({
        userData: null,
      });
      return false;
    } else if (this.auth.get().userData) {
      return this.auth.get().userData;
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
      return null;
    }

    this.auth.set({
      userData: data,
    });
    return data;
  }

  static isSignedIn(cookies: AstroCookies) {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    return Boolean(accessToken && refreshToken);
  }
}