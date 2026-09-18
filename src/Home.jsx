import { Link } from 'react-router-dom';
import { useMenu } from './context/MenuContext.jsx';
import { menuPhotos } from './data/menuPhotos.js';
import storefrontPhoto from './assets/photos/storefront.jpg';

const CHAPTER_SLUGS = ['desserts', 'coffee', 'bakery', 'signature-cakes'];

export default function Home() {
  const { categories, loading } = useMenu();

  if (loading) return null;

  const bySlug = Object.fromEntries((categories || []).map((c) => [c.slug, c]));
  const chapters = CHAPTER_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);
  const bestSellers = chapters
    .map((c) => c.items?.find((it) => it.featured && !it.is_placeholder && !it.sold_out) || c.items?.find((it) => !it.is_placeholder && !it.sold_out))
    .filter(Boolean);

  return (
    <div style={{ background: 'var(--off-white)' }}>
      <section style={{
        background: 'var(--olive)', color: 'var(--off-white)',
        padding: 'clamp(24px, 4vh, 44px) clamp(20px, 6vw, 90px)',
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap',
      }}>
        <div className="hero-text" style={{ maxWidth: 560, flex: '1 1 320px' }}>
          <p className="label" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.85, marginBottom: 10 }}>
            Maison de Pâtisserie — Riyadh, Est. 2018
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', lineHeight: 1.15, textTransform: 'uppercase' }}>
            The House of <em style={{ fontStyle: 'italic', textTransform: 'none' }}>extraordinary</em> Taste
          </h1>
        </div>

        <Link
          to="/menu"
          className="hero-photo"
          style={{
            width: 'min(220px, 100%)', flex: '0 1 220px', background: 'var(--off-white)',
            padding: 'clamp(6px, 1vw, 10px)', boxShadow: '0 14px 28px rgba(0,0,0,0.22)', textDecoration: 'none',
            margin: '0 auto',
          }}
        >
          <img
            src={storefrontPhoto}
            alt="House of Novéls storefront"
            style={{
              width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center',
              border: '1px solid var(--olive)', display: 'block',
            }}
          />
        </Link>
      </section>

      <section style={{ padding: 'clamp(36px, 6vh, 64px) clamp(20px, 6vw, 90px)', textAlign: 'center' }}>
        <p className="serif" style={{
          fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', color: 'var(--navy-deep)',
          maxWidth: 780, margin: '0 auto', lineHeight: 1.5, textTransform: 'uppercase',
        }}>
          Welcome to House of Novéls. Step inside a world of thoughtful craftsmanship, timeless elegance, and
          unforgettable flavors.
        </p>
      </section>

      <section style={{ padding: '0 clamp(20px, 6vw, 90px) clamp(40px, 7vh, 72px)' }}>
        <h2 className="serif" style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--navy-deep)', marginBottom: 'clamp(20px, 3.5vh, 32px)' }}>
          Best Sellers
        </h2>
        <div className="best-sellers-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 200px))',
          gap: 'clamp(16px, 2.5vw, 28px)', justifyContent: 'center',
        }}>
          {bestSellers.map((item) => (
            <div key={item.id}>
              {(item.photoUrl || menuPhotos[item.name]) ? (
                <img
                  src={item.photoUrl || menuPhotos[item.name]}
                  alt={item.name}
                  style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 2 }}
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1 / 1', background: 'var(--peach)', borderRadius: 2 }} />
              )}
              <p className="label" style={{ fontSize: '0.75rem', color: 'var(--navy-deep)', marginTop: 12, textAlign: 'center' }}>
                {item.name}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(24,38,67,0.65)', textAlign: 'center', marginTop: 4 }}>
                {item.is_placeholder ? '—' : `${item.price} SAR`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--sand)', padding: 'clamp(28px, 5vh, 56px) clamp(24px, 6vw, 90px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--navy-deep)', paddingBottom: 14, marginBottom: 'clamp(10px, 2vh, 18px)', flexWrap: 'wrap', gap: 10 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', color: 'var(--navy-deep)' }}>The Chapters</h2>
          <Link to="/menu" className="label" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--navy-deep)', textDecoration: 'none', borderBottom: '1px solid var(--navy-deep)' }}>
            See All Menus
          </Link>
        </div>

        <div>
          {chapters.map((c, i) => {
            const signature = c.items?.find((it) => !it.is_placeholder && !it.sold_out) || c.items?.[0];
            return (
              <Link
                key={c.slug}
                to="/menu"
                className="chapter-row"
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 14, padding: 'clamp(10px, 2vh, 18px) 8px',
                  borderBottom: '1px solid rgba(24,38,67,0.22)', textDecoration: 'none',
                }}
              >
                <span className="serif" style={{ fontSize: '0.95rem', color: 'rgba(24,38,67,0.55)', width: 22, flex: '0 0 auto' }}>
                  {['I', 'II', 'III', 'IV'][i]}
                </span>
                <span className="serif" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--navy-deep)', flex: '0 0 auto' }}>
                  {c.name}
                </span>
                <span style={{ flex: '1 1 auto', borderBottom: '1px dotted rgba(24,38,67,0.35)', margin: '0 4px 5px' }} />
                <span className="serif chapter-signature" style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(24,38,67,0.8)', whiteSpace: 'nowrap' }}>
                  {c.is_placeholder ? 'Coming Soon' : signature?.name}
                </span>
                <span className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--olive)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                  Open →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
