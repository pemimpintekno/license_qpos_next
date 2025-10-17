// app/api/admin/keys/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await prisma.licenseKey.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "Key deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Key not found." },
      { status: 404 }
    );
  }
}
