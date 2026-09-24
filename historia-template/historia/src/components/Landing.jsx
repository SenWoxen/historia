import { backgrounds } from '../art/backgrounds'
import { episodes } from '../data/story'

const Cover = backgrounds.courtyard

export default function Landing({ onPlay, onOpenAi }) {
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
            Ikuti jejak gagasan, tokoh, dan peristiwa yang membawa Indonesia menuju 1928.
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
                Lihat Bab
              </a>
            </div>
          </div>
        </div>

        <div className="hero-hook" aria-hidden="true">
          Sebuah perjalanan
          <br />
          20 tahun menuju satu ikrar
        </div>

        <div className="hero-timeline" aria-hidden="true">
          <span className="tl-lab">1908</span>
          <span className="tl-track"><i /></span>
          <span className="tl-lab">1928</span>
        </div>

        <div className="hero-seal" aria-hidden="true">
          <span>史</span>
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

      <footer className="site-foot">
        <span>Historia — visual novel sejarah pergerakan nasional</span>
        <span>Klik atau Space untuk lanjut. Escape untuk keluar babak.</span>
      </footer>
    </div>
  )
}