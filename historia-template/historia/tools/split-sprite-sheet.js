import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const DEFAULT_OUTPUT = path.join('public', 'sprites', 'generated')

function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    input: null,
    outputDir: DEFAULT_OUTPUT,
    prefix: '',
    padding: 8,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--input' || arg === '-i') {
      options.input = args[++i]
    } else if (arg === '--output-dir' || arg === '-o') {
      options.outputDir = args[++i]
    } else if (arg === '--prefix' || arg === '-p') {
      options.prefix = args[++i]
    } else if (arg === '--padding') {
      options.padding = parseInt(args[++i], 10)
    } else if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    }
  }

  if (!options.input) {
    console.error('Error: --input is required')
    printHelp()
    process.exit(1)
  }

  return options
}

function printHelp() {
  console.log(`
Historia Character Sheet Splitter
Usage:
  node tools/split-sprite-sheet.js --input <path> [options]

Options:
  --input, -i        Path to character sheet image (required)
  --output-dir, -o   Output directory (default: ${DEFAULT_OUTPUT})
  --prefix, -p       Filename prefix for output files
  --padding          Crop padding in pixels (default: 8)
  --help, -h         Show this help

Example:
  node tools/split-sprite-sheet.js --input wahidin-sheet.png --prefix wahidin
`)
}

function getBoundsFromAlpha(data, width, height, channels) {
  let top = height
  let bottom = 0
  let left = width
  let right = 0
  let found = false

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alphaIndex = (y * width + x) * channels + (channels - 1)
      const alpha = data[alphaIndex]
      if (alpha > 0) {
        found = true
        if (y < top) top = y
        if (y > bottom) bottom = y
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }

  if (!found) return null
  return { top, bottom, left, right }
}

async function getCroppedBounds(imagePath, cropLeft, cropTop, cropWidth, cropHeight, padding) {
  const raw = await sharp(imagePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true })

  const channels = raw.channels || 4
  const bounds = getBoundsFromAlpha(raw.data, cropWidth, cropHeight, channels)
  if (!bounds) return null

  return {
    top: Math.max(0, bounds.top - padding),
    bottom: Math.min(cropHeight - 1, bounds.bottom + padding),
    left: Math.max(0, bounds.left - padding),
    right: Math.min(cropWidth - 1, bounds.right + padding),
  }
}

async function splitSpriteSheet(options) {
  const { input, outputDir, prefix, padding } = options

  if (!fs.existsSync(input)) {
    throw new Error(`Input file not found: ${input}`)
  }

  const inputExt = path.extname(input)
  const allowedExts = ['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp']
  if (!allowedExts.includes(inputExt.toLowerCase())) {
    throw new Error(`Unsupported format: ${inputExt}. Use PNG with transparency if possible.`)
  }

  const metadata = await sharp(input).metadata()
  const sheetWidth = metadata.width
  const sheetHeight = metadata.height

  if (sheetWidth < 2) {
    throw new Error('Image width is too small to contain two sprites side by side')
  }

  const halfWidth = Math.floor(sheetWidth / 2)

  console.log(`Input: ${input}`)
  console.log(`Dimensions: ${sheetWidth}x${sheetHeight}`)
  console.log(`Split mode: vertical (left=idle, right=talking)`)
  console.log(`Half width: ${halfWidth}px`)
  console.log(`Has alpha: ${metadata.hasAlpha}`)

  const leftBoundsCropped = await getCroppedBounds(input, 0, 0, halfWidth, sheetHeight, padding)
  const rightBoundsCropped = await getCroppedBounds(input, halfWidth, 0, sheetWidth - halfWidth, sheetHeight, padding)

  if (!leftBoundsCropped) {
    throw new Error('No content found in left half (idle) of character sheet')
  }
  if (!rightBoundsCropped) {
    throw new Error('No content found in right half (talking) of character sheet')
  }

  console.log(`Left bounds:  top=${leftBoundsCropped.top}, bottom=${leftBoundsCropped.bottom}, left=${leftBoundsCropped.left}, right=${leftBoundsCropped.right}`)
  console.log(`Right bounds: top=${rightBoundsCropped.top}, bottom=${rightBoundsCropped.bottom}, left=${rightBoundsCropped.left}, right=${rightBoundsCropped.right}`)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`Created output directory: ${outputDir}`)
  }

  const prefixStr = prefix ? `${prefix}-` : ''

  const idleOutput = path.join(outputDir, `${prefixStr}idle.png`)
  const talkingOutput = path.join(outputDir, `${prefixStr}openmouth.png`)

  await sharp(input)
    .extract({
      left: leftBoundsCropped.left,
      top: leftBoundsCropped.top,
      width: leftBoundsCropped.right - leftBoundsCropped.left + 1,
      height: leftBoundsCropped.bottom - leftBoundsCropped.top + 1,
    })
    .png()
    .toFile(idleOutput)

  await sharp(input)
    .extract({
      left: halfWidth + rightBoundsCropped.left,
      top: rightBoundsCropped.top,
      width: rightBoundsCropped.right - rightBoundsCropped.left + 1,
      height: rightBoundsCropped.bottom - rightBoundsCropped.top + 1,
    })
    .png()
    .toFile(talkingOutput)

  const idleMeta = await sharp(idleOutput).metadata()
  const talkingMeta = await sharp(talkingOutput).metadata()

  console.log('\nOutput files:')
  console.log(`  ${idleOutput} (${idleMeta.width}x${idleMeta.height})`)
  console.log(`  ${talkingOutput} (${talkingMeta.width}x${talkingMeta.height})`)

  return {
    idle: idleOutput,
    talking: talkingOutput,
    idleSize: { width: idleMeta.width, height: idleMeta.height },
    talkingSize: { width: talkingMeta.width, height: talkingMeta.height },
  }
}

async function main() {
  try {
    const options = parseArgs()
    const result = await splitSpriteSheet(options)
    console.log('\nDone.')
    process.exit(0)
  } catch (err) {
    console.error(`\nError: ${err.message}`)
    process.exit(1)
  }
}

main()
