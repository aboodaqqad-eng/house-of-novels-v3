import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext.jsx';
import { LangProvider, useLang, categoryNames } from './context/LangContext.jsx';
import symbol from './assets/symbol.png';
import CategoryPage from './CategoryPage.jsx';
import MenusPage from './MenusPage.jsx';
import Home from './Home.jsx';
import Catering from './Catering.jsx';
import './theme.css';

function Nav() {
  const { lang } = useLang();

  const navLinkStyle = ({ isActive }) => ({
    fontSize: '0.78rem', color: 'var(--navy-deep)', opacity: isActive ? 1 : 0.75, textDecoration: 'none',
    border: isActive ? '1px solid var(--navy-deep)' : '1px solid transparent', borderRadius: 3,
    padding: '6px 12px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', letterSpacing: '0.1em',
  });

  return (
    <header className="site-header" style={{
      background: 'var(--off-white)', color: 'var(--navy-deep)', padding: '14px 32px',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20,
      borderBottom: '1px solid rgba(24,38,67,0.1)',
    }}>
      <NavLink to="/" className="site-logo" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', justifySelf: 'start' }}>
        <img src={symbol} alt="" style={{ height: 34, flex: '0 0 auto' }} />
        <span className="serif" style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', whiteSpace: 'nowrap' }}>
          House of Novéls
        </span>
      </NavLink>
      <nav className="site-nav" style={{ display: 'flex', gap: 10, flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', justifySelf: 'center' }}>
        <NavLink to="/menu" end className="label" style={navLinkStyle}>
          Menus
        </NavLink>
        <NavLink to="/menu/catering" className="label" style={navLinkStyle}>
          {categoryNames.catering[lang]}
        </NavLink>
      </nav>
      <div className="site-header-right" style={{ display: 'flex', alignItems: 'center', gap: 20, justifySelf: 'end' }}>
        <span className="site-header-locale label" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', opacity: 0.65, color: 'var(--navy-deep)' }}>Riyadh</span>
      </div>
    </header>
  );
}

const langBtn = {
  background: 'none', border: '1px solid rgba(239,232,223,0.6)', color: 'var(--off-white)',
  borderRadius: 4, padding: '9px 20px', fontFamily: 'var(--font-sans)', fontWeight: 700,
  fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
};

const footerLink = {
  color: 'var(--off-white)', textDecoration: 'none', opacity: 0.85, fontSize: '0.8rem',
};

function Footer({ compact }) {
  return (
    <footer className="site-footer" style={{
      background: 'var(--olive)', color: 'var(--off-white)', textAlign: 'center', flex: '0 0 auto',
      padding: compact ? 'clamp(10px, 2vh, 24px) 24px' : 'clamp(20px, 3.5vh, 40px) 24px',
    }}>
      <p className="label" style={{ fontSize: compact ? '0.6rem' : '0.66rem', letterSpacing: '0.2em', opacity: 0.85 }}>
        House of Novéls
      </p>

      {!compact && (
        <p className="serif footer-quote" style={{
          fontStyle: 'italic', fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)', maxWidth: 580, margin: '10px auto 0',
          lineHeight: 1.5, opacity: 0.92,
        }}>
          Thank you for making us part of your story. We hope this little chapter brings you something truly
          memorable — it is our pleasure to be part of your moments, celebrations, and memories.
        </p>
      )}

      <p className="label" style={{
        fontSize: compact ? '0.6rem' : '0.63rem', opacity: 0.75,
        marginTop: compact ? 'clamp(6px, 1.2vh, 14px)' : 14,
      }}>
        Riyadh, Saudi Arabia · Daily 8:00 — 23:00
      </p>

      <div style={{
        display: 'flex', gap: compact ? 14 : 18, justifyContent: 'center', flexWrap: 'wrap',
        marginTop: compact ? 'clamp(6px, 1.2vh, 14px)' : 12,
      }}>
        <a href="tel:+966562322224" style={footerLink}>+966 56 232 2224</a>
        <a href="tel:+966549780998" style={footerLink}>+966 54 978 0998</a>
        <a href="mailto:nabeel@novelsbakery.com" style={footerLink}>nabeel@novelsbakery.com</a>
        <a href="https://www.instagram.com/novels_bakery" target="_blank" rel="noreferrer" style={footerLink}>Instagram</a>
        <span style={{ ...footerLink, opacity: 0.5, cursor: 'default' }} title="TikTok link pending from client">TikTok</span>
        <a href="https://api.whatsapp.com/send/?phone=%2B966549780998&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" style={footerLink}>WhatsApp</a>
      </div>

      {!compact && (
        <p className="label footer-copyright" style={{ fontSize: '0.6rem', opacity: 0.6, marginTop: 16 }}>
          © {new Date().getFullYear()} House of Novéls
        </p>
      )}
    </footer>
  );
}

function SiteShell() {
  const { dir } = useLang();
  return (
    <div dir={dir} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenusPage />} />
          <Route path="/menu/catering" element={<Catering />} />
          <Route path="/menu/:slug" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer compact={false} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <MenuProvider>
          <SiteShell />
        </MenuProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
