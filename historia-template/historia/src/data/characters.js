/**
 * Cast registry.
 *
 * Each character maps an id -> display name, name-plate colour, and the
 * sprite to draw. `sprite` refers to a key in src/art/sprites.jsx.
 * Add a character here and it becomes available to every episode.
 */
export const characters = {
  narrator: {
    name: '',
    color: '#C9A227',
    sprite: null,
  },
  aoi: {
    name: 'Aoi',
    color: '#B23A2E',
    sprite: 'scholar',
    palette: { robe: '#7C2C2C', trim: '#E4D3A8', hair: '#221A16', skin: '#F2D8C2' },
  },
  ren: {
    name: 'Ren',
    color: '#4C6B8A',
    sprite: 'guard',
    palette: { robe: '#2B3C57', trim: '#9FB4CC', hair: '#15181E', skin: '#EBC9AE' },
  },
  keeper: {
    name: 'The Keeper',
    color: '#6E5A8F',
    sprite: 'elder',
    palette: { robe: '#45385C', trim: '#CBB98F', hair: '#D8D2C8', skin: '#E9D5BE' },
  },
  /* PNG-based character: two frames in /public/sprites — idle.png (mouth
     closed) and openmouth.png (mouth open). The engine switches on the
     `talking` prop, so the swap happens automatically while typing. */
  histor: {
    name: 'Pati',
    color: '#C8A568',
    sprite: 'historia',
    palette: { robe: '#2B2629', trim: '#C8A568', hair: '#2B2629', skin: '#ECCABC' },
  },

  /* Historical figures — reuse the existing SVG NPC sprites (scholar /
     guard / elder). No new art assets: each entry only remaps name + plate
     colour onto an existing sprite variant. */
  wahidin: {
    name: 'Dr. Wahidin Soedirohoesodo',
    color: '#8AA859',
    sprite: 'wahidin',
    palette: { robe: '#3F4730', trim: '#C9C08A', hair: '#D8D2C8', skin: '#E9D5BE' },
  },
  tjipto: {
    name: 'Dr. Cipto Mangunkusumo',
    color: '#B0613C',
    sprite: 'tjipto',
    palette: { robe: '#6E3B2F', trim: '#E0C9A0', hair: '#2A1E18', skin: '#EFD3B8' },
  },
  tirto: {
    name: 'Tirtoadisuryo',
    color: '#3C6E71',
    sprite: 'tirto',
    palette: { robe: '#2F524F', trim: '#C7B98A', hair: '#1F2320', skin: '#EFD5B5' },
  },
  samanhudi: {
    name: 'Haji Samanhudi',
    color: '#8A6F3C',
    sprite: 'samanhudi',
    palette: { robe: '#5C4A26', trim: '#D8C48A', hair: '#E6DED0', skin: '#EAD6BE' },
  },
  tjokro: {
    name: 'H.O.S. Tjokroaminoto',
    color: '#7C4A8A',
    sprite: 'tjokro',
    palette: { robe: '#4A3052', trim: '#CBAF8F', hair: '#D5CFC4', skin: '#E9D5BE' },
  },
  dekkers: {
    name: 'E.F.E. Douwes Dekker',
    color: '#3C5A8A',
    sprite: 'dekkers',
    palette: { robe: '#2B3C57', trim: '#9FB4CC', hair: '#15181E', skin: '#EBC9AE' },
  },
  suwardi: {
    name: 'Suwardi Suryaningrat',
    color: '#5A8A3C',
    sprite: 'suwardi',
    palette: { robe: '#33502B', trim: '#C9CF9A', hair: '#201E1A', skin: '#EFD3B8' },
  },
  hatta: {
    name: 'Mohammad Hatta',
    color: '#4C6B8A',
    sprite: 'hatta',
    palette: { robe: '#2B3C57', trim: '#9FB4CC', hair: '#15181E', skin: '#EBC9AE' },
  },
  satiman: {
    name: 'Dr. Satiman Wiryosanjoyo',
    color: '#8A4A3C',
    sprite: 'satiman',
    palette: { robe: '#5C2F26', trim: '#D8C4A0', hair: '#241B16', skin: '#EFD3B8' },
  },
  karta: {
    name: 'R.A. Kartini',
    color: '#A34A6E',
    sprite: 'karta',
    palette: { robe: '#6E2F4A', trim: '#E0C0C8', hair: '#241A20', skin: '#F0D8C4' },
  },
  rohanah: {
    name: 'Rohanah Kudus',
    color: '#6E7C3C',
    sprite: 'rohanah',
    palette: { robe: '#4E5C2A', trim: '#D0C890', hair: '#221E16', skin: '#EFD5B8' },
  },
  wakil: {
    name: 'Wakil Pemuda',
    color: '#A87A3C',
    sprite: 'wakil',
    palette: { robe: '#5C4A2A', trim: '#C9AE8A', hair: '#1E1C18', skin: '#EBC9AE' },
  },
  wakilwanita: {
    name: 'Wakil Perempuan',
    color: '#8A5A7A',
    sprite: 'scholar',
    palette: { robe: '#5C2F4A', trim: '#D0B0C0', hair: '#241820', skin: '#F0D8C4' },
  },
}

export const getCharacter = (id) => characters[id] ?? characters.narrator
