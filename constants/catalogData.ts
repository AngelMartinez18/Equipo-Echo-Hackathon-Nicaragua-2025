export const bailes = [
  {
    nombre: 'Gueguense',
    imagen: require('../assets/Gueguense.jpg'),
    shortDescription: 'Danza satírica y folklórica representativa de Nicaragua.',
    youtubeLink: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'bailes', index: 0 },
    duration: '8 min',
    format: 'Video'
  },
  {
    nombre: 'Palo de mayo',
    imagen: require('../assets/PalodeMayo.jpg'),
    shortDescription: 'Baile tradicional de celebración en la costa caribeña.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'bailes', index: 1 },
    duration: '6 min',
    format: 'Video'
  },
  {
    nombre: 'Toro huaco',
    imagen: require('../assets/ToroHuaco.jpg'),
    shortDescription: 'Danza ritual con máscaras y trajes típicos.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'bailes', index: 2 },
    duration: '10 min',
    format: 'Video'
  },
]

export const cuentos = [
  {
    nombre: 'El pájaro azul',
    imagen: require('../assets/ElPajaroAzul.jpg'),
    description: 'Parábola corta sobre...',
    shortDescription: 'Un pájaro que trae enseñanzas para los niños.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'cuentos', index: 0 },
    duration: '15 min',
    format: 'Texto'
  },
  {
    nombre: 'La princesa',
    imagen: require('../assets/image 23.png'),
    description: 'Cuento tradicional...',
    shortDescription: 'Leyenda sobre una princesa y una prueba de valor.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'cuentos', index: 1 },
    duration: '12 min',
    format: 'Texto'
  },
  {
    nombre: 'El padre sin cabeza',
    imagen: require('../assets/ElPadreSinCabeza.jpg'),
    description: 'Historia de leyenda...',
    shortDescription: 'Relato folclórico con elementos sobrenaturales.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'cuentos', index: 2 },
    duration: '20 min',
    format: 'Texto'
  },
]

export const comidas = [
  {
    nombre: 'Nacatamal',
    imagen: require('../assets/Nacatamal.jpg'),
    shortDescription: 'Plato tradicional a base de maíz y carne.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'comidas', index: 0 },
    duration: '—',
    format: 'Receta'
  },
  {
    nombre: 'Vigorón',
    imagen: require('../assets/Vigoron.jpg'),
    shortDescription: 'Ensalada típica servida en hoja de platano.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'comidas', index: 1 },
    duration: '—',
    format: 'Receta'
  },
  {
    nombre: 'Indio Viejo',
    imagen: require('../assets/IndioViejo.png'),
    shortDescription: 'Guiso tradicional hecho con carne y tomate.',
    youtubeLink: '',
    areaPath: '/vista/[category]/[index]',
    areaParams: { category: 'comidas', index: 2 },
    duration: '—',
    format: 'Receta'
  },
]

export type CatalogItem = {
  nombre: string
  imagen: any
  description?: string
  shortDescription?: string
  youtubeLink?: string
  areaPath?: string
  areaParams?: Record<string, any>
  duration?: string
  format?: string
}
