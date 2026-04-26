import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

    // Simulate saving to a database or sending an email notification
    console.log("Nueva solicitud de demostración recibida:", { name, email, company });

    // Artificial delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(
      { message: "¡Gracias por contactar a SolStice AI! Nos pondremos en contacto pronto." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
