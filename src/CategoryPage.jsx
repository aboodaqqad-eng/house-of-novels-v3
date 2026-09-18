import { useParams, Link } from 'react-router-dom';
import { useMenu } from './context/MenuContext.jsx';
import { useLang, categoryNames } from './context/LangContext.jsx';

export default function CategoryPage() {
  const { slug } = useParams();
  const { categories, loading } = useMenu();
  const { t, lang } = useLang();

  const category = categories.find((c) => c.slug === slug);

  if (loading) return null;
  if (!category) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <p>Category not found.</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  const accent = category.accent;

  return (
    <div>
      <section style={{ borderTop: `4px solid ${accent}`, background: '#fff', padding: '64px 24px 48px', textAlign: 'center' }}>
        <p className="label" style={{ fontSize: '0.68rem', opacity: 0.55, color: 'var(--olive)' }}>House of Novéls</p>
        <h1 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: accent, marginTop: 6 }}>
          {categoryNames[category.slug]?.[lang] || category.name}
        </h1>
        {lang === 'ar' && !category.is_placeholder && (
          <p style={{ fontSize: '0.75rem', color: 'rgba(24,38,67,0.5)', marginTop: 12 }}>{t('arPending')}</p>
        )}
      </section>

      <section style={{ padding: '40px 24px 64px', maxWidth: 680, margin: '0 auto' }}>
        {category.items.map((item, i) => {
          const disabled = item.is_placeholder || item.sold_out;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                padding: '18px 0', borderBottom: i === category.items.length - 1 ? 'none' : '1px solid rgba(24,38,67,0.1)',
              }}
            >
              <div>
                <h3 className="serif" style={{ fontSize: '1.1rem', color: 'var(--navy-deep)' }}>
                  {item.name}
                  {(item.is_placeholder || item.sold_out) && (
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em',
                      textTransform: 'uppercase', color: item.sold_out ? 'rgba(24,38,67,0.4)' : 'var(--orange)',
                      marginLeft: 10, verticalAlign: 'middle',
                    }}>
                      {item.sold_out ? t('soldOut') : t('comingSoon')}
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(24,38,67,0.65)', fontStyle: 'italic', marginTop: 3 }}>{item.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="label" style={{ fontSize: '0.85rem', color: 'var(--olive)', whiteSpace: 'nowrap' }}>
                  {item.is_placeholder ? '—' : `${item.price} SAR`}
                </span>
              </div>
            </div>
          );
        })}

        {category.catering && (
          <p style={{ fontSize: '0.78rem', color: 'rgba(24,38,67,0.55)', marginTop: 28, textAlign: 'center' }}>
            Minimum 20 guests · 500 SAR minimum · 48h notice
          </p>
        )}
      </section>
    </div>
  );
}
