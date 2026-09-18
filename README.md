# Historia

A React + Vite template for browser visual novels. No backend, no build-time
content pipeline — the story is a JavaScript object a writer can edit alone.

```bash
npm install
npm run dev
```

## Structure

```
src/
  App.jsx                 landing <-> episode switch
  data/
    story.js              ← the writer's file: episodes, scenes, lines, choices
    characters.js         ← cast: names, name-plate colour, sprite + palette
  engine/
    useStory.js           cursor (scene + line), cast on stage, branching
  hooks/
    useTypewriter.js      character-by-character reveal, skip, reduced-motion
  components/
    Landing.jsx           title page + episode index
    Scene.jsx             the stage: background, cast, HUD, panel
    DialogueBox.jsx       speaker plate, typed text, continue hint
    Choices.jsx           branch buttons
  art/
    backgrounds.jsx       SVG scenes (swap for <img> any time)
    sprites.jsx           SVG characters, idle / talking states
  styles/
    base.css              tokens + buttons
    landing.css
    stage.css             stage, sprites, dialogue, choices
```

## Writing a scene

```js
{
  id: 'ep3',
  number: 'III',
  title: 'The Salt Road',
  start: 'gate',
  scenes: {
    gate: {
      background: 'harbour',
      lines: [
        { speaker: 'narrator', text: 'Dusk, and the road still warm.' },
        { speaker: 'aoi', text: 'We go on foot.', cast: [{ id: 'aoi', at: 'center' }] },
        { choice: [
            { label: 'Take the road.', goto: 'road' },
            { label: 'Take the water.', goto: 'ferry' },
        ]},
      ],
    },
  },
}
```

Line shapes: `{ speaker, text }`, `{ choice: [...] }`, `{ goto: 'sceneId' }`,
`{ end: true }`. Adding `cast` to a line changes who is on stage and stays in
effect until the next `cast`. Positions are `left`, `center`, `right`, with
optional `flip` and `dim`.

## Sprite states

The engine marks the current speaker as talking and everyone else as idle;
`sprites.jsx` and `stage.css` turn that into breathing, blinking, and mouth
movement. To use real artwork, return an `<img>` from a variant in
`sprites.jsx` — supply `idle.png` / `talking.png` and switch on the `talking`
prop. Nothing else changes.

## Controls

Click or press Space / Enter to finish a line, then again to advance.
Escape leaves the episode. `prefers-reduced-motion` disables the typewriter
and all ambient animation.
