// lib/utils.ts
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET!;
const key = new TextEncoder().encode(secretKey);

export function generateUniqueKey(): string {
  const randomPart = crypto.randomBytes(15).toString("hex").toUpperCase();
  const chunks = [];
  for (let i = 0; i < randomPart.length; i += 5) {
    chunks.push(randomPart.substring(i, i + 5));
  }
  return chunks.slice(0, 4).join("-");
}

// Generate 6-digit OTP
export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // This will handle expired tokens or invalid signatures
    console.error("JWT Verification failed:", error);
    return null;
  }
}

// Function to get session from cookies
export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
