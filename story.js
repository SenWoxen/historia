/**
 * STORY DATA
 * ----------
 * This is the only file a writer needs to touch. No components, no CSS.
 *
 * An episode is a list of scenes. A scene has a background and a list of
 * lines. The engine walks the lines in order until it hits a `choice`,
 * a `goto`, or the end of the scene.
 *
 * Line shapes
 *   { speaker, text }                  a spoken (or narrated) line
 *   { speaker, text, cast: [...] }     also sets who is on stage
 *   { choice: [{ label, goto }] }      branch to another scene id
 *   { goto: 'sceneId' }                jump without asking
 *   { end: true }                      episode finished
 *
 * cast entries
 *   { id, at: 'left' | 'center' | 'right', flip?: true, dim?: true }
 *   Whoever is speaking is lit and animated as "talking"; everyone else idles.
 */

export const episodes = [
  {
    id: 'ep1',
    number: 'I',
    title: 'The Lantern Archive',
    blurb: 'A door that has not opened in three hundred years opens twice in one night.',
    accent: '#B23A2E',
    start: 'courtyard',
    scenes: {
      courtyard: {
        background: 'courtyard',
        lines: [
          { speaker: 'narrator', text: 'Rain had stopped an hour ago. The stones still remembered it.' },
          {
            speaker: 'aoi',
            text: 'The gate is unlatched.',
            cast: [{ id: 'aoi', at: 'center' }],
          },
          {
            speaker: 'ren',
            text: 'Then someone unlatched it.',
            cast: [
              { id: 'aoi', at: 'left' },
              { id: 'ren', at: 'right', flip: true },
            ],
          },
          { speaker: 'aoi', text: 'You say that like it settles anything.' },
          {
            choice: [
              { label: 'Push the gate open.', goto: 'archive' },
              { label: 'Wait and listen first.', goto: 'listen' },
            ],
          },
        ],
      },
      listen: {
        background: 'courtyard',
        lines: [
          {
            speaker: 'ren',
            text: 'Nothing. Only water leaving the roof.',
            cast: [
              { id: 'aoi', at: 'left', dim: true },
              { id: 'ren', at: 'right', flip: true },
            ],
          },
          { speaker: 'aoi', text: 'Nothing is a kind of answer. Come on.' },
          { goto: 'archive' },
        ],
      },
      archive: {
        background: 'archive',
        lines: [
          { speaker: 'narrator', text: 'Inside, the lanterns were already lit.' },
          {
            speaker: 'keeper',
            text: 'You are late by three centuries. I forgive it.',
            cast: [{ id: 'keeper', at: 'center' }],
          },
          {
            speaker: 'aoi',
            text: 'Who lit these?',
            cast: [
              { id: 'aoi', at: 'left' },
              { id: 'keeper', at: 'right', flip: true },
            ],
          },
          { speaker: 'keeper', text: 'A better question is who kept them burning.' },
          { speaker: 'narrator', text: 'Somewhere behind the shelves, a page turned on its own.' },
          { end: true },
        ],
      },
    },
  },

  {
    id: 'ep2',
    number: 'II',
    title: 'Salt and Paper Money',
    blurb: 'The harbour ledger balances perfectly, which is the problem.',
    accent: '#4C6B8A',
    start: 'harbour',
    scenes: {
      harbour: {
        background: 'harbour',
        lines: [
          { speaker: 'narrator', text: 'Low tide. The boats sat like tired animals.' },
          {
            speaker: 'ren',
            text: 'Every column adds up. Not one correction in four years.',
            cast: [{ id: 'ren', at: 'center' }],
          },
          {
            speaker: 'aoi',
            text: 'No one is that careful. Someone copied it clean.',
            cast: [
              { id: 'ren', at: 'left' },
              { id: 'aoi', at: 'right', flip: true },
            ],
          },
          {
            choice: [
              { label: 'Follow the ledger.', goto: 'warehouse' },
              { label: 'Follow the copyist.', goto: 'warehouse' },
            ],
          },
        ],
      },
      warehouse: {
        background: 'archive',
        lines: [
          {
            speaker: 'keeper',
            text: 'Both roads end at the same lamp, child.',
            cast: [{ id: 'keeper', at: 'center' }],
          },
          { speaker: 'narrator', text: 'To be continued.' },
          { end: true },
        ],
      },
    },
  },
]

export const getEpisode = (id) => episodes.find((e) => e.id === id)
