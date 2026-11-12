import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const submittedKey = typeof body.adminKey === 'string' ? body.adminKey.trim() : '';

    if (!submittedKey) {
      return NextResponse.json(
        { valid: false, error: 'La clave admin está vacía.' },
        { status: 400 }
      );
    }

    const expectedKey = (process.env.ADMIN_KEY || 'jardin2026').trim();

    const submittedBuf = Buffer.from(submittedKey, 'utf8');
    const expectedBuf = Buffer.from(expectedKey, 'utf8');

    const isValid =
      submittedBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(submittedBuf, expectedBuf);

    if (!isValid) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Clave admin incorrecta. Verifícala o deja el campo vacío para publicar en la sección general.'
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error verifying admin key:', error);
    return NextResponse.json(
      { valid: false, error: 'No se pudo verificar la clave en este momento.' },
      { status: 500 }
    );
  }
}
