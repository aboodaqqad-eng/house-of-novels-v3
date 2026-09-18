import { createContext, useContext, useEffect, useState } from 'react';
import { categories as staticCategories } from '../data/menu.js';

const colorMap = {
  desserts: 'var(--olive)',
  'signature-cakes': 'var(--olive)',
  bakery: 'var(--olive)',
  coffee: 'var(--olive)',
  healthy: 'var(--orange)',
  catering: 'var(--olive)',
};

// The site is a phase-1, view-only menu — no backend/API needed for it in
// production. Categories and items come straight from the static data file
// so the deployed site works as a plain static build with nothing to crash
// or fall out of sync.
//
// Exception: when the URL has ?preview=1 (used only by the CMS admin app's
// "Preview site" button), the site instead fetches the CMS's current DRAFT
// content over the network, so an admin can see unpublished edits rendered
// exactly as the real site would show them, before hitting Publish.
// Preview mode is served BY the CMS server itself (see cms/server/index.js),
// so the draft API is always on this same origin — no separate host/port to
// configure, and nothing to break when this gets deployed elsewhere later.
const CMS_API = typeof window !== 'undefined' ? window.location.origin : '';
const isPreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preview') === '1';

const STATIC_MENU = staticCategories.map((c) => ({
  slug: c.slug,
  name: c.name,
  is_placeholder: !!c.isPlaceholder,
  accent: colorMap[c.slug] || 'var(--olive)',
  catering: c.catering || null,
  items: c.items.map((item, idx) => ({
    id: `${c.slug}-${idx}`,
    name: item.name,
    price: item.price,
    description: item.desc,
    is_placeholder: !!item.placeholder,
    sold_out: !!item.soldOut,
  })),
}));

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState(isPreview ? [] : STATIC_MENU);
  const [loading, setLoading] = useState(isPreview);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPreview) return;
    fetch(`${CMS_API}/api/preview`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          is_placeholder: c.is_placeholder,
          accent: colorMap[c.slug] || 'var(--olive)',
          catering: null,
          items: c.items.map((item) => ({
            id: item.id,
            name: item.name,
            nameAr: item.nameAr,
            description: item.description,
            descriptionAr: item.descriptionAr,
            price: item.price,
            is_placeholder: item.is_placeholder,
            sold_out: item.sold_out,
            photoUrl: item.photoUrl ? `${CMS_API}${item.photoUrl}` : null,
          })),
        }));
        setCategories(mapped);
        setLoading(false);
      })
      .catch((e) => {
        setError('Could not load draft content from the CMS — is the admin server running?');
        setLoading(false);
      });
  }, []);

  return (
    <MenuContext.Provider value={{ categories, loading, error, isPreview }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
