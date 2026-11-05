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
            content: `Eres un escritor botánico para El Jardín Secreto.
Escribe publicaciones sencillas, cálidas y prácticas sobre plantas y flores, usando lenguaje claro y accesible.
NUNCA menciones nombres de personas (la publicación debe ser anónima).
NUNCA uses palabras complejas de informática o ingeniería.
Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
{
  "title": "Título sencillo y atractivo",
  "content": "Párrafo breve con consejos prácticos de cuidado, luz y agua (2 a 3 oraciones sencillas).",
  "category": "Flores y Cuidados" | "Plantas de Casa" | "Suculentas" | "Consejos de Riego",
  "scientificName": "Nombre científico en latín si aplica (o dejar vacío)",
  "watering": "Frecuencia de riego sencilla (ej: Cada 8 días)",
  "light": "Necesidad de luz sencilla (ej: Mucha luz sin sol directo)"
}`
          },
          {
            role: 'user',
            content: `Genera una nota sencilla sobre: ${topic}.`
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 800,
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
      fortnightTag: isWedOrThu ? 'Publicación de Temporada' : 'Edición Quincenal',
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
