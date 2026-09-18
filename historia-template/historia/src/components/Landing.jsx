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

        <div className="hero-body">
          <p className="hero-kicker">Perjalanan pergerakan nasional Indonesia</p>
          <h1 className="hero-title">Historia</h1>
          <p className="hero-line">
            Dari bangku sekolah, pasar, dan ruang diskusi kecil — Pati mengajakmu
            menelusuri lahirnya kesadaran kebangsaan, sampai Sumpah Pemuda 1928.
          </p>
          <div className="hero-actions">
            <button className="btn btn-lead" onClick={() => onPlay(episodes[0].id)}>
              Mulai dari Prolog
            </button>
            <button className="btn btn-quiet" onClick={onOpenAi}>
              Tanya Pati
            </button>
            <a className="btn btn-quiet" href="#episodes">
              Lihat semua babak
            </a>
          </div>
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
