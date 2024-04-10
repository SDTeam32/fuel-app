"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./utils/supabase/server";
import bcrypt from 'bcryptjs';
import { User } from "./types";``



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
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.error("error in jwtVerify", err)
    return null
  }
}

export async function login(username: string, password: string) {
  // Verify credentials && get the user
  try {
    const { data: userData, error: userError } = await supabase
      .from('credentials')
      .select()
      .eq('username', username)
      .single<User>();
    console.log("this is user data from supabase ", userData)
    if (userError || !userData) throw new Error("Username does not exist")

    const passwordIsValid = await bcrypt.compareSync(password, userData.password)

    if(passwordIsValid) {
      console.log("User logged in successfully");
      const user = {...userData};
        // Create the session
        const expires = new Date(Date.now() + 60 * 1000);
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
  try {  
    const parsed = await decrypt(session);
    console.log(parsed)
    parsed.expires = new Date(Date.now() + 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  } catch (error) {
    return
  }
}