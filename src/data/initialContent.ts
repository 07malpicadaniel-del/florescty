import { AppContentState } from '../types';

export const INITIAL_CONTENT: AppContentState = {
  lastUpdated: new Date().toISOString(),
  siteSettings: {
    siteName: 'El Jardín Secreto',
    tagline: 'Un blog dedicado a aprender y compartir sobre flores, plantas y la belleza de la naturaleza',
    welcomeText: 'Bienvenidos a El Jardín Secreto. Un blog creado para celebrar la fascinante vida de las flores y la flora que nos rodea. Aquí compartimos artículos detallados, consejos sinceros de cultivo y guías fotográficas para que tus flores prosperen con salud y armonía en tu hogar.',
    aboutStory: 'Nuestro objetivo es crear un espacio acogedor donde puedas aprender y conocer sobre flores y plantas de una manera sencilla, interesante y entretenida. En este blog encontrarás información sobre diversas especies: desde orquídeas exóticas y lirios de la paz hasta plantas de floración estacional y especies aromáticas.\n\nTe invitamos a explorar este refugio verde, despertar tu curiosidad botánica y disfrutar del ritmo paciente que la naturaleza nos enseña día a día.',
    manifesto: [
      'Aprender a observar los ritmos lentos y sabios de la naturaleza.',
      'Cuidar las flores y plantas de manera consciente y respetuosa.',
      'Compartir guías detalladas y accesibles para todos los amantes del jardín.',
      'Celebrar la belleza viva que transforma cada hogar en un santuario verde.'
    ],
    contactEmail: 'contacto@eljardinsecreto.org',
    instagram: '@eljardinsecreto.botanica'
  },
  currentEdition: {
    id: 'coleccion-botanica-principal',
    editionNumber: 1,
    cycleTitle: 'El Arte de Cultivar Orquídeas y Flores de Interior',
    subtitle: 'Colección Botánica Permanente',
    dateRange: 'Colección Viva',
    nextEditionDate: 'Actualizaciones continuas',
    editorialMessage: 'Descubre los secretos botánicos del riego, la luminosidad y el sustrato adecuado para que tus orquídeas y plantas florezcan con vigor año tras año.',
    active: true,
    highlights: [
      'Riego por inmersión sin encharcar raíces',
      'Iluminación tamizada y orientación solar ideal',
      'Sustratos aireados a base de corteza de pino',
      'Guías detalladas de más de 20 especies florales'
    ],
    featuredPlant: {
      id: 'planta-phalaenopsis',
      commonName: 'Orquídea Mariposa',
      scientificName: 'Phalaenopsis amabilis',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/orquidea-phalaenopsis.jpg',
      summary: 'Una de las orquídeas más admiradas del mundo. Con luz natural filtrada y riego por inmersión, sus varas pueden mantenerse en floración constante durante más de tres meses.',
      origin: 'Bosques tropicales y húmedos del sudeste asiático',
      light: 'Luz brillante indirecta (junto a ventanas orientadas al este)',
      watering: 'Por inmersión cada 7 a 10 días, únicamente cuando sus raíces tomen un tono gris plateado',
      humidity: 'Media a alta (agradece platos con guijarros húmedos bajo la maceta)',
      difficulty: 'Intermedio',
      toxicity: 'Completamente segura para perros y gatos (no tóxica)',
      curatorNotes: 'Las raíces de las orquídeas realizan fotosíntesis. Mantenla siempre en maceta transparente con corteza de pino.',
      tags: ['Orquídeas', 'Segura para Mascotas', 'Floración Prolongada']
    }
  },
  archivedEditions: [],
  // Publicaciones del blog
  posts: [
    {
      id: 'post-flores-conocer',
      title: '🌼 5 flores que debes conocer (y cómo cuidarlas en casa)',
      content: `Si estás empezando a llenar tu casa o tu balcón de flores, estas cinco son un excelente punto de partida. Son hermosas, fáciles de cuidar y cada una aporta una personalidad única a tu hogar.

1. Orquídea mariposa (Phalaenopsis)
Es la orquídea reina de los hogares y una de las más agradecidas: sus varas florales pueden mantenerse impecables entre dos y tres meses consecutivos.
- Luz: mucha claridad natural tamizada, sin sol directo que queme sus pétalos. Una ventana orientada al este o con cortina blanca fina es perfecta.
- Riego: cuando sus raíces se tornen de un tono gris plateado, sumerge la maceta durante diez minutos en agua tibia reposada y deja escurrir por completo.
- Secreto del cultivador: sus raíces realizan fotosíntesis, por lo que siempre deben permanecer en macetas transparentes con corteza de pino aireada.

2. Lavanda francesa (Lavandula)
Su aroma inconfundible relaja los sentidos, aporta serenidad y actúa como un repelente natural contra insectos y polillas.
- Luz: pleno sol directo, al menos 6 horas diarias en balcones, terrazas o ventanas muy iluminadas.
- Riego: moderado a escaso. Permite que el sustrato se seque por completo entre riegos; el exceso de agua es su mayor enemigo.
- Secreto del cultivador: corta las espigas justo cuando comiencen a abrir y cuélgalas boca abajo a la sombra; conservarán su fragancia durante meses.

3. Hortensia de jardín (Hydrangea)
Majestuosas esferas florales en tonalidades que van del azul cielo al rosa pastel y blanco puro.
- Luz: sol suave durante la mañana y sombra fresca por la tarde.
- Riego: abundante y constante, especialmente en los meses cálidos. El sustrato debe mantenerse fresco y húmedo, nunca encharcado.
- Secreto del cultivador: el color de sus pétalos depende del pH del suelo; los sustratos ácidos producen flores azuladas, mientras que los alcalinos dan tonos rosados.

4. Gardenia (Jazmín del Cabo)
Flores de un blanco cremoso con uno de los perfumes más embriagadores y elegantes del reino botánico.
- Luz: luz indirecta muy brillante. La radiación directa del mediodía daña sus capullos.
- Riego: regular, manteniendo la humedad ambiental alta mediante platos con piedras húmedas debajo de la maceta. Usa agua sin cal.
- Secreto del cultivador: evita corrientes de aire frío y no gires la maceta cuando tenga botones florales, o podrían caer antes de abrir.

5. Dalia pompón (Dahlia)
Geometría perfecta de pétalos superpuestos en colores vibrantes, desde lilas profundos hasta naranjas cálidos.
- Luz: requiere pleno sol para una floración vigorosa y continua.
- Riego: tres veces por semana en temporada de calor, mojando siempre el pie de la planta sin mojar las flores.
- Secreto del cultivador: retira sistemáticamente las flores marchitas para estimular la aparición inmediata de nuevos brotes.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/dalia.jpg',
      createdAt: 'Artículo Destacado',
      fortnightTag: 'Guía de Flores',
      likes: 84,
      views: 520,
      pinned: true,
      plantDetails: {
        scientificName: 'Phalaenopsis, Lavandula, Hydrangea, Gardenia, Dahlia',
        light: 'De luz tamizada a pleno sol según la especie',
        watering: 'Moderado a frecuente según la flor',
        difficulty: 'Principiante'
      },
      comments: [
        {
          id: 'c-conocer-1',
          author: 'Lector del Jardín',
          avatar: '/logo.png',
          createdAt: 'Hace un momento',
          content: 'Hermosa selección. Puse en práctica el riego por inmersión de la orquídea y los botones abrieron radiantes.'
        }
      ]
    },
    {
      id: 'post-flores-significados',
      title: '💐 Las flores y sus significados: qué decir con cada una',
      content: `Desde la época victoriana, cuando nació la «floriografía» o el lenguaje secreto de las flores, los ramos se han utilizado para transmitir emociones que las palabras a veces no logran expresar. Cada flor posee un simbolismo poético que transforma cualquier rincón o regalo en un mensaje sincero.

1. Rosa (Rosa spp.)
La flor universal de los sentimientos:
- Roja: amor apasionado, admiración profunda y devoción.
- Blanca: pureza, nuevos comienzos, paz y respeto sincero.
- Amarilla: alegría, calidez, gratitud y amistad incondicional.
- Rosada: gentileza, elegancia, cariño y agradecimiento.

2. Orquídea (Orchidaceae)
Símbolo milenario de belleza refinada, elegancia suprema y fortaleza serena. Regalar una orquídea expresa un profundo respeto hacia la persona que la recibe, reconociendo su virtud y perseverancia.

3. Peonía (Paeonia)
Conocida en la cultura oriental como la «reina de las flores», simboliza la prosperidad, la buena fortuna, el honor y la armonía matrimonial. Sus generosos pétalos representan abundancia y dicha.

4. Flor de Loto (Nelumbo nucifera)
Emerge inmaculada desde aguas pantanosas para abrirse al sol matutino. Representa la pureza espiritual, la superación de dificultades, el renacimiento interior y la serenidad mental.

5. Lavanda (Lavandula angustifolia)
Simboliza la tranquilidad, la devoción, el silencio reparador y la paz en el hogar. Un ramillete de lavanda colocado en una habitación invita a la calma y aleja las tensiones.

6. Gardenia (Gardenia jasminoides)
En el código floral clásico, la gardenia representa el amor secreto, la gracia pura y la atracción sutil que se declara con discreción y dulzura.

7. Camelia (Camellia japonica)
Con sus pétalos perfectamente dispuestos, simboliza la admiración constante, la longevidad y el cariño que permanece inalterable a través de las estaciones.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Diario de Jardín',
      imageUrl: '/flowers/peonia.jpg',
      createdAt: 'Guía Simbólica',
      fortnightTag: 'Lenguaje Floral',
      likes: 92,
      views: 640,
      pinned: false,
      plantDetails: {
        scientificName: 'Rosa, Orchidaceae, Paeonia, Nelumbo, Lavandula',
        light: 'Luz ambiental suave',
        watering: 'Según la especie',
        difficulty: 'Principiante'
      },
      comments: [
        {
          id: 'c-significados-1',
          author: 'Entusiasta Floral',
          avatar: '/logo.png',
          createdAt: 'Hace un momento',
          content: 'Qué fascinante el simbolismo de la gardenia y la peonía. Ahora elegir flores tiene mucho más sentido.'
        }
      ]
    },
    {
      id: 'post-flores-mascotas',
      title: '🐾 Flores que son malas para tus mascotas (y alternativas seguras)',
      content: `Perros y gatos exploran el mundo a través del olfato y el gusto. Cuando introducimos flores y plantas en casa, es imprescindible saber cuáles representan un peligro para su salud y cuáles podemos cultivar con absoluta tranquilidad.

1. Especies de alto riesgo que debes evitar
- Lirios verdaderos (Lilium) y Azucenas: Extremadamente tóxicos para los gatos. El simple contacto con el polen que cae en su pelaje y que luego ingieren al acicalarse, o beber el agua del florero, puede desencadenar fallo renal agudo en menos de 24 horas. Si compartes hogar con felinos, descarta completamente los lirios.
- Adelfa (Nerium oleander): Contiene glucósidos cardíacos en todas sus partes (hojas, flores y savia). Su ingestión provoca arritmias severas, vómitos y colapso circulatorio.
- Azaleas y Rododendros: Contienen grayanotoxinas que alteran el sistema nervioso y cardiovascular de perros y gatos, causando debilidad, salivación excesiva y vómito continuo.
- Bulbos de Primavera (Tulipanes, Narcisos y Amarilis): La mayor concentración de toxinas se ubica en los bulbos. Si tu perro tiene hábito de cavar, mantenlos fuera de su alcance.

2. Flores que causan molestias digestivas o irritación bucal
- Lirio de la Paz (Spathiphyllum) y Anturios: Contienen cristales insolubles de oxalato de calcio. Al morderlos, liberan microagujas que producen ardor bucal intenso, salivación profusa e hinchazón de lengua y labios.
- Hortensias: Sus flores y brotes contienen compuestos cianogénicos que suelen provocar vómitos y diarreas si son masticados.
- Begonias: Los tubérculos y tallos pueden causar irritación estomacal severa.

3. Alternativas florales 100% seguras para perros y gatos
Afortunadamente, existen especies espectaculares completamente inocuas para tus compañeros de cuatro patas:
- Orquídea Mariposa (Phalaenopsis): Totalmente no tóxica y segura.
- Violeta Africana (Saintpaulia): Segura y florece todo el año en ventanas luminosas.
- Camelia Japonesa: Belleza invernal inofensiva para animales.
- Hibisco (Rosa de China): Flores tropicales seguras para gatos y perros.
- Girasol (Helianthus annuus): Alegría pura sin ningún riesgo tóxico.

4. ¿Qué hacer ante una sospecha de ingestión?
Retira con suavidad cualquier resto vegetal de la boca de tu mascota. No intentes provocar el vómito sin indicación médica veterinaria. Toma una fotografía clara de la flor o lleva una muestra de la planta de inmediato a la clínica veterinaria para que identifiquen el principio activo y apliquen el tratamiento oportuno.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Plantas de Casa',
      imageUrl: '/flowers/lirio-paz.jpg',
      createdAt: 'Guía de Salud & Hogar',
      fortnightTag: 'Hogar y Mascotas',
      likes: 115,
      views: 780,
      pinned: false,
      plantDetails: {
        scientificName: 'Lilium, Nerium, Spathiphyllum vs Phalaenopsis, Saintpaulia',
        light: 'Luz indirecta recomendada',
        watering: 'Riego según especie segura',
        difficulty: 'Principiante'
      },
      comments: [
        {
          id: 'c-mascotas-1',
          author: 'Lector del Jardín',
          avatar: '/logo.png',
          createdAt: 'Hace un momento',
          content: 'Un artículo vital. Tenía lirios cortados en un jarrón y no sabía lo peligrosos que son para los gatos. Los cambié por orquídeas.'
        }
      ]
    }
  ],
  // 20 Especies de Flores y Plantas detalladas
  plantsEncyclopedia: [
    {
      id: 'flor-1',
      commonName: 'Orquídea Mariposa',
      scientificName: 'Phalaenopsis amabilis',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/orquidea-phalaenopsis.jpg',
      summary: 'Elegante orquídea de pétalos delicados en forma de alas de mariposa. Florece con gracia durante meses en interiores luminosos.',
      origin: 'Sudeste Asiático y Filipinas',
      light: 'Luz brillante tamizada sin sol directo',
      watering: 'Por inmersión semanal cuando las raíces se vean plateadas',
      humidity: 'Alta (50% - 70%)',
      difficulty: 'Intermedio',
      toxicity: 'No tóxica para mascotas',
      curatorNotes: 'Utiliza macetas transparentes para permitir la fotosíntesis radicular y nunca mojes el centro de la corona foliar.',
      tags: ['Orquídeas', 'Floración Larga', 'Segura para Mascotas']
    },
    {
      id: 'flor-2',
      commonName: 'Orquídea Cattleya Reina',
      scientificName: 'Cattleya labiata',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/orquidea-cattleya.jpg',
      summary: 'Conocida como la reina de las orquídeas por sus flores de gran tamaño, fragancia cautivadora y volantes ondulados en el labelo.',
      origin: 'Bosques montanos de Brasil',
      light: 'Mucha luz natural tamizada, tolera sol muy suave de primera hora',
      watering: 'Riego profundo dejando secar casi por completo el sustrato entre aplicaciones',
      humidity: 'Media a alta (60%)',
      difficulty: 'Intermedio',
      toxicity: 'No tóxica',
      curatorNotes: 'Requiere buena ventilación de aire alrededor de sus pseudobulbos para evitar la proliferación de hongos.',
      tags: ['Aromática', 'Flores Grandes', 'Orquídeas']
    },
    {
      id: 'flor-3',
      commonName: 'Orquídea Vanda Azul',
      scientificName: 'Vanda coerulea',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/orquidea-vanda.jpg',
      summary: 'Impresionante orquídea con flores en tonalidades azuladas y púrpuras. A menudo se cultiva en cestas de madera con raíces al aire.',
      origin: 'Regiones del Himalaya y Tailandia',
      light: 'Alta intensidad lumínica filtrada',
      watering: 'Pulverizaciones diarias abundantes sobre sus raíces aéreas',
      humidity: 'Muy alta (70% - 80%)',
      difficulty: 'Avanzado',
      toxicity: 'No tóxica',
      curatorNotes: 'Sus raíces desnudas requieren sumergirse a diario en agua tibia por 15 minutos si se cultiva sin sustrato.',
      tags: ['Exótica', 'Azulada', 'Orquídeas']
    },
    {
      id: 'flor-4',
      commonName: 'Lirio de la Paz',
      scientificName: 'Spathiphyllum wallisii',
      category: 'Plantas de Casa',
      imageUrl: '/flowers/lirio-paz.jpg',
      summary: 'Purificadora del aire por excelencia, regala elegantes espatas blancas que contrastan con un follaje verde oscuro brillante.',
      origin: 'Selvas tropicales de América Central y del Sur',
      light: 'Luz moderada indirecta, tolera semisombra',
      watering: 'Frecuente manteniendo el sustrato húmedo sin encharcar',
      humidity: 'Media a alta',
      difficulty: 'Principiante',
      toxicity: 'Tóxica si es ingerida por mascotas',
      curatorNotes: 'Avisa con humildad cuando tiene sed bajando levemente sus hojas; al regarla se recupera en pocas horas.',
      tags: ['Purificadora', 'Flores Blancas', 'Fácil']
    },
    {
      id: 'flor-5',
      commonName: 'Anturio Rojo (Flor de Flamenco)',
      scientificName: 'Anthurium andraeanum',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/anturio-rojo.jpg',
      summary: 'Flores de brillo ceroso en tono carmesí con un espádice central erguido. Símbolo de hospitalidad y vitalidad vegetal.',
      origin: 'Colombia y Ecuador',
      light: 'Luz brillante indirecta permanente',
      watering: 'Moderado; regar cuando el tercio superior de la tierra esté seco',
      humidity: 'Alta, agradece pulverizar solo las hojas (no la flor)',
      difficulty: 'Intermedio',
      toxicity: 'Tóxica para gatos y perros',
      curatorNotes: 'Limpia sus hojas con frecuencia para que transpiren y mantén la temperatura por encima de los 15°C.',
      tags: ['Flores Cerosas', 'Larga Duración', 'Color Vivo']
    },
    {
      id: 'flor-6',
      commonName: 'Violeta Africana',
      scientificName: 'Saintpaulia ionantha',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/violeta-africana.jpg',
      summary: 'Pequeña joya botánica de hojas afelpadas aterciopeladas y racimos de flores en tonos violetas, lilas y bicolores.',
      origin: 'Bosques nubosos de Tanzania y Kenia',
      light: 'Mucha luz indirecta en alféizares iluminados',
      watering: 'Por capilaridad desde el plato inferior con agua tibia',
      humidity: 'Media',
      difficulty: 'Principiante',
      toxicity: 'Totalmente segura para mascotas',
      curatorNotes: 'Nunca mojes sus hojas vellosas desde arriba, pues el agua fría estancada causa manchas cloróticas irreversibles.',
      tags: ['Compacta', 'Segura para Mascotas', 'Violeta']
    },
    {
      id: 'flor-7',
      commonName: 'Hortensia de Jardín',
      scientificName: 'Hydrangea macrophylla',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/hortensia.jpg',
      summary: 'Generosos pompones florales cuyo color oscila entre azul, violeta y rosa según la acidez (pH) del sustrato.',
      origin: 'Japón y este de Asia',
      light: 'Sol de mañana y sombra refrescante por la tarde',
      watering: 'Abundante en temporada de floración, necesita tierra fresca',
      humidity: 'Media a alta',
      difficulty: 'Intermedio',
      toxicity: 'Tóxica por ingestión',
      curatorNotes: 'Para conservar tonalidades azules intensas utiliza sustrato para plantas acidófilas con quelato de hierro.',
      tags: ['Exterior y Balcón', 'Pompones', 'Cambio de Color']
    },
    {
      id: 'flor-8',
      commonName: 'Peonía Silvestre',
      scientificName: 'Paeonia lactiflora',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/peonia.jpg',
      summary: 'Pétalos sedosos en capas voluptuosas con un aroma celestial dulce. Es la flor favorita de los jardines clásicos románticos.',
      origin: 'Asia Central y China',
      light: 'Pleno sol o semisombra ligera',
      watering: 'Riego profundo y espaciado evitando encharcar el cuello radicular',
      humidity: 'Media',
      difficulty: 'Intermedio',
      toxicity: 'Levemente tóxica si se ingiere',
      curatorNotes: 'No entierres demasiado sus rizomas (solo 3 a 5 cm bajo la superficie) o tardará en florecer.',
      tags: ['Fragante', 'Romántica', 'Flores Densas']
    },
    {
      id: 'flor-9',
      commonName: 'Camelia Japonesa',
      scientificName: 'Camellia japonica',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/camelia.jpg',
      summary: 'Arbusto aristocrático de follaje encerado perenne que desafía los meses fríos con flores simétricas impecables.',
      origin: 'Japón y Corea',
      light: 'Semisombra protegida de vientos secos',
      watering: 'Sustrato húmedo con agua libre de cal',
      humidity: 'Alta',
      difficulty: 'Intermedio',
      toxicity: 'No tóxica',
      curatorNotes: 'Exige suelo ácido y detesta los cambios repentinos de ubicación cuando los capullos ya están formados.',
      tags: ['Floración Invernal', 'Hojas Brillantes', 'Acidófila']
    },
    {
      id: 'flor-10',
      commonName: 'Gardenia (Jazmín del Cabo)',
      scientificName: 'Gardenia jasminoides',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/gardenia.jpg',
      summary: 'Pétalos blanco marfil de textura sedosa que despiden una de las fragancias naturales más intensas y embriagadoras del mundo.',
      origin: 'Este y sur de Asia',
      light: 'Luz brillante tamizada',
      watering: 'Riego regular con agua descalcificada a temperatura ambiente',
      humidity: 'Muy alta (65% o superior)',
      difficulty: 'Avanzado',
      toxicity: 'Tóxica para perros y gatos',
      curatorNotes: 'El agua dura con cal amarillea sus hojas. Aporta quelato de hierro una vez al mes durante primavera.',
      tags: ['Muy Aromática', 'Blanca', 'Elegante']
    },
    {
      id: 'flor-11',
      commonName: 'Ave del Paraíso',
      scientificName: 'Strelitzia reginae',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/ave-del-paraiso.jpg',
      summary: 'Escultura viviente de flores exóticas que recuerdan la cresta plumosa de un ave tropical en tonos naranja vibrante y azul cobalto.',
      origin: 'Sudáfrica',
      light: 'Mucha luz solar directa o filtrada intensa',
      watering: 'Moderado en primavera y verano, escaso durante el invierno',
      humidity: 'Media',
      difficulty: 'Intermedio',
      toxicity: 'Ligeramente tóxica por ingestión',
      curatorNotes: 'Agradece macetas profundas donde sus robustas raíces pivotantes puedan asentarse con holgura.',
      tags: ['Exótica', 'Colores Cálidos', 'Arquitectónica']
    },
    {
      id: 'flor-12',
      commonName: 'Hibisco (Rosa de China)',
      scientificName: 'Hibiscus rosa-sinensis',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/hibisco.jpg',
      summary: 'Grandes corolas acampanadas con un pistilo prominente. Cada flor abre con alegría durante un día exhibiendo colores de ensueño.',
      origin: 'Asia tropical',
      light: 'Pleno sol o máxima luminosidad de interior',
      watering: 'Frecuente en floración evitando encharcamientos',
      humidity: 'Media a alta',
      difficulty: 'Principiante',
      toxicity: 'No tóxica para mascotas',
      curatorNotes: 'Poda las ramas en primavera para estimular la aparición de nuevos brotes y capullos continuos.',
      tags: ['Tropical', 'Segura para Mascotas', 'Sol']
    },
    {
      id: 'flor-13',
      commonName: 'Jazmín de Noche Real',
      scientificName: 'Jasminum officinale',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/jazmin-real.jpg',
      summary: 'Trepadora de diminutas estrellas blancas cuyo perfume dulce y sereno se intensifica mágicamente con la brisa nocturna.',
      origin: 'Cáucaso y norte de Irán',
      light: 'Sol directo o luz indirecta abundante',
      watering: 'Moderado dejando secar levemente la superficie',
      humidity: 'Media',
      difficulty: 'Principiante',
      toxicity: 'Segura para mascotas',
      curatorNotes: 'Proporciónale una pequeña celosía o soporte para que sus delicadas guías trepadoras se enreden con libertad.',
      tags: ['Trepadora', 'Perfume Nocturno', 'Estrellas Blancas']
    },
    {
      id: 'flor-14',
      commonName: 'Buganvilla Imperial',
      scientificName: 'Bougainvillea spectabilis',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/buganvilla.jpg',
      summary: 'Cascada de brácteas fucsias y magentas de textura similar al papel que envuelven minúsculas florecillas color crema.',
      origin: 'Bosques secos de Sudamérica',
      light: 'Sol pleno y calor constante',
      watering: 'Escaso; el estrés hídrico moderado estimula mayor floración',
      humidity: 'Baja a media',
      difficulty: 'Principiante',
      toxicity: 'Savias ligeramente irritantes',
      curatorNotes: 'En maceta florece con mayor vigor cuando sus raíces están algo ajustadas en su contenedor.',
      tags: ['Resistente', 'Fucsia Brillante', 'Amante del Sol']
    },
    {
      id: 'flor-15',
      commonName: 'Magnolia Blanca Real',
      scientificName: 'Magnolia grandiflora',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/magnolia-blanca.jpg',
      summary: 'Flores ancestrales gigantescas en forma de copa blanca con un suave perfume alimonado que evoca bosques antiguos.',
      origin: 'Sureste de América del Norte',
      light: 'Sol suave o semisombra luminosa',
      watering: 'Moderado con buen drenaje orgánico',
      humidity: 'Media',
      difficulty: 'Intermedio',
      toxicity: 'No tóxica',
      curatorNotes: 'Sus raíces son carnosas y sensibles al daño mecánico; evita cavar o alterar la tierra alrededor de la base.',
      tags: ['Arbusto Noble', 'Aroma Cítrico', 'Ancestral']
    },
    {
      id: 'flor-16',
      commonName: 'Flor de Loto Sagrado',
      scientificName: 'Nelumbo nucifera',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/loto-sagrado.jpg',
      summary: 'Planta acuática milenaria de hojas hidrófobas que emergen limpias sobre el agua para abrir pétalos rosados de pureza absoluta.',
      origin: 'Asia Tropical y Australia',
      light: 'Sol pleno constante (mínimo 6 horas diarias)',
      watering: 'Acuática; sumergida en recipientes estancos de agua limpia',
      humidity: 'Alta',
      difficulty: 'Avanzado',
      toxicity: 'No tóxica',
      curatorNotes: 'Requiere sustrato arcilloso pesado en el fondo del estanque y agua templada para desplegar sus capullos.',
      tags: ['Acuática', 'Símbolo de Pureza', 'Rosa Sagrado']
    },
    {
      id: 'flor-17',
      commonName: 'Begonia de Flor',
      scientificName: 'Begonia elatior',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/begonia.jpg',
      summary: 'Floración prolífica en rosetas de tonos pastel sobre hojas asimétricas con reflejos brillantes.',
      origin: 'Híbrido de especies de los Andes',
      light: 'Luz indirecta tamizada, sensible a quemaduras de sol',
      watering: 'Sustrato apenas húmedo por la base, sin mojar hojas ni flores',
      humidity: 'Media (evitar pulverizar directamente)',
      difficulty: 'Principiante',
      toxicity: 'Tóxica para gatos y perros',
      curatorNotes: 'Retira las flores marchitas con tijeras limpias para promover la apertura de nuevos brotes.',
      tags: ['Compacta', 'Floración Continua', 'Interior']
    },
    {
      id: 'flor-18',
      commonName: 'Dalia Pompón de Verano',
      scientificName: 'Dahlia pinnata',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/dalia.jpg',
      summary: 'Geometría natural asombrosa con pétalos tubulares que forman esferas florales perfectas en un abanico multicolor.',
      origin: 'Altiplanos de México y Centroamérica',
      light: 'Pleno sol protegido del viento fuerte',
      watering: 'Riego profundo regular sin encharcar los tubérculos',
      humidity: 'Media',
      difficulty: 'Intermedio',
      toxicity: 'Levemente tóxica para mascotas',
      curatorNotes: 'Coloca tutores discretos en el tallo para soportar el peso de las cabezas florales cuando alcancen pleno tamaño.',
      tags: ['Geometría Viva', 'Colorido Intenso', 'Tubérculo']
    },
    {
      id: 'flor-19',
      commonName: 'Amarilis Real',
      scientificName: 'Hippeastrum vittatum',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/amarilis.jpg',
      summary: 'Bulbo generoso que corona el invierno con trompetas florales majestuosas en tonos escarlata, coral y blanco estriado.',
      origin: 'Regiones tropicales de Sudamérica',
      light: 'Mucha luz natural en interiores cálidos',
      watering: 'Muy poco al plantar el bulbo; aumentar cuando el tallo verde comience a erguirse',
      humidity: 'Media',
      difficulty: 'Principiante',
      toxicity: 'El bulbo es tóxico si se mastica',
      curatorNotes: 'Deja que el tercio superior del bulbo sobresalga de la tierra al plantarlo para evitar que se pudra la corona.',
      tags: ['Bulbosa', 'Trompetas Escarlatas', 'Floración de Invierno']
    },
    {
      id: 'flor-20',
      commonName: 'Lavanda Francesa',
      scientificName: 'Lavandula dentata',
      category: 'Flores y Cuidados',
      imageUrl: '/flowers/lavanda.jpg',
      summary: 'Espigas aromáticas con pequeñas coronas violáceas y hojas dentadas que desprenden un aceite esencial calmante y balsámico.',
      origin: 'Cuenca Mediterránea',
      light: 'Sol radiante directo durante todo el día',
      watering: 'Muy moderado, tolera excelente la sequía estacional',
      humidity: 'Baja a media (requiere ventilación)',
      difficulty: 'Principiante',
      toxicity: 'No tóxica en bajas cantidades',
      curatorNotes: 'Sustrato arenoso muy permeable con buen drenaje; el exceso de humedad es su único enemigo.',
      tags: ['Aromática', 'Aceites Esenciales', 'Resistente al Sol']
    }
  ]
};
