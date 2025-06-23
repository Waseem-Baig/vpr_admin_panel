import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use your service role key for admin actions!
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, mobile, gender, role } = body;

  // 1. Create the auth user
  const { data: userData, error: userError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (userError || !userData?.user?.id) {
    return NextResponse.json(
      { error: userError?.message || "Failed to create auth user" },
      { status: 400 }
    );
  }

  // 2. Create the profile row
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: userData.user.id,
      name,
      mobile,
      gender,
      role,
    },
  ]);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
