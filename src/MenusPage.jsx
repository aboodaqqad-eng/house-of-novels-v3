import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from './context/MenuContext.jsx';
import { useLang, categoryNames } from './context/LangContext.jsx';
import { arabicMenu } from './data/arabicMenu.js';
import { menuPhotos } from './data/menuPhotos.js';

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const CHAPTER_SLUGS = ['desserts', 'coffee', 'bakery', 'signature-cakes'];

export default function MenusPage() {
  const { categories, loading } = useMenu();
  const { t, lang } = useLang();
  const [activeSlug, setActiveSlug] = useState(null);
  const sidebarRef = useRef(null);
  const dragState = useRef({ down: false, moved: false, startX: 0, startScroll: 0 });

  const onSidebarPointerDown = (e) => {
    const el = sidebarRef.current;
    if (!el) return;
    dragState.current = { down: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onSidebarPointerMove = (e) => {
    const st = dragState.current;
    const el = sidebarRef.current;
    if (!st.down || !el) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 4) st.moved = true;
    el.scrollLeft = st.startScroll - dx;
  };
  const endSidebarDrag = () => {
    dragState.current.down = false;
  };
  const onSidebarButtonClick = (slug) => (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      dragState.current.moved = false;
      return;
    }
    setActiveSlug(slug);
  };

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const menuCategories = CHAPTER_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);
  const active = menuCategories.find((c) => c.slug === activeSlug) || menuCategories[0];

  useEffect(() => {
    if (menuCategories.length && !activeSlug) setActiveSlug(menuCategories[0].slug);
  }, [menuCategories.length]);

  if (loading) return null;
  if (menuCategories.length === 0 || !active) return null;

  const activeIdx = menuCategories.findIndex((c) => c.slug === active.slug);
  const signature = active.items.find((it) => !it.is_placeholder && !it.sold_out) || active.items[0];
  const restItems = active.items.filter((it) => it.id !== signature?.id);

  const renderItem = (item, compact) => {
    const ar = arabicMenu[item.name];
    const nameAr = item.nameAr || ar?.nameAr;
    const photo = item.photoUrl || menuPhotos[item.name];
    return (
      <div key={item.id} style={{ display: 'flex', gap: 12, padding: compact ? '9px 0' : '0', borderBottom: compact ? '1px solid rgba(24,38,67,0.08)' : 'none' }}>
        {photo ? (
          <img
            src={photo}
            alt={item.name}
            style={{ width: 56, height: 56, borderRadius: 4, objectFit: 'cover', flex: '0 0 auto', border: '1px solid rgba(24,38,67,0.12)' }}
          />
        ) : (
          <div style={{ width: 56, height: 56, borderRadius: 4, background: 'rgba(24,38,67,0.06)', border: '1px solid rgba(24,38,67,0.12)', flex: '0 0 auto' }} />
        )}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h3 className="serif" style={{ fontSize: compact ? '0.98rem' : '1.15rem', fontWeight: 700, color: 'var(--navy-deep)', flex: '0 0 auto' }}>
              {item.name}
            </h3>
            <span style={{ flex: '1 1 auto', borderBottom: '1px dotted rgba(24,38,67,0.25)', margin: '0 4px 4px' }} />
            <span className="label" style={{ fontSize: '0.85rem', color: '#000', flex: '0 0 auto' }}>
              {item.is_placeholder ? '—' : `${item.price} SAR`}
            </span>
          </div>
          {(item.is_placeholder || item.sold_out) && (
            <span className="label" style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
              color: item.sold_out ? 'rgba(24,38,67,0.4)' : 'var(--orange)',
            }}>
              {item.sold_out ? t('soldOut') : t('comingSoon')}
            </span>
          )}
          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(24,38,67,0.65)', marginTop: 3, lineHeight: 1.35 }}>
            {item.description}
          </p>
          {nameAr && (
            <p className="serif" dir="rtl" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(24,38,67,0.55)', marginTop: 4, textAlign: 'right' }}>
              {nameAr}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 'clamp(18px, 3vh, 30px) clamp(20px, 5vw, 70px) clamp(20px, 3vh, 40px)', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 'clamp(16px, 2.6vh, 26px)' }}>
        <div>
          <p className="label" style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--olive)', marginBottom: 8 }}>
            La Carte — Riyadh
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', color: 'var(--navy-deep)' }}>
            Four menus, <em style={{ fontStyle: 'italic' }}>baked daily</em>.
          </h1>
        </div>
        <p className="menu-intro-desc" style={{ fontSize: '0.78rem', color: 'rgba(24,38,67,0.6)', maxWidth: 320, lineHeight: 1.5, textAlign: 'right' }}>
          Each chapter is baked fresh each morning. Prices in Saudi Riyal, service included.
        </p>
      </div>

      {lang === 'ar' && !active.is_placeholder && (
        <p style={{ fontSize: '0.72rem', color: 'rgba(24,38,67,0.5)', marginBottom: 10 }}>{t('arPending')}</p>
      )}

      <div className="menus-layout">
        <div>
          <p className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(24,38,67,0.45)', marginBottom: 10 }}>
            Index
          </p>
          <div
            className="menus-sidebar-list is-scrollable"
            ref={sidebarRef}
            onMouseDown={onSidebarPointerDown}
            onMouseMove={onSidebarPointerMove}
            onMouseUp={endSidebarDrag}
            onMouseLeave={endSidebarDrag}
          >
            {menuCategories.map((c, i) => {
              const isActive = c.slug === active.slug;
              return (
                <button
                  key={c.slug}
                  onClick={onSidebarButtonClick(c.slug)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none',
                    borderBottom: `2px solid ${isActive ? 'var(--olive)' : 'transparent'}`, cursor: 'pointer',
                    padding: '8px 4px', textAlign: 'left', whiteSpace: 'nowrap', flex: '0 0 auto',
                  }}
                >
                  <span className="serif" style={{ fontSize: '0.85rem', color: isActive ? 'var(--olive)' : 'rgba(24,38,67,0.4)' }}>
                    {roman[i]}
                  </span>
                  <span className="serif" style={{ fontSize: '1rem', fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--navy-deep)' : 'rgba(24,38,67,0.65)' }}>
                    {categoryNames[c.slug]?.[lang] || c.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="menus-sidebar-callout" style={{
            marginTop: 24, border: '1px solid rgba(24,38,67,0.14)', borderRadius: 4, padding: 16,
          }}>
            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--navy-deep)', lineHeight: 1.4 }}>
              Boxed by hand, finished the same morning.
            </p>
            <Link
              to="/menu/catering"
              className="label"
              style={{
                display: 'inline-block', marginTop: 12, background: 'var(--olive)', color: 'var(--off-white)',
                borderRadius: 999, padding: '9px 16px', fontSize: '0.62rem', letterSpacing: '0.08em', textDecoration: 'none',
              }}
            >
              Events & Catering
            </Link>
          </div>
        </div>

        <div style={{ minHeight: 520 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid rgba(24,38,67,0.1)', paddingBottom: 10, marginBottom: 18 }}>
            <div>
              <p className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(24,38,67,0.45)', marginBottom: 4 }}>
                Chapter {roman[activeIdx]}
              </p>
              <h2 className="serif" style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', color: 'var(--navy-deep)' }}>
                {categoryNames[active.slug]?.[lang] || active.name}
              </h2>
            </div>
            <span
              className="serif"
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', lineHeight: 0.8, color: 'transparent',
                WebkitTextStroke: '1px rgba(24,38,67,0.45)',
              }}
            >
              {roman[activeIdx]}
            </span>
          </div>

          <div className="menus-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 240px) 1fr', gap: 'clamp(18px, 3vw, 40px)' }}>
            {signature && (
              <div className="menus-signature">
                {(signature.photoUrl || menuPhotos[signature.name]) ? (
                  <img
                    src={signature.photoUrl || menuPhotos[signature.name]}
                    alt={signature.name}
                    style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(24,38,67,0.12)' }}
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 4, background: 'rgba(24,38,67,0.06)', border: '1px solid rgba(24,38,67,0.12)' }} />
                )}
                <p className="label" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(24,38,67,0.45)', marginTop: 10 }}>
                  Maison Favourite
                </p>
                <h3 className="serif" style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginTop: 4 }}>{signature.name}</h3>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(24,38,67,0.65)', marginTop: 4, lineHeight: 1.35 }}>
                  {signature.description}
                </p>
                <p className="label" style={{ fontSize: '0.82rem', color: '#000', marginTop: 6 }}>
                  {signature.is_placeholder ? '—' : `${signature.price} SAR`}
                </p>
              </div>
            )}

            <div className="menus-item-list" style={{ paddingRight: 6 }}>
              {restItems.map((item) => renderItem(item, true))}
              {active.catering && (
                <p style={{ fontSize: '0.72rem', color: 'rgba(24,38,67,0.55)', marginTop: 14 }}>
                  Minimum 20 guests · 500 SAR minimum · 48h notice
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
