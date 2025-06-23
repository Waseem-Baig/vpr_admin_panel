import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function getRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setRole(data?.role ?? null);
      }
    }
    getRole();
  }, []);

  return role;
}
