
import { MapPin, Navigation } from 'lucide-react'

const MAPS_URL =
  'https://www.google.com/maps?q=30.055785,31.222141'

const EMBED_URL =
  'https://www.google.com/maps?q=30.055785,31.222141&z=16&output=embed'

export function PracticeMap() {
  return (
    <section className="practice-map">
      <div className="practice-map__header">
        <div>
          <span className="eyebrow">FIND US</span>
          <h2>Come and visit us.</h2>
          <p>
            Find our practice and plan your journey.
            We look forward to welcoming you.
          </p>
        </div>

        <a
          className="btn btn--primary"
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={16} />
          Get directions
        </a>
      </div>

      <div className="practice-map__frame">
        <iframe
          src={EMBED_URL}
          title="MolarFixing location on Google Maps"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="practice-map__footer">
        <span>
          <MapPin size={17} />
          MolarFixing · Practice location
        </span>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps ↗
        </a>
      </div>
    </section>
  )
}
