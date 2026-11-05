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
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
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
  // Publicaciones anónimas extensas y detalladas para el blog
  posts: [
    {
      id: 'post-1',
      title: '🌸 Guía Maestra: Cómo lograr que tu orquídea Phalaenopsis vuelva a florecer año tras año',
      content: `Muchos amantes de la jardinería sienten frustración cuando una orquídea pierde su floración inicial y pasa meses sin dar señales de nuevos brotes. Sin embargo, este período de reposo es completamente natural y marca el inicio de una nueva etapa de crecimiento vegetativo.

1. El secreto de la diferencia térmica nocturna:
En su hábitat natural, las Phalaenopsis experimentan una ligera caída en la temperatura al caer la noche (entre 4°C y 6°C menos que durante el día). Durante el otoño o principios de invierno, colocar tu orquídea cerca de una ventana bien ventilada donde perciba este fresco nocturno es el estímulo biológico exacto que despierta la yema latente para emitir una nueva vara floral.

2. El protocolo de riego por inmersión:
El error más común es regar en un calendario rígido. El verdadero indicador son las raíces visibles dentro de la maceta transparente: cuando lucen de un verde esmeralda brillante, la planta tiene suficiente agua. Cuando se tornan de un tono gris plateado opaco, es momento de hidratar. Sumerge la maceta durante 10 a 15 minutos en un recipiente con agua reposada a temperatura ambiente, deja escurrir por completo cada gota antes de devolverla a su macetero decorativo para evitar cualquier encharcamiento en la corona.

3. Sustrato y fotosíntesis radicular:
A diferencia de las plantas terrestres, las orquídeas son epífitas: sus raíces absorben luz y aire. Nunca utilices tierra regular de jardín; requieren corteza de pino de grano medio, perlita o fibra de coco que permita el paso continuo del oxígeno. Alimenta con abono específico muy diluido cada dos riegos durante su fase activa de hojas.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Flores y Cuidados',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Artículo Destacado',
      fortnightTag: 'Guía Floral',
      likes: 64,
      views: 480,
      pinned: true,
      plantDetails: {
        scientificName: 'Phalaenopsis amabilis (Orchidaceae)',
        light: 'Luz filtrada brillante sin sol directo',
        watering: 'Inmersión al tornarse raíces plateadas',
        difficulty: 'Intermedio'
      },
      comments: [
        {
          id: 'c-1',
          author: 'Lector del Jardín',
          avatar: '/logo.png',
          createdAt: 'Reciente',
          content: 'Excelente explicación. Apliqué la técnica de la ventana con fresco nocturno y ya asoma una vara con 5 botones.'
        }
      ]
    },
    {
      id: 'post-2',
      title: '💧 El arte del agua: Manual exhaustivo de hidratación para suculentas y plantas crasas',
      content: `Las plantas crasas han evolucionado a lo largo de millones de años en ecosistemas áridos, almacenando reservas hídricas en sus carnosas hojas y tallos. Curiosamente, la causa número uno de pérdida en el cultivo doméstico no es la falta de agua, sino el exceso bondadoso de riego.

1. La técnica del "empape y sequía profunda":
Olvídate de suministrar pequeñas gotas con aspersor o cucharaditas de agua. El sistema radicular de las suculentas necesita sentir un riego generoso que empape todo el cepellón, seguido inmediatamente de un drenaje absoluto y un período de sequía total hasta que el sustrato esté completamente seco de arriba a abajo. Para comprobarlo, introduce un palillo de madera hasta el fondo: si sale con la más mínima partícula húmeda adherida, espera unos días más.

2. Señales visuales que transmiten las hojas:
Aprender a leer tu suculenta es el mejor indicador. Una planta hidratada tiene hojas firmes, turgentes y compactas. Cuando comienza a necesitar agua, las hojas inferiores pierden ligeramente su brillo y se sienten blandas al tacto con sutiles arrugas longitudinales. Por el contrario, si las hojas lucen amarillentas, transparentes y caen con un ligero roce, es una alarma crítica de pudrición por asfixia radicular.

3. La mezcla de sustrato mineral:
El secreto de un cultivador reside bajo tierra. Una mezcla equilibrada debe componerse de al menos un 60% de material inorgánico (piedra pómez, perlita, grava volcánica o arena de río lavada) y sólo un 40% de materia orgánica tamizada. Las macetas de barro cocido con amplio orificio de drenaje son las mejores aliadas, pues sus paredes porosas permiten que la humedad excedente se evapore con rapidez.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Suculentas',
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Artículo de Cultivo',
      fortnightTag: 'Guía de Riego',
      likes: 82,
      views: 590,
      pinned: false,
      plantDetails: {
        scientificName: 'Crassulaceae',
        light: 'Mucha luz solar directa o indirecta brillante',
        watering: 'Solo cuando el sustrato esté 100% seco',
        difficulty: 'Principiante'
      },
      comments: []
    },
    {
      id: 'post-3',
      title: '🌿 Aclimatación y bienvenida: Cómo recibir una planta nueva en tu hogar sin causarle shock',
      content: `Llegar a casa con una planta floreciente recién adquirida es una de las mayores alegrías de un entusiasta vegetal. No obstante, el traslado desde las condiciones controladas de un vivero o invernadero hacia las corrientes de aire, humedad y luminosidad del hogar representa un cambio brusco en su equilibrio fisiológico.

1. El período de cuarentena y reposo:
Antes de mezclar tu nueva adquisición con el resto de tu colección botánica, ubícala en un espacio iluminado pero separado durante 7 a 10 días. Esta prudente cuarentena te permite inspeccionar con lupa el envés de las hojas y la unión de los peciolos en busca de pequeños visitantes indeseados (como pulgones, trips o arañuela roja) que puedan haber viajado con la maceta.

2. Por qué nunca debes trasplantar inmediatamente:
La tentación de cambiar la maceta de plástico por un tiesto de cerámica decorativo es grande, pero realizar un trasplante mientras la planta está estresada y en plena floración provoca con frecuencia la caída súbita de capullos florales y el colapso de las raíces más finas. Permite que la planta se adapte a la luz y humedad de tu hogar durante al menos tres semanas completas antes de intervenir en sus raíces.

3. Pulverización y calidad de agua:
Las plantas de follaje tropical agradecen una humedad ambiental superior al 50%. En lugar de mojar constantemente la tierra, coloca bandejas con piedras volcánicas húmedas debajo de las macetas (sin que el agua toque la base del tiesto). Utiliza siempre agua de lluvia o reposada durante 24 horas para permitir la evaporación del cloro y evitar la formación de manchas blanquecinas minerales sobre el follaje.`,
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Plantas de Casa',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Consejos Esenciales',
      fortnightTag: 'Guía de Entrada',
      likes: 51,
      views: 420,
      pinned: false,
      plantDetails: {
        scientificName: 'Ficus & Araceae',
        light: 'Claridad natural tamizada',
        watering: 'Moderado según evaporación ambiental',
        difficulty: 'Principiante'
      },
      comments: []
    }
  ],
  // 20 Especies de Flores y Plantas detalladas
  plantsEncyclopedia: [
    {
      id: 'flor-1',
      commonName: 'Orquídea Mariposa',
      scientificName: 'Phalaenopsis amabilis',
      category: 'Flores y Cuidados',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1566804374972-e1c55c5e8c47?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1eb6?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1596724803697-363c469e32a6?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1558697698-9300a84a6a99?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
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
