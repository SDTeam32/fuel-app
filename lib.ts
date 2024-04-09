"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./utils/supabase/server";
import bcrypt from 'bcryptjs';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("20 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(username: string, password: string) {
  // Verify credentials && get the user
  try {
    const { data: userData, error: userError } = await supabase
      .from('credentials')
      .select('password')
      .eq('username', username)
      .single();

    if (userError || !userData) throw new Error("Username does not exist")

    const passwordIsValid = await bcrypt.compareSync(password, userData.password)

    if(passwordIsValid) {
      console.log("User logged in successfully");
      const user = { username: username};
        // Create the session
<<<<<<< Updated upstream
        const expires = new Date(Date.now() + 5 * 1000);
=======
        const expires = new Date(Date.now() + 60 * 1000);
>>>>>>> Stashed changes
        const session = await encrypt({ user, expires });

        // Save the session in a cookie
        cookies().set("session", session, { expires, httpOnly: true });
    }
  } catch (error) {
    console.error("Login error", error);
  }
}

export async function signup(username: string, password: string) {
  try {
    // Hash the password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    // Insert user credentials into the database
    const { error } = await supabase.from("credentials").insert([{ username, password: hash }]);
    if (error) throw error;

    console.log("Username and Password Inserted Successfully");

    await login(username, password);
  } catch (error) {
    console.error("Sign up error", error);
    // Handle any errors that occur during the signup process
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
<<<<<<< Updated upstream
  parsed.expires = new Date(Date.now() + 5 * 1000);
=======
  parsed.expires = new Date(Date.now() + 60 * 1000);
>>>>>>> Stashed changes
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}