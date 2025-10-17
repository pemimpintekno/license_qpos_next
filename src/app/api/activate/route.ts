// app/api/activate/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { serialKey, deviceId } = await request.json();

    if (!serialKey || !deviceId) {
      return NextResponse.json({ success: false, message: 'Missing serialKey or deviceId' }, { status: 400 });
    }

    const keyToActivate = await prisma.licenseKey.findUnique({
      where: { serialKey },
    });

    if (keyToActivate && keyToActivate.status === 'UNUSED') {
      await prisma.licenseKey.update({
        where: { serialKey },
        data: { status: 'ACTIVATED', deviceId, activatedAt: new Date() },
      });
      console.log(`Key ${serialKey} activated for device ${deviceId}`);
      return NextResponse.json({
        success: true,
        message: 'Application activated successfully.',
      });
    } else {
      console.warn(`Failed activation attempt for key: ${serialKey}`);
      return NextResponse.json({
        success: false,
        message: 'Invalid or already used serial key.',
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Activation Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}