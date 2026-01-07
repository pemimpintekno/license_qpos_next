// app/api/deactivate/verify-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { identifier, otp } = await request.json();

    if (!identifier || !otp) {
      return NextResponse.json(
        { success: false, message: "Email/serial key and OTP are required" },
        { status: 400 }
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP format. Must be 6 digits." },
        { status: 400 }
      );
    }

    // Try to find the license key by email or serial key
    let licenseKey = await prisma.licenseKey.findFirst({
      where: {
        OR: [{ email: identifier }, { serialKey: identifier }],
      },
    });

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: "License not found" },
        { status: 404 }
      );
    }

    // Find the OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email: licenseKey.email,
        code: otp,
        licenseKeyId: licenseKey.id,
        used: false,
        expiresAt: {
          gte: new Date(), // Not expired
        },
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // Reset the license to UNUSED
    const updatedKey = await prisma.licenseKey.update({
      where: { id: licenseKey.id },
      data: {
        status: "UNUSED",
        deviceId: null,
        activatedAt: null,
      },
    });

    console.log(
      `License ${updatedKey.serialKey} reset to UNUSED by user via OTP`
    );

    return NextResponse.json({
      success: true,
      message: "License has been successfully reset to UNUSED",
      data: {
        serialKey: updatedKey.serialKey,
        email: updatedKey.email,
        status: updatedKey.status,
      },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
