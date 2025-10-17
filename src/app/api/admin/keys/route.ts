// app/api/admin/keys/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt, generateUniqueKey } from "@/lib/utils";
import { sendLicenseEmail } from "@/lib/email";

async function getProfileFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  try {
    const profile = await decrypt(token);
    return profile;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

// GET /api/admin/keys
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const whereClause = status ? { status: status.toUpperCase() } : {};

  const keys = await prisma.licenseKey.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      createdBy: {
        select: { username: true },
      },
    },
  });
  return NextResponse.json(keys);
}

// POST /api/admin/keys
export async function POST(request: NextRequest) {
  // The profile is attached by the middleware
  const profile = await getProfileFromRequest(request);
  console.log("profile ", profile);
  const { email } = await request.json();

  let createdKey;
  try {
    const newKey = generateUniqueKey();
    createdKey = await prisma.licenseKey.create({
      data: {
        serialKey: newKey,
        email: email,
        createdById: profile.userId,
      },
    });
    console.log(`Admin '${profile.username}' generated new key for ${email}`);
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "A license key already exists for this email.",
        },
        { status: 409 }
      );
    }
    console.error("Error creating key:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during key creation.",
      },
      { status: 500 }
    );
  }

  // Send email after successful creation
  try {
    await sendLicenseEmail(createdKey.email!, createdKey.serialKey);
    return NextResponse.json({
      success: true,
      data: createdKey,
      message: "Key created and email sent successfully.",
    });
  } catch (emailError) {
    console.error(`Failed to send email to ${createdKey.email}:`, emailError);
    // The key was created, so we return a success response with a warning message
    return NextResponse.json({
      success: true,
      data: createdKey,
      message:
        "Key created, but the email could not be sent. Please check server logs.",
    });
  }
}
