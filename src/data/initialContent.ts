import { AppContentState } from '../types';

export const INITIAL_CONTENT: AppContentState = {
  lastUpdated: new Date().toISOString(),
  siteSettings: {
    siteName: 'El Jardín Secreto',
    curatorName: 'Constanza Pimentel P.',
    curatorRole: 'Fundadora & Curadora Botánica',
    curatorBio: 'Apasionada del reino vegetal, la botánica urbana y la divulgación de las maravillas naturales. Creé El Jardín Secreto para compartir cada dos semanas una nueva mirada a las especies que llenan de vida nuestro planeta.',
    curatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tagline: 'Comunidad botánica viva & cuadernos de cultivo quincenales',
    welcomeText: 'Bienvenidos al mundo de las plantas. Aquí celebramos la importancia de la flora en nuestro planeta: las plantas no solo nos proporcionan oxígeno y alimento, sino que también embellecen nuestro entorno y mantienen el equilibrio de la naturaleza.',
    aboutStory: 'El Jardín Secreto nació como un refugio digital para conectar a quienes sienten fascinación por la naturaleza. Nuestro objetivo es crear un espacio donde puedas aprender y conocer más sobre las plantas de una manera sencilla, interesante y entretenida. Cada dos semanas renovamos nuestras publicaciones con fichas botánicas detalladas, consejos de cuidado para el hogar y un foro abierto para intercambiar dudas, esquejes y experiencias verdes.',
    manifesto: [
      'Aprender a observar los ritmos lentos y sabios de la naturaleza.',
      'Democratizar el conocimiento botánico sin tecnicismos intimidantes.',
      'Construir una comunidad amable donde toda pregunta sobre plantas sea bienvenida.',
      'Fomentar la biodiversidad y el cuidado responsable de cada ejemplar.'
    ],
    contactEmail: 'constanza.pimentel@jardinsecreto.org',
    instagram: '@eljardinsecreto.botanica',
    adminPin: 'jardin2026'
  },
  currentEdition: {
    id: 'edicion-quincenal-nov-2026',
    editionNumber: 24,
    cycleTitle: 'El Misterio de las Epífitas y Selvas de Interior',
    subtitle: 'Quincena del 1 al 15 de Noviembre 2026',
    dateRange: '01 Nov – 15 Nov 2026',
    nextEditionDate: '16 Noviembre 2026',
    editorialMessage: 'En esta quincena nos adentramos en el fascinante estrato medio de los bosques húmedos: las plantas que viven abrazadas a los troncos sin parasitarlos, absorbiendo nutrientes de la niebla y la lluvia. Desde orquídeas espectaculares hasta helechos cuerno de ciervo, descubriremos cómo replicar su humedad en apartamentos de ciudad.',
    active: true,
    highlights: [
      'Guía maestra de sustrato aireado para orquídeas y monsteras',
      'Ficha botánica exclusiva: Orquídea Phalaenopsis Bellina',
      'Diagnóstico quincenal: ¿Por qué las puntas de tus hojas se ponen marrones?',
      'Intercambio de esquejes de temporada en el foro'
    ],
    featuredPlant: {
      id: 'planta-quincena-phalaenopsis',
      commonName: 'Orquídea Mariposa Silvestre',
      scientificName: 'Phalaenopsis amabilis (L.) Blume',
      category: 'Orquídeas y Flores',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
      summary: 'Una de las orquídeas epífitas más admiradas del sudeste asiático. Sus pétalos blancos inmaculados recuerdan el vuelo de mariposas nocturnas y puede florecer hasta 3 meses seguidos con las condiciones adecuadas.',
      origin: 'Bosques lluviosos de Indonesia, Filipinas y norte de Australia.',
      light: 'Luz filtrada muy brillante (sin sol directo que queme sus hojas carnosas).',
      watering: 'Inmersión cada 7-10 días cuando las raíces pasen de verde esmeralda a gris plateado.',
      humidity: 'Alta (50% a 70%). Agradece humidificador o bandeja con guijarros y agua.',
      difficulty: 'Intermedio',
      toxicity: 'No tóxica para gatos ni perros (100% Pet Safe).',
      curatorNotes: 'El secreto está en las raíces: nunca las entierres en tierra común de jardín. Necesitan corteza de pino gruesa y macetas transparentes para que sus raíces también hagan fotosíntesis.',
      tags: ['Floración Larga', 'Pet-Friendly', 'Epífita', 'Interior']
    }
  },
  archivedEditions: [
    {
      id: 'edicion-quincenal-oct-2026-b',
      editionNumber: 23,
      cycleTitle: 'Sustratos Vivos y el Arte del Riego Otoñal',
      subtitle: 'Quincena del 16 al 31 de Octubre 2026',
      dateRange: '16 Oct – 31 Oct 2026',
      nextEditionDate: '01 Noviembre 2026',
      editorialMessage: 'Con la disminución de horas de luz, el metabolismo de nuestras plantas se ralentiza. En esta edición exploramos cómo ajustar el calendario de riego para evitar pudrición de raíces.',
      active: false,
      highlights: [
        'Ajustes de riego ante el cambio de estación',
        'Ficha: Monstera Adansonii y sus ventanas naturales',
        'Elaboración de humus de lombriz casero'
      ],
      featuredPlant: {
        id: 'planta-monstera-adansonii',
        commonName: 'Monstera Oblicua / Adansonii',
        scientificName: 'Monstera adansonii Schott',
        category: 'Aráceas',
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
        summary: 'Famosa por las perforaciones naturales en sus hojas ("queso suizo"). Trepadora vigorosa ideal para tutores de musgo esfagno.',
        origin: 'Selvas tropicales de América Central y del Sur.',
        light: 'Luz indirecta media a alta.',
        watering: 'Cuando el tercio superior del sustrato esté completamente seco.',
        humidity: 'Media a alta (mínimo 50%).',
        difficulty: 'Principiante',
        toxicity: 'Levemente tóxica por cristales de oxalato de calcio.',
        curatorNotes: 'Dale un tutor de musgo húmedo y verás cómo el tamaño de las hojas se triplica en pocos meses.',
        tags: ['Trepadora', 'Hojas Perforadas', 'Rápido Crecimiento']
      }
    }
  ],
  posts: [
    {
      id: 'post-1',
      title: '🌿 Cuaderno de la Quincena: Cómo lograr que tu orquídea vuelva a florecer año tras año',
      content: 'Muchos piensan que cuando una orquídea pierde sus flores, la planta ha llegado a su fin. ¡Nada más lejos de la realidad! En esta edición quincenal les comparto mi método comprobado de choque térmico nocturno y fertilización ligera balanceada (20-20-20 al cuarto de dosis) para activar las varas florales durmientes.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora Principal',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        isCurator: true
      },
      category: 'Orquídeas y Flores',
      imageUrl: 'https://images.unsplash.com/photo-1566804374972-e1c55c5e8c47?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Hace 2 días',
      fortnightTag: 'Edición #24',
      likes: 42,
      views: 318,
      pinned: true,
      plantDetails: {
        scientificName: 'Orchidaceae Juss.',
        light: 'Luz indirecta abundante',
        watering: 'Inmersión semanal',
        difficulty: 'Intermedio'
      },
      comments: [
        {
          id: 'c-101',
          author: 'Martín Sotomayor',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
          createdAt: 'Ayer a las 14:20',
          content: '¡Increíble dato el de la diferencia de temperatura entre día y noche! La mía llevaba dos años sin dar vara y justo empezó a brotar cuando la acerqué a la ventana que abro en las noches.'
        },
        {
          id: 'c-102',
          author: 'Constanza Pimentel P.',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          createdAt: 'Ayer a las 16:45',
          content: '¡Exactamente Martín! Ese salto de 4° a 6°C le avisa a la planta que es temporada de floración. Cuídale mucho esa vara nueva del viento directo.',
          isCurator: true
        }
      ]
    },
    {
      id: 'post-2',
      title: '🔍 ¿Alguien me ayuda a identificar esta joya variegada que rescaté en el mercado?',
      content: 'Compré esta pequeña planta en un vivero local donde solo decía "Planta surtida". Tiene tallos rojizos, hojas acorazonadas y una variegación blanca marmolada preciosa. ¿Es un Syngonium Albo o un Philodendron White Wizard?',
      author: {
        name: 'Camila Rosas',
        role: 'Miembro Botánico',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        isCurator: false
      },
      category: 'Identificación de Especies',
      imageUrl: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Hace 3 días',
      fortnightTag: 'Edición #24',
      likes: 27,
      views: 184,
      comments: [
        {
          id: 'c-103',
          author: 'Luciano Verde',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
          createdAt: 'Hace 2 días',
          content: 'Por la forma del peciolo y el borde alado parece un Philodendron White Wizard. ¡Menudo hallazgo para un puesto callejero!'
        }
      ]
    },
    {
      id: 'post-3',
      title: '🌵 La regla de oro del sustrato para suculentas: Adiós a la tierra apelmazada',
      content: 'El 80% de las suculentas mueren no por falta de amor, sino por exceso de agua retenida en el sustrato. Les comparto la mezcla mineral 70/30 que utilizo en El Jardín Secreto: 40% tepojal/pómice, 30% perlita o gravilla volcánica, y solo 30% tierra negra con humus.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora Principal',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        isCurator: true
      },
      category: 'Suculentas y Cactus',
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Hace 5 días',
      fortnightTag: 'Edición #24',
      likes: 56,
      views: 460,
      comments: [
        {
          id: 'c-104',
          author: 'Andrea Morales',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
          createdAt: 'Hace 4 días',
          content: 'Cambié mis echeverias a esta fórmula la semana pasada y la absorción de agua es impecable. Se seca en 48 horas sin estancarse.'
        }
      ]
    },
    {
      id: 'post-4',
      title: '🍂 Remedio casero efectivo contra la temida cochinilla algodonosa',
      content: 'Si descubres pequeñas pelusas blancas algodonosas en las axilas de tus hojas, ¡actúa de inmediato! Mi receta favorita: 500ml de agua tibia, 1 cucharada de jabón potásico neutro y 1 cucharadita de alcohol al 70%. Aplicar al atardecer para no quemar con el sol.',
      author: {
        name: 'Elena Vega',
        role: 'Entusiasta de Plantas',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        isCurator: false
      },
      category: 'Plagas y Soluciones Orgánicas',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Hace 6 días',
      fortnightTag: 'Edición #23',
      likes: 38,
      views: 290,
      comments: []
    },
    {
      id: 'post-5',
      title: '🍃 Taller de Esquejes en Agua: Mis resultados propagando Ficus Lyrata y Pothos',
      content: 'Propagar plantas es una de las experiencias más gratificantes. Llevo 3 semanas enraizando esquejes con un chorrito de agua oxigenada para oxigenar el medio y canela en el corte. Ya asoman raíces de 5 centímetros listas para trasplante a maceta.',
      author: {
        name: 'Diego Valenzuela',
        role: 'Jardinero Urbano',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        isCurator: false
      },
      category: 'Propagación y Esquejes',
      imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Hace 1 semana',
      fortnightTag: 'Edición #23',
      likes: 31,
      views: 245,
      comments: []
    }
  ],
  plantsEncyclopedia: [
    {
      id: 'enc-1',
      commonName: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa Liebm.',
      category: 'Aráceas',
      imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      summary: 'Reina indiscutible de los interiores modernos por sus imponentes hojas con fenestraciones.',
      origin: 'Selvas de México y Centroamérica',
      light: 'Luz indirecta brillante, tolera sombra ligera',
      watering: 'Moderado (dejar secar los primeros 3-4 cm de tierra)',
      humidity: 'Media a alta (50-60%)',
      difficulty: 'Principiante',
      toxicity: 'Tóxica para gatos y perros si se mastica',
      curatorNotes: 'Limpia sus hojas con un paño húmedo cada quincena para optimizar la captación de luz.',
      tags: ['Purificadora', 'Hojas Grandes', 'Interior']
    },
    {
      id: 'enc-2',
      commonName: 'Orquídea Phalaenopsis',
      scientificName: 'Phalaenopsis amabilis (L.) Blume',
      category: 'Orquídeas',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
      summary: 'Elegancia pura. Flores duraderas con varas arqueadas que llenan de serenidad cualquier rincón.',
      origin: 'Sudeste asiático e islas del Pacífico',
      light: 'Luz brillante tamizada',
      watering: 'Por inmersión cuando las raíces se vean plateadas',
      humidity: 'Alta (60-70%)',
      difficulty: 'Intermedio',
      toxicity: 'Completamente segura para mascotas',
      curatorNotes: 'Usa maceta de plástico transparente para chequear el color de las raíces.',
      tags: ['Pet-Friendly', 'Floración Larga', 'Epífita']
    },
    {
      id: 'enc-3',
      commonName: 'Sansevieria Trifasciata (Espada de San Jorge)',
      scientificName: 'Dracaena trifasciata (Prain) Mabb.',
      category: 'Suculentas y Follaje',
      imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
      summary: 'La planta más indestructible del reino vegetal. Excelente purificadora recomendada por la NASA.',
      origin: 'África tropical occidental',
      light: 'Se adapta a todo: desde sol filtrado hasta poca luz',
      watering: 'Muy escaso (cada 2 a 3 semanas en invierno)',
      humidity: 'Baja a normal',
      difficulty: 'Principiante',
      toxicity: 'Levemente tóxica para mascotas',
      curatorNotes: 'El peor enemigo de la Sansevieria es regarla demasiado. Si dudas, no riegues.',
      tags: ['Ultra Resistente', 'Purificadora', 'Dormitorio']
    },
    {
      id: 'enc-4',
      commonName: 'Calathea Orbifolia',
      scientificName: 'Goeppertia orbifolia (Linden) Borchs.',
      category: 'Marantáceas',
      imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
      summary: 'Hojas redondas con franjas plateadas simétricas que bailan abriéndose de día y cerrándose de noche.',
      origin: 'Bosques lluviosos de Bolivia y Brasil',
      light: 'Sombra brillante, nunca sol directo',
      watering: 'Mantener humedad constante sin encharcar (agua filtrada)',
      humidity: 'Muy alta (mínimo 65-75%)',
      difficulty: 'Experto',
      toxicity: '100% Pet-friendly',
      curatorNotes: 'Sensible al cloro del agua de grifo. Deja reposar el agua 24 horas antes de regar.',
      tags: ['Pet-Friendly', 'Hojas Decorativas', 'Humedad Alta']
    },
    {
      id: 'enc-5',
      commonName: 'Ficus Lyrata (Higuera Hoja de Violín)',
      scientificName: 'Ficus lyrata Warb.',
      category: 'Moráceas',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      summary: 'Estructura escultural de gran porte con hojas onduladas que recuerdan la silueta de un violín.',
      origin: 'Tierras bajas de África occidental',
      light: 'Mucha luz indirecta y algo de sol suave matutino',
      watering: 'Regar a fondo solo cuando los primeros 5 cm estén secos',
      humidity: 'Media (40-50%)',
      difficulty: 'Intermedio',
      toxicity: 'Tóxica por savia lechosa',
      curatorNotes: 'Odia las corrientes de aire frío y que la cambien de lugar constantemente.',
      tags: ['Árbol de Interior', 'Escultural', 'Luz Brillante']
    },
    {
      id: 'enc-6',
      commonName: 'Echeveria Elegans (Rosa de Alabastro)',
      scientificName: 'Echeveria elegans Rose',
      category: 'Crasuláceas',
      imageUrl: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
      summary: 'Roseta geométrica azulada con recubrimiento de pruina protectora que brilla como la porcelana.',
      origin: 'Zonas semiáridas de Hidalgo, México',
      light: 'Sol directo o luz muy intensa',
      watering: 'Solo cuando las hojas basales comiencen a arrugarse ligeramente',
      humidity: 'Baja (ambiente seco)',
      difficulty: 'Principiante',
      toxicity: 'Inofensiva para mascotas',
      curatorNotes: 'Nunca toques sus hojas con los dedos para no remover la pruina que la protege de los rayos UV.',
      tags: ['Geometría Sagrada', 'Poco Riego', 'Exterior/Ventana']
    }
  ]
};
