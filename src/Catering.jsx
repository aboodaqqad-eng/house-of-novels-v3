import { Link } from 'react-router-dom';
import { useMenu } from './context/MenuContext.jsx';
import celebrationsPhoto from './assets/menu-photos/dark-chocolate.jpg';
import corporatePhoto from './assets/photos/bread-shelf.jpg';
import bespokePhoto from './assets/menu-photos/pistachio-raspberry.jpg';

const cards = [
  {
    eyebrow: 'Celebrations',
    title: 'Birthdays & Weddings',
    desc: 'Tiered signature cakes, dessert tables, and boxed favours for guests.',
    photo: celebrationsPhoto,
  },
  {
    eyebrow: 'Corporate',
    title: 'Offices & Openings',
    desc: 'Morning bakery platters and coffee service delivered across Riyadh.',
    photo: corporatePhoto,
  },
  {
    eyebrow: 'Bespoke',
    title: 'Written to Order',
    desc: 'A menu composed with you, from flavour profile to packaging.',
    photo: bespokePhoto,
  },
];

export default function Catering() {
  const { categories, loading } = useMenu();
  const catering = categories.find((c) => c.slug === 'catering');
  const minGuests = catering?.catering?.minGuests ?? 20;
  const minSAR = catering?.catering?.minSAR ?? 500;
  const noticeHours = catering?.catering?.noticeHours ?? 48;

  if (loading) return null;

  return (
    <div style={{ padding: 'clamp(28px, 5vh, 64px) clamp(20px, 5vw, 70px)', maxWidth: 1200, margin: '0 auto' }}>
      <p className="label" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--olive)', marginBottom: 14 }}>
        Events Catering
      </p>
      <h1 className="serif" style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', color: 'var(--navy-deep)', lineHeight: 1.1, maxWidth: 620 }}>
        Chapters written for your occasion.
      </h1>
      <p style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', color: 'rgba(24,38,67,0.75)', marginTop: 18, maxWidth: 640, lineHeight: 1.6 }}>
        We work with the city&rsquo;s cafés, restaurants, and hotels. Tell us the date, the guest count, and the moment,
        and we compose the dessert table around it.
      </p>

      <div className="catering-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginTop: 'clamp(24px, 4vh, 44px)' }}>
        {cards.map((c) => (
          <div key={c.title} style={{ border: '1px solid rgba(24,38,67,0.14)', borderRadius: 4, overflow: 'hidden' }}>
            <img
              src={c.photo}
              alt={c.title}
              style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: 'clamp(18px, 2.4vw, 26px)' }}>
              <p className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--olive)', marginBottom: 10 }}>
                {c.eyebrow}
              </p>
              <h3 className="serif" style={{ fontSize: '1.3rem', color: 'var(--navy-deep)', marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(24,38,67,0.65)', lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 'clamp(18px, 3vh, 28px)', border: '1px solid rgba(24,38,67,0.14)', borderRadius: 4,
          padding: 'clamp(18px, 2.4vw, 26px)', display: 'flex', flexWrap: 'wrap', gap: 18,
          alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--navy-deep)' }}>
            Enquiries open daily, 8:00 — 23:00
          </p>
          <p className="label" style={{ fontSize: '0.68rem', color: 'rgba(24,38,67,0.55)', marginTop: 6 }}>
            Riyadh, Saudi Arabia · Minimum {minGuests} guests · {minSAR} SAR minimum · {noticeHours}h notice
          </p>
        </div>
        <Link
          to="/menu"
          className="label"
          style={{
            background: 'var(--olive)', color: 'var(--off-white)', borderRadius: 999,
            padding: '13px 28px', fontSize: '0.78rem', textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Browse the Menus
        </Link>
      </div>
    </div>
  );
}
