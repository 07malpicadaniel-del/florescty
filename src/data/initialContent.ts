import { AppContentState } from '../types';

export const INITIAL_CONTENT: AppContentState = {
  lastUpdated: new Date().toISOString(),
  siteSettings: {
    siteName: 'El Jardín Secreto',
    curatorName: 'Constanza Pimentel P.',
    curatorRole: 'Fundadora & Curadora Botánica',
    curatorBio: 'Dedicada a compartir las maravillas del reino vegetal. Creé El Jardín Secreto como un refugio natural para aprender sobre nuevas especies de flores y plantas, su origen y consejos de cuidado quincenales.',
    curatorAvatar: '/wix-assets/acerca_1.jpg',
    tagline: 'Comunidad botánica viva & cuadernos de cultivo quincenales',
    welcomeText: 'Bienvenidos al mundo de las plantas. Aquí, celebramos la importancia de la flora en nuestro planeta, ya que las plantas no solo nos proporcionan oxígeno y alimento, sino que también embellecen nuestro entorno y mantienen el equilibrio de la naturaleza. Nuestra misión es ofrecerte un espacio donde puedas aprender sobre la diversidad vegetal de manera sencilla y entretenida. Cada dos semanas, actualizaremos nuestra página con información sobre nuevas especies y consejos para su cuidado. ¡Únete a nosotros en esta emocionante aventura verde!',
    aboutStory: 'Nuestro objetivo es crear un espacio donde puedas aprender y conocer más sobre las plantas de una manera sencilla, interesante y entretenida. Cada dos semanas, nuestra página se actualizará con información sobre nuevas especies, desde pequeñas plantas ornamentales hasta árboles, flores y plantas exóticas que quizás nunca hayas conocido. Además, podrás descubrir sus principales características, su origen, los lugares donde crecen y algunos consejos para mantenerlas saludables.\n\nTe invitamos a explorar este fascinante mundo verde, a despertar tu curiosidad y a descubrir todo lo que la naturaleza tiene para ofrecernos. ¡Acompáñanos cada quincena y conoce una nueva planta que te sorprenderá!',
    manifesto: [
      'Aprender a observar los ritmos lentos y sabios de la naturaleza.',
      'Divulgar el conocimiento sobre las plantas de manera clara y accesible.',
      'Construir un jardín compartido donde toda duda botánica sea bienvenida.',
      'Celebrar la biodiversidad y el cuidado responsable de cada flor y hoja.'
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
        'Elaboración de abono orgánico con hojas secas'
      ],
      featuredPlant: {
        id: 'planta-monstera-adansonii',
        commonName: 'Monstera Oblicua / Adansonii',
        scientificName: 'Monstera adansonii Schott',
        category: 'Plantas de Follaje',
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
  // Solamente las publicaciones reales de Constanza Pimentel
  posts: [
    {
      id: 'post-constanza-1',
      title: '🌿 Cuaderno de la Quincena: Cómo lograr que tu orquídea vuelva a florecer año tras año',
      content: 'Muchos piensan que cuando una orquídea pierde sus flores, la planta ha terminado su ciclo. ¡Nada más lejos de la realidad! En esta entrega quincenal les comparto mi método comprobado de choque térmico nocturno y fertilización ligera balanceada para activar las varas florales durmientes sin forzar la planta.\n\nEl factor detonante es la variación de temperatura: si durante 3 a 4 semanas permites que la temperatura baje entre 4°C y 6°C por la noche, la planta recibe la señal natural de que es tiempo de emitir nuevas varas.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora & Creadora de El Jardín Secreto',
        avatar: '/wix-assets/acerca_1.jpg',
        isCurator: true
      },
      category: 'Orquídeas y Flores',
      imageUrl: 'https://images.unsplash.com/photo-1566804374972-e1c55c5e8c47?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Publicación de la Quincena',
      fortnightTag: 'Edición #24',
      likes: 48,
      views: 342,
      pinned: true,
      plantDetails: {
        scientificName: 'Orchidaceae Juss.',
        light: 'Luz indirecta abundante',
        watering: 'Inmersión cada 8 a 10 días',
        difficulty: 'Intermedio'
      },
      comments: [
        {
          id: 'c-constanza-101',
          author: 'Constanza Pimentel P.',
          avatar: '/wix-assets/acerca_1.jpg',
          createdAt: 'Nota de la Curadora',
          content: 'Recuerden que cuando la vara floral esté creciendo, no deben cambiar la orientación de la maceta respecto a la luz, o la vara crecerá torcida buscando la ventana.',
          isCurator: true
        }
      ]
    },
    {
      id: 'post-constanza-2',
      title: '🌵 La regla de oro del sustrato para suculentas: Adiós a la tierra apelmazada',
      content: 'El 80% de las suculentas no mueren por falta de cuidado, sino por exceso de humedad retenida en un sustrato inadecuado. En nuestro jardín utilizamos la regla 70/30: 70% de material drenante inorgánico (pómice, tepojal o gravilla volcánica) y solamente un 30% de tierra de hojas o humus orgánico.\n\nCon esta combinación, el agua drena en segundos y las raíces respiran libremente, evitando la pudrición incluso en épocas lluviosas.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora & Creadora de El Jardín Secreto',
        avatar: '/wix-assets/acerca_1.jpg',
        isCurator: true
      },
      category: 'Suculentas y Cactus',
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Publicación de la Quincena',
      fortnightTag: 'Edición #24',
      likes: 62,
      views: 480,
      pinned: false,
      plantDetails: {
        scientificName: 'Crassulaceae J.St.-Hil.',
        light: 'Sol directo o luz muy brillante',
        watering: 'Solo con sustrato seco al 100%',
        difficulty: 'Principiante'
      },
      comments: []
    },
    {
      id: 'post-constanza-3',
      title: '🍃 Guía de Adaptación: Cómo recibir y aclimatar una nueva planta en el hogar',
      content: 'Cuando llevamos una planta nueva a casa desde el invernadero, se enfrenta a un entorno con menos luz y menor humedad relativa. Mi consejo más importante para las dos primeras semanas:\n\n1. No la trasplantes inmediatamente: dale 14 días para habituarse a tu espacio.\n2. Ubícala en un lugar con buena iluminación natural indirecta, lejos de corrientes de aire.\n3. Riega únicamente cuando el tercio superior de la tierra esté seco al tacto.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora & Creadora de El Jardín Secreto',
        avatar: '/wix-assets/acerca_1.jpg',
        isCurator: true
      },
      category: 'Cuidado y Riego',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Publicación de la Quincena',
      fortnightTag: 'Edición #23',
      likes: 54,
      views: 390,
      pinned: false,
      plantDetails: {
        scientificName: 'Flora Doméstica',
        light: 'Luz filtrada',
        watering: 'Moderado',
        difficulty: 'Principiante'
      },
      comments: []
    },
    {
      id: 'post-constanza-4',
      title: '🌸 El valor de la paciencia botánica: Observar las cuatro estaciones en las flores',
      content: 'Cada especie tiene su propio reloj biológico. Algunas reposan en otoño e invierno para almacenar energía y regalar su mejor floración en primavera. En El Jardín Secreto honramos estos ciclos naturales cada quincena, aprendiendo a acompañar a nuestras plantas sin apresurarlas.',
      author: {
        name: 'Constanza Pimentel P.',
        role: 'Curadora & Creadora de El Jardín Secreto',
        avatar: '/wix-assets/acerca_1.jpg',
        isCurator: true
      },
      category: 'Diario Botánico',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Publicación de la Quincena',
      fortnightTag: 'Edición #23',
      likes: 39,
      views: 295,
      pinned: false,
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
      summary: 'Reina indiscutible de los interiores por sus imponentes hojas con fenestraciones naturales.',
      origin: 'Selvas de México y Centroamérica',
      light: 'Luz indirecta brillante, tolera sombra suave',
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
      summary: 'Una planta resistente y longeva. Excelente purificadora recomendada para dormitorios.',
      origin: 'África tropical occidental',
      light: 'Se adapta a todo: desde sol filtrado hasta semisombra',
      watering: 'Muy escaso (cada 2 a 3 semanas en invierno)',
      humidity: 'Baja a normal',
      difficulty: 'Principiante',
      toxicity: 'Levemente tóxica para mascotas',
      curatorNotes: 'El peor enemigo de la Sansevieria es regarla demasiado. Si dudas, espera unos días más.',
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
      watering: 'Mantener humedad constante sin encharcar (agua filtrada o reposada)',
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
      curatorNotes: 'Evita las corrientes de aire frío y no la cambies de lugar con frecuencia.',
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
      curatorNotes: 'Nunca toques sus hojas con los dedos para no remover la pruina natural que la protege.',
      tags: ['Geometría Sagrada', 'Poco Riego', 'Exterior/Ventana']
    }
  ]
};
