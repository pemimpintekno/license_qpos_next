// app/api/deactivate/request-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { sendOTPEmail } from "@/lib/email";

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

    // Check if license is ACTIVATED
    if (licenseKey.status !== "ACTIVATED") {
      return NextResponse.json(
        {
          success: false,
          message: `License is currently ${licenseKey.status}. Only ACTIVATED licenses can be reset.`,
        },
        { status: 400 }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Delete any existing unused OTPs for this license
    await prisma.oTP.deleteMany({
      where: {
        licenseKeyId: licenseKey.id,
        used: false,
      },
    });

    // Create new OTP
    await prisma.oTP.create({
      data: {
        email: licenseKey.email,
        code: otpCode,
        licenseKeyId: licenseKey.id,
        expiresAt,
      },
    });

    // Send OTP email
    try {
      await sendOTPEmail(licenseKey.email, otpCode);
      console.log(
        `OTP sent to ${licenseKey.email} for license ${licenseKey.serialKey}`
      );

      return NextResponse.json({
        success: true,
        message: "OTP has been sent to your email address",
        data: {
          email: licenseKey.email,
          expiresIn: "10 minutes",
        },
      });
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      // Delete the OTP since we couldn't send it
      await prisma.oTP.deleteMany({
        where: {
          licenseKeyId: licenseKey.id,
          code: otpCode,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send OTP email. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request OTP Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
