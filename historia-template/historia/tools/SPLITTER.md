# Historia Character Sheet Splitter

Tool untuk memisahkan character sheet menjadi dua sprite PNG: idle dan openmouth.

## Prasyarat

- Node.js 18+
- Dependencies sudah terinstall (`sharp`)

## Cara Pakai

```bash
node tools/split-sprite-sheet.js --input <path-to-sheet> [options]
```

### Options

| Flag | Deskripsi | Default |
|------|-----------|---------|
| `--input, -i` | Path ke character sheet image | **required** |
| `--output-dir, -o` | Folder output | `public/sprites/generated/` |
| `--prefix, -p` | Prefix untuk nama file output | `` |
| `--padding` | Padding crop dalam pixels | `8` |
| `--help, -h` | Tampilkan bantuan | — |

### Contoh

```bash
# Basic usage
node tools/split-sprite-sheet.js --input wahidin-sheet.png --prefix wahidin

# Custom output directory
node tools/split-sprite-sheet.js --input karta-sheet.png -o public/sprites/characters -p karta --padding 12
```

### Output

```
public/sprites/generated/
├── wahidin-idle.png
└── wahidin-openmouth.png
```

## Format Input yang Diharapkan

- **Layout:** Horizontal split — kiri = idle (mulut tertutup), kanan = talking (mulut terbuka)
- **Background:** Transparan (PNG dengan alpha channel) direkomendasikan
- **Ukuran:** Bebas, script akan otomatis crop sesuai bounding box karakter
- **Kualitas:** Jangan di-resize atau di-filter sebelum masuk ke script

## Catatan

- Script hanya memotong; tidak mengubah desain, warna, atau kualitas gambar
- Jika background tidak transparan, crop akan mengikuti area non-transparan
- Script akan otomatis membuat folder output jika belum ada
- File sprite Pati yang ada tidak akan disentuh
