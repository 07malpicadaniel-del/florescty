import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

const PLANT_TOPICS = [
  'Orquídeas y floración en casa',
  'Monstera y hojas con perforaciones',
  'Suculentas y riego equilibrado',
  'Plantas purificadoras de aire',
  'Helechos y humedad ambiental',
  'Esquejes y propagación en agua',
  'Calateas y luz tamizada',
  'Lirios de paz y hojas brillantes',
  'Amapolas silvestres y cuidados en jardín',
  'Violetas africanas y ventanas iluminadas'
];

const BOTANICAL_IMAGES = [
  'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1000&q=80',
  '/wix-assets/acerca_1.jpg',
  '/wix-assets/acerca_2.jpg'
];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const forced = Boolean(body.force);

    // Day check: 0=Domingo, 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado
    const today = new Date();
    const dayOfWeek = today.getDay();
    const isWedOrThu = dayOfWeek === 3 || dayOfWeek === 4;

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        error: 'GROQ_API_KEY no está configurada en las variables de entorno (.env.local o Vercel)'
      }, { status: 500 });
    }

    // Pick a random topic and image
    const topic = PLANT_TOPICS[Math.floor(Math.random() * PLANT_TOPICS.length)];
    const chosenImage = BOTANICAL_IMAGES[Math.floor(Math.random() * BOTANICAL_IMAGES.length)];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: `Eres un escritor botánico experto para el blog El Jardín Secreto.
Escribe artículos botánicos detallados, completos y ricos en información práctica para amantes de las flores y plantas del hogar.
El contenido debe ser extenso (4 a 5 párrafos completos y profundos), estructurado con elegancia:
- Origen e historia botánica de la especie.
- Protocolo minucioso de riego (frecuencia, método adecuado, técnica de inmersión si aplica y cómo comprobar la humedad).
- Luz ideal, orientación en el hogar y temperatura.
- Sustrato perfecto, aireación de raíces y abono natural.
- Diagnóstico de problemas comunes (hojas mustias, marchitamiento o plagas) y el secreto del cultivador para una floración duradera.
NUNCA menciones nombres de personas (debe ser autoría anónima).
NUNCA uses palabras de informática o tecnología.
NUNCA menciones entregas, fechas límite ni ventas. Es un blog botánico puro.
Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
{
  "title": "Título evocador y completo del artículo",
  "content": "Artículo botánico completo y extenso, detallando paso a paso los cuidados en varios párrafos bien redactados.",
  "category": "Flores y Cuidados" | "Plantas de Casa" | "Suculentas" | "Consejos de Riego",
  "scientificName": "Nombre científico completo con género y especie (ej: Phalaenopsis amabilis)",
  "watering": "Instrucción de riego precisa (ej: Inmersión semanal con agua reposada a temperatura ambiente)",
  "light": "Requisito de luz detallado (ej: Luz tamizada brillante junto a ventana este, evitando el sol directo del mediodía)"
}`
          },
          {
            role: 'user',
            content: `Escribe una guía botánica completa, detallada y profunda sobre: ${topic}.`
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 2500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', errText);
      return NextResponse.json({ error: 'Error al contactar a Groq', details: errText }, { status: 500 });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(rawContent);

    const newPost = {
      id: `post-ia-${Date.now()}`,
      title: parsed.title || 'Consejos para el cuidado de tus plantas',
      content: parsed.content || 'Mantén tus plantas con buena luz natural y riega solo cuando la tierra comience a secarse.',
      category: parsed.category || 'Plantas de Casa',
      author: {
        name: 'Cultivador Anónimo',
        role: 'Comunidad del Jardín',
        avatar: '/logo.png',
        isCurator: false
      },
      imageUrl: chosenImage,
      createdAt: 'Publicado hoy',
      fortnightTag: 'Guía Botánica',
      likes: 12,
      views: 75,
      plantDetails: {
        scientificName: parsed.scientificName || '',
        watering: parsed.watering || 'Moderado',
        light: parsed.light || 'Luz natural filtrada'
      },
      comments: []
    };

    return NextResponse.json({
      success: true,
      post: newPost,
      generatedAt: today.toISOString(),
      dayOfWeek: dayOfWeek,
      isWedOrThu: isWedOrThu
    });

  } catch (error: any) {
    console.error('Groq post generation failed:', error);
    return NextResponse.json({ error: error.message || 'Error desconocido' }, { status: 500 });
  }
}

export async function GET() {
  // Simple check endpoint
  const today = new Date();
  const dayOfWeek = today.getDay();
  return NextResponse.json({
    status: 'ready',
    service: 'Groq Botanical Publisher',
    todayDayOfWeek: dayOfWeek,
    isWedOrThu: dayOfWeek === 3 || dayOfWeek === 4,
    schedule: 'Miércoles y Jueves (1 por día)'
  });
}
