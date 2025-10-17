// app/api/admin/keys/[id]/deactivate/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const updatedKey = await prisma.licenseKey.update({
      where: { id },
      data: { status: "DEACTIVATED", deviceId: null, activatedAt: null },
    });
    return NextResponse.json({ success: true, data: updatedKey });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Key not found." },
      { status: 404 }
    );
  }
}
