import { useCallback, useMemo, useReducer } from 'react'
import { getEpisode } from '../data/story'

/**
 * The whole engine. It owns a cursor (scene id + line index), the cast
 * currently on stage, and nothing else. Components read from it and call
 * advance() / choose().
 */

function resolve(episode, sceneId, index, cast) {
  let sid = sceneId
  let i = index
  let stage = cast
  let guard = 0

  while (guard++ < 200) {
    const scene = episode.scenes[sid]
    if (!scene) return { finished: true, sceneId: sid, index: i, cast: stage }

    const line = scene.lines[i]
    if (!line || line.end) return { finished: true, sceneId: sid, index: i, cast: stage }

    if (line.goto) {
      if (line.goto !== sid) stage = []
      sid = line.goto
      i = 0
      continue
    }

    if (line.cast) stage = line.cast
    return { finished: false, sceneId: sid, index: i, cast: stage }
  }
  return { finished: true, sceneId: sid, index: i, cast: stage }
}

function init({ episodeId }) {
  const episode = getEpisode(episodeId)
  return { episodeId, ...resolve(episode, episode.start, 0, []) }
}

function reducer(state, action) {
  const episode = getEpisode(state.episodeId)

  switch (action.type) {
    case 'advance': {
      if (state.finished) return state
      return { ...state, ...resolve(episode, state.sceneId, state.index + 1, state.cast) }
    }
    case 'choose': {
      const target = action.goto
      const cast = target === state.sceneId ? state.cast : []
      return { ...state, ...resolve(episode, target, 0, cast) }
    }
    case 'restart':
      return init({ episodeId: state.episodeId })
    default:
      return state
  }
}

export default function useStory(episodeId) {
  const [state, dispatch] = useReducer(reducer, { episodeId }, init)
  const episode = getEpisode(episodeId)

  const scene = episode.scenes[state.sceneId]
  const line = state.finished ? null : scene?.lines[state.index]

  const progress = useMemo(() => {
    if (!scene) return 1
    return state.finished ? 1 : (state.index + 1) / scene.lines.length
  }, [scene, state.index, state.finished])

  const advance = useCallback(() => dispatch({ type: 'advance' }), [])
  const choose = useCallback((goto) => dispatch({ type: 'choose', goto }), [])
  const restart = useCallback(() => dispatch({ type: 'restart' }), [])

  return {
    episode,
    scene,
    line,
    cast: state.cast,
    finished: state.finished,
    choices: line?.choice ?? null,
    progress,
    advance,
    choose,
    restart,
  }
}
