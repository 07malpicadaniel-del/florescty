import { AppContentState } from '../types';

export const INITIAL_CONTENT: AppContentState = {
  lastUpdated: new Date().toISOString(),
  siteSettings: {
    siteName: 'El Jardín Secreto',
    tagline: 'Aprende y comparte sobre la naturaleza cada dos semanas',
    welcomeText: 'Bienvenidos al mundo de las plantas. Aquí, celebramos la importancia de la flora en nuestro planeta, ya que las plantas no solo nos proporcionan oxígeno y alimento, sino que también embellecen nuestro entorno y mantienen el equilibrio de la naturaleza. Nuestra misión es ofrecerte un espacio donde puedas aprender sobre la diversidad vegetal de manera sencilla y entretenida. Cada dos semanas, actualizaremos nuestra página con información sobre nuevas especies y consejos para su cuidado. ¡Únete a nosotros en esta emocionante aventura verde!',
    aboutStory: 'Nuestro objetivo es crear un espacio donde puedas aprender y conocer más sobre las plantas de una manera sencilla, interesante y entretenida. Cada dos semanas, nuestra página se actualizará con información sobre nuevas especies, desde pequeñas plantas ornamentales hasta árboles, flores y plantas exóticas que quizás nunca hayas conocido. Además, podrás descubrir sus principales características, su origen, los lugares donde crecen y algunos consejos para mantenerlas saludables.\n\nTe invitamos a explorar este fascinante mundo verde, a despertar tu curiosidad y a descubrir todo lo que la naturaleza tiene para ofrecernos. ¡Acompáñanos cada quincena y conoce una nueva planta que te sorprenderá!',
    manifesto: [
      'Aprender a observar los ritmos lentos y sabios de la naturaleza.',
      'Aprender sobre las plantas de manera clara y sencilla.',
      'Compartir consejos prácticos para que tus flores y hojas crezcan sanas.',
      'Cuidar y respetar la vida de cada ejemplar en el hogar.'
    ],
    contactEmail: 'contacto@eljardinsecreto.org',
    instagram: '@eljardinsecreto.botanica'
  },
  currentEdition: {
    id: 'edicion-quincenal-activa',
    editionNumber: 24,
    cycleTitle: 'El Cuidado de las Orquídeas y Plantas de Interior',
    subtitle: 'Quincena del 1 al 15 de Noviembre',
    dateRange: '01 Nov – 15 Nov',
    nextEditionDate: '16 de Noviembre',
    editorialMessage: 'En esta quincena nos enfocamos en aprender a regar y cuidar las flores en casa. Descubriremos cómo mantener la humedad adecuada para que tus orquídeas den flores sanas y duraderas.',
    active: true,
    highlights: [
      'Cómo regar las orquídeas por inmersión sin encharcar',
      'Mezcla ligera de tierra para plantas de hojas grandes',
      'Consejos sencillos para hojas verdes y brillantes',
      'Nueva entrega de cuidados cada dos semanas'
    ],
    featuredPlant: {
      id: 'planta-quincena-phalaenopsis',
      commonName: 'Orquídea Mariposa',
      scientificName: 'Phalaenopsis amabilis',
      category: 'Flores y Cuidados',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
      summary: 'Una flor elegante y duradera. Con luz natural suave y riego adecuado, sus flores blancas y púrpuras pueden mantenerse hermosas hasta tres meses.',
      origin: 'Bosques templados y húmedos',
      light: 'Luz brillante natural sin sol directo',
      watering: 'Por inmersión cada 7 a 10 días cuando las raíces se vean plateadas',
      humidity: 'Media a alta (agradece pulverizar sus hojas con agua reposada)',
      difficulty: 'Intermedio',
      toxicity: 'Segura para mascotas (no tóxica)',
      curatorNotes: 'El secreto está en las raíces: utiliza macetas transparentes y corteza de pino para que respiren bien.',
      tags: ['Flores Duraderas', 'Segura para Mascotas', 'Interior']
    }
  },
  archivedEditions: [
    {
      id: 'edicion-quincenal-anterior',
      editionNumber: 23,
      cycleTitle: 'Sustratos Ligeros y Riego de Otoño',
      subtitle: 'Quincena del 16 al 31 de Octubre',
      dateRange: '16 Oct – 31 Oct',
      nextEditionDate: '01 de Noviembre',
      editorialMessage: 'Al cambiar el clima, las plantas beben menos agua. Es el momento perfecto para espaciar los riegos y cuidar las raíces.',
      active: false,
      highlights: [
        'Ajuste de riego con el cambio de temperatura',
        'Cuidado de hojas de monstera',
        'Abono natural casero'
      ],
      featuredPlant: {
        id: 'planta-monstera-adansonii',
        commonName: 'Monstera de Hojas Caladas',
        scientificName: 'Monstera adansonii',
        category: 'Plantas de Casa',
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
        summary: 'Famosa por sus hojas perforadas de forma natural. Crece con vigor si tiene un soporte o guía para trepar.',
        origin: 'Zonas cálidas y verdes',
        light: 'Luz suave indirecta',
        watering: 'Cuando la parte superior de la tierra esté seca',
        humidity: 'Media',
        difficulty: 'Principiante',
        toxicity: 'Mantener fuera del alcance de perros y gatos',
        curatorNotes: 'Limpia sus hojas con un paño húmedo para que absorban bien la luz.',
        tags: ['Trepadora', 'Hojas Verdes', 'Fácil Cuidado']
      }
    }
  ],
  // Publicaciones anónimas con lenguaje sencillo
  posts: [
    {
      id: 'post-1',
      title: '🌿 Cómo lograr que tu orquídea vuelva a dar flores cada temporada',
      content: 'Muchas personas piensan que cuando una orquídea pierde sus flores ya no volverá a florecer, pero esto no es así. Para ayudarla, colócala cerca de una ventana bien iluminada y permite que por las noches el ambiente esté ligeramente más fresco. Esa pequeña diferencia de temperatura estimula el crecimiento de nuevas varas florales.',
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Flores y Cuidados',
      imageUrl: 'https://images.unsplash.com/photo-1566804374972-e1c55c5e8c47?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Esta quincena',
      fortnightTag: 'Edición #24',
      likes: 38,
      views: 290,
      pinned: true,
      plantDetails: {
        scientificName: 'Orchidaceae',
        light: 'Mucha luz sin sol directo',
        watering: 'Inmersión cada 8 días',
        difficulty: 'Intermedio'
      },
      comments: [
        {
          id: 'c-1',
          author: 'Lector del Jardín',
          avatar: '/logo.png',
          createdAt: 'Ayer',
          content: 'Hice la prueba alejándola de la calefacción y ya asoma una nueva vara floral.'
        }
      ]
    },
    {
      id: 'post-2',
      title: '🌵 La regla sencilla del riego para suculentas',
      content: 'La mayoría de las suculentas no necesitan mucha agua. Su secreto es dejar que la tierra se seque por completo entre cada riego. Si tocas la tierra con el dedo y todavía se siente húmeda, espera unos días más antes de regar.',
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Suculentas',
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Esta quincena',
      fortnightTag: 'Edición #24',
      likes: 45,
      views: 310,
      pinned: false,
      plantDetails: {
        scientificName: 'Crassulaceae',
        light: 'Sol o luz muy brillante',
        watering: 'Solo con tierra seca',
        difficulty: 'Principiante'
      },
      comments: []
    },
    {
      id: 'post-3',
      title: '🍃 Cómo recibir una planta nueva en tu hogar',
      content: 'Cuando traes una maceta nueva a casa, dale dos semanas para acostumbrarse al nuevo espacio antes de trasplantarla. Colócala en un rincón con buena claridad natural y riega con moderación.',
      author: {
        name: 'Cultivador Anónimo',
        avatar: '/logo.png'
      },
      category: 'Plantas de Casa',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      createdAt: 'Quincena anterior',
      fortnightTag: 'Edición #23',
      likes: 29,
      views: 215,
      pinned: false,
      plantDetails: {
        scientificName: 'Ficus',
        light: 'Claridad natural',
        watering: 'Moderado',
        difficulty: 'Principiante'
      },
      comments: []
    }
  ],
  plantsEncyclopedia: [
    {
      id: 'enc-1',
      commonName: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      category: 'Plantas de Casa',
      imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      summary: 'Famosa por sus grandes hojas verdes con recortes naturales. Aporta vida y frescura a cualquier habitación.',
      origin: 'Bosques cálidos',
      light: 'Buena luz sin sol directo',
      watering: 'Moderado (cuando la tierra esté seca al tacto)',
      humidity: 'Media',
      difficulty: 'Principiante',
      toxicity: 'Evitar que las mascotas la mastiquen',
      curatorNotes: 'Limpia el polvo de sus hojas de vez en cuando con un trapo suave humedecido con agua.',
      tags: ['Hojas Grandes', 'Fácil Cuidado', 'Interior']
    },
    {
      id: 'enc-2',
      commonName: 'Orquídea Mariposa',
      scientificName: 'Phalaenopsis',
      category: 'Flores y Cuidados',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
      summary: 'Flores de colores suaves que florecen por semanas. Ideal para colocar sobre mesas iluminadas.',
      origin: 'Zonas templadas y húmedas',
      light: 'Luz natural suave',
      watering: 'Por inmersión cada semana',
      humidity: 'Alta',
      difficulty: 'Intermedio',
      toxicity: 'Segura para mascotas',
      curatorNotes: 'Las raíces verdes indican que está hidratada; cuando se ven grisáceas, es momento de regar.',
      tags: ['Flores', 'Segura para Mascotas', 'Color']
    },
    {
      id: 'enc-3',
      commonName: 'Espada de San Jorge (Sansevieria)',
      scientificName: 'Dracaena trifasciata',
      category: 'Plantas de Casa',
      imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
      summary: 'Una planta sumamente resistente que tolera bien la falta de agua y ayuda a purificar el aire.',
      origin: 'África occidental',
      light: 'Tolera tanto buena luz como rincones con poca luz',
      watering: 'Muy poco (cada dos o tres semanas)',
      humidity: 'Normal',
      difficulty: 'Principiante',
      toxicity: 'No comestible para mascotas',
      curatorNotes: 'Es una de las plantas más fáciles de cuidar: si tienes dudas, no la riegues.',
      tags: ['Muy Resistente', 'Poco Riego', 'Dormitorio']
    },
    {
      id: 'enc-4',
      commonName: 'Rosa de Alabastro (Suculenta Echeveria)',
      scientificName: 'Echeveria elegans',
      category: 'Suculentas',
      imageUrl: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
      summary: 'Forma una roseta en forma de flor con tonos azulados y plateados que decoran ventanas y repisas.',
      origin: 'Zonas secas y soleadas',
      light: 'Mucha luz de sol',
      watering: 'Poco, solo cuando la tierra esté seca',
      humidity: 'Baja',
      difficulty: 'Principiante',
      toxicity: 'Completamente inofensiva',
      curatorNotes: 'Evita mojar el centro de la roseta al regar para que no se acumule agua.',
      tags: ['Suculenta', 'Sol', 'Decorativa']
    }
  ]
};
