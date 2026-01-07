// app/api/license/status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();

    if (!identifier) {
      return NextResponse.json(
        { success: false, message: "Email or serial key is required" },
        { status: 400 }
      );
    }

    // Try to find the license key by email or serial key
    const licenseKey = await prisma.licenseKey.findFirst({
      where: {
        OR: [{ email: identifier }, { serialKey: identifier }],
      },
      select: {
        serialKey: true,
        email: true,
        status: true,
        deviceId: true,
        activatedAt: true,
        createdAt: true,
      },
    });

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: "License not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: licenseKey,
    });
  } catch (error) {
    console.error("License Status Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
