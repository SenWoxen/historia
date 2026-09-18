import { episodes } from './src/data/story.js'
import { characters } from './src/data/characters.js'
import { writeFileSync } from 'node:fs'

const out = []
const errs = []
const warn = []

const usedIds = new Set()

for (const ep of episodes) {
  const scenes = ep.scenes
  const names = Object.keys(scenes)

  // ---- 1. reachability dari start (BFS) ----
  const reached = new Set([ep.start])
  const queue = [ep.start]
  while (queue.length) {
    const s = queue.shift()
    for (const l of scenes[s].lines) {
      if (l.goto && !reached.has(l.goto)) {
        reached.add(l.goto)
        queue.push(l.goto)
      }
      if (l.choice) {
        for (const c of l.choice) {
          if (!scenes[c.goto]) errs.push(`${ep.id}: choice goto '${c.goto}' tidak ada (scene '${s}')`)
          if (!reached.has(c.goto)) {
            reached.add(c.goto)
            queue.push(c.goto)
          }
        }
      }
    }
  }
  for (const n of names) {
    if (!reached.has(n)) warn.push(`${ep.id}: scene '${n}' tidak terjangkau dari start`)
  }

  // ---- 2. dead-end / menuju ending (reverse BFS dari terminal) ----
  const terminal = new Set()
  const reverse = {} // target -> [sources]
  for (const n of names) reverse[n] = []
  for (const [s, scene] of Object.entries(scenes)) {
    let hasEnd = false
    for (const l of scene.lines) {
      if (l.end) {
        hasEnd = true
        break
      }
      if (l.goto) {
        reverse[l.goto].push(s)
        continue
      }
      if (l.choice) {
        for (const c of l.choice) reverse[c.goto].push(s)
        break // baris setelah choice tidak akan tercapai
      }
    }
    if (hasEnd) terminal.add(s)
  }
  const canEnd = new Set([...terminal])
  const q2 = [...terminal]
  while (q2.length) {
    const t = q2.shift()
    for (const src of reverse[t]) {
      if (!canEnd.has(src)) {
        canEnd.add(src)
        q2.push(src)
      }
    }
  }
  for (const n of names) {
    if (!canEnd.has(n)) errs.push(`${ep.id}: scene '${n}' tidak dapat mencapai ending (dead-end atau loop)`)
  }

  // ---- 3. speaker / cast valid + panjang line ----
  for (const [s, scene] of Object.entries(scenes)) {
    for (const l of scene.lines) {
      if (l.speaker) {
        usedIds.add(l.speaker)
        if (!characters[l.speaker]) errs.push(`${ep.id}/${s}: speaker '${l.speaker}' tidak terdaftar`)
      }
      if (l.cast) {
        for (const c of l.cast) {
          usedIds.add(c.id)
          if (!characters[c.id]) errs.push(`${ep.id}/${s}: cast '${c.id}' tidak terdaftar`)
        }
      }
      if (l.text) {
        usedIds.add(l.speaker || '')
        if (l.text.length > 115) warn.push(`${ep.id}/${s}: line terlalu panjang (${l.text.length}): "${l.text.slice(0, 60)}..."`)
      }
      if (l.text && /TODO|TBD|lorem|placeholder/i.test(l.text)) {
        errs.push(`${ep.id}/${s}: teks indikasi placeholder: "${l.text}"`)
      }
    }
  }
}

// ---- 4. karakter tidak terpakai ----
for (const id of Object.keys(characters)) {
  if (id !== 'narrator' && !usedIds.has(id)) {
    warn.push(`character '${id}' tidak dipakai di story mana pun`)
  }
}

out.push('=== ERRORS ===')
out.push(errs.length ? errs.join('\n') : '(none)')
out.push('')
out.push('=== WARNINGS ===')
out.push(warn.length ? warn.join('\n') : '(none)')

writeFileSync('audit-output.txt', out.join('\n'))