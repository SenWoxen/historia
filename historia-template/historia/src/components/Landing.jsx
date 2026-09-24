import { useEffect, useRef, useState } from 'react'
import { backgrounds } from '../art/backgrounds'
import { episodes } from '../data/story'
import { learningResources } from '../data/resources'

const Cover = backgrounds.courtyard

export default function Landing({ onPlay, onOpenAi }) {
  const resourcesRef = useRef(null)
  const [resourcesIn, setResourcesIn] = useState(false)

  useEffect(() => {
    const el = resourcesRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setResourcesIn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResourcesIn(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-art">
          <Cover />
        </div>

        <p className="hero-eyebrow">Perjalanan pergerakan nasional Indonesia</p>

        <div className="hero-body">
          <div className="hero-title-wrap">
            <span className="hero-title-mark" aria-hidden="true" />
            <h1 className="hero-title">Historia</h1>
          </div>
          <p className="hero-quote">“Bangsa tidak lahir dalam satu malam.”</p>
          <p className="hero-line">
            Ikuti jejak gagasan, tokoh, dan peristiwa yang membawa perjalanan Indonesia menuju 1928.
          </p>

          <div className="hero-actions">
            <button className="btn btn-lead hero-cta" onClick={() => onPlay(episodes[0].id)}>
              Mulai Perjalanan
            </button>
            <div className="hero-actions-secondary">
              <button className="btn btn-quiet hero-ghost" onClick={onOpenAi}>
                Tanya Pati
              </button>
              <a className="btn btn-quiet hero-ghost" href="#episodes">
                Lihat Semua Bab
              </a>
            </div>
          </div>
        </div>

        <div className="hero-timeline" aria-hidden="true">
          <span className="tl-mark">
            <i className="tl-dot" />
            <span className="tl-year">1908</span>
            <span className="tl-name">Budi Utomo</span>
          </span>
          <i className="tl-seg" />
          <span className="tl-mark">
            <i className="tl-dot" />
            <span className="tl-year">1912</span>
            <span className="tl-name">Organisasi politik &amp; sosial</span>
          </span>
          <i className="tl-seg" />
          <span className="tl-mark">
            <i className="tl-dot" />
            <span className="tl-year">1928</span>
            <span className="tl-name">Sumpah Pemuda</span>
          </span>
        </div>
      </section>

      <section className="episodes" id="episodes">
        <h2 className="episodes-head">Babak</h2>
        <ul className="episode-list">
          {episodes.map((ep) => (
            <li key={ep.id} className="episode" style={{ '--accent': ep.accent }}>
              <span className="episode-num">{ep.number}</span>
              <div className="episode-body">
                <h3>{ep.title}</h3>
                <p>{ep.blurb}</p>
              </div>
              <button className="btn btn-small" onClick={() => onPlay(ep.id)}>
                Baca
              </button>
            </li>
          ))}
        </ul>
        <p className="episodes-note">
          Seluruh naskah ada di <code>src/data/story.js</code>. Tokoh sejarah
          memakai sprite NPC yang sudah tersedia; Pati adalah pemandu, bukan
          tokoh sejarah.
        </p>
      </section>

      <section className="resources" ref={resourcesRef}>
        <div className="resources-head">
          <p className="resources-kicker">Materi tambahan</p>
          <h2 className="resources-title">Pelajari Lebih Lanjut</h2>
          <p className="resources-note">
            Video dan bahan belajar dari sumber terpercaya untuk memperdalam tiap
            babak — dibuka di tab baru.
          </p>
        </div>
        <ul className={`resource-list${resourcesIn ? ' is-in' : ''}`}>
          {learningResources.map((res, i) => (
            <li key={res.id} className="res-item" style={{ '--i': i }}>
              <span className="res-num" aria-hidden="true">
                {res.num}
              </span>
              <div className="res-body">
                <h3>{res.title}</h3>
                <p className="res-desc">{res.description}</p>
                <p className="res-meta">{res.meta}</p>
              </div>
              <a className="res-link" href={res.url} target="_blank" rel="noopener noreferrer">
                {res.kind === 'video' ? 'Tonton materi' : 'Baca materi'}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="site-foot">
        <span>Historia — visual novel sejarah pergerakan nasional</span>
        <span>Klik atau Space untuk lanjut. Escape untuk keluar babak.</span>
      </footer>
    </div>
  )
}