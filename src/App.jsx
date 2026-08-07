import React, { useState, useEffect, useCallback } from "react";
import { storage } from "./supabase";
import { PenSquare, Trash2, Calendar, User, ChevronRight, Loader2, Heart, MessageCircle, Send, Bookmark, ImageOff, Sparkles, Mail, Lock } from "lucide-react";

const FONT_LINK_ID = "nimediasport-fonts";

function ensureFonts() {
  if (document.getElementById(FONT_LINK_ID)) return;
  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@400;500&display=swap";
  document.head.appendChild(link);
}

// Palette Nîmes : rouge et blanc uniquement (+ encre pour le texte).
const RED = "#C8102E";
const RED_DARK = "#7A0C1E";
const GREEN = "#1B6B3C";
const WHITE = "#FFFFFF";
const INK = "#161513";

const LOGO_SRC = "data:image/jpeg;base64,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";

const STORAGE_KEY = "nimediasport-articles";
const PENDING_KEY  = "nimediasport-pending";
const ADMIN_HASH = import.meta.env.VITE_ADMIN_HASH || "2f70f7a44ede269affabb517aee58045bc31e0c6f86b25fc3332eb89a2130d94";

async function hashAdminInput(input) {
  const text = `${input.trim()}:nimediasport`;
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
const MATCHES_KEY  = "crocoprono-matches";
const USERS_KEY    = "crocoprono-users";
const PRONOS_KEY   = "crocoprono-pronostics";

const DEFAULT_HASHTAG = "#SportNimois";

const SLOGAN = "La communauté officielle des passionnés du sport Nîmois";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 680);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function parseLinks(text) {
  if (!text) return '';
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const withBreaks = escaped.replace(/\n/g, '<br>');
  return withBreaks.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#C8102E;font-weight:700;text-decoration:underline;">$1</a>`
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function Logo({ size = 44 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Nîmediasport"
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: `2px solid ${WHITE}`, background: WHITE, display: "block" }}
    />
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [articles, setArticles] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("public"); // public | redaction | crocoprono
  const [openArticle, setOpenArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [engagement, setEngagement] = useState({});
  const [likedByMe, setLikedByMe] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 12;

  const ENG_KEY = "nimediasport-engagement";

  useEffect(() => {
    ensureFonts();
    (async () => {
      try {
        const res = await storage.get(STORAGE_KEY);
        const list = res ? JSON.parse(res.value) : [];
        setArticles(Array.isArray(list) ? list : []);
      } catch {
        setArticles([]);
      }
      try {
        const eng = await storage.get(ENG_KEY);
        setEngagement(eng ? JSON.parse(eng.value) : {});
      } catch {
        setEngagement({});
      }
      try {
        const pend = await storage.get(PENDING_KEY);
        setPending(pend ? JSON.parse(pend.value) : []);
      } catch { setPending([]); }
      setLoading(false);
    })();
  }, []);

  const persistEngagement = useCallback(async (next) => {
    setEngagement(next);
    try {
      await storage.set(ENG_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const toggleLike = useCallback(async (articleId) => {
    const already = likedByMe[articleId];
    setLikedByMe(prev => ({ ...prev, [articleId]: !already }));
    const current = engagement[articleId] || { likes: 0, comments: [] };
    const next = {
      ...engagement,
      [articleId]: { ...current, likes: Math.max(0, current.likes + (already ? -1 : 1)) }
    };
    await persistEngagement(next);
  }, [engagement, likedByMe, persistEngagement]);

  const addComment = useCallback(async (articleId, author, text) => {
    const current = engagement[articleId] || { likes: 0, comments: [] };
    const comment = { id: `c_${Date.now()}`, author: author.trim() || "Anonyme", text: text.trim(), date: new Date().toISOString() };
    const next = {
      ...engagement,
      [articleId]: { ...current, comments: [...(current.comments || []), comment] }
    };
    await persistEngagement(next);
    return comment;
  }, [engagement, persistEngagement]);

  const persist = useCallback(async (next) => {
    setArticles(next);
    try {
      await storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setToast("Échec de l'enregistrement. Réessayez.");
      setTimeout(() => setToast(""), 3000);
    }
  }, []);

  const publish = async (article) => {
    setSaving(true);
    const withMeta = { ...article, id: `art_${Date.now()}`, date: new Date().toISOString() };
    const next = [withMeta, ...articles];
    await persist(next);
    setSaving(false);
    setToast("Article publié.");
    setTimeout(() => setToast(""), 2500);
  };

  const remove = async (id) => {
    const next = articles.filter((a) => a.id !== id);
    await persist(next);
    setToast("Article supprimé.");
    setTimeout(() => setToast(""), 2500);
  };

  const persistPending = async (next) => {
    setPending(next);
    try { await storage.set(PENDING_KEY, JSON.stringify(next)); } catch {}
  };

  const submitArticle = async (article) => {
    const item = { ...article, id: `pend_${Date.now()}`, date: new Date().toISOString() };
    await persistPending([...pending, item]);
    setShowSubmit(false);
    setToast("Soumis ! L'administrateur validera votre article.");
    setTimeout(() => setToast(""), 4000);
  };

  const approveArticle = async (id) => {
    const item = pending.find(p => p.id === id);
    if (!item) return;
    const art = { ...item, id: `art_${Date.now()}`, date: new Date().toISOString() };
    const nextArt = [art, ...articles];
    await persist(nextArt);
    await persistPending(pending.filter(p => p.id !== id));
    setToast("Article approuvé et publié !");
    setTimeout(() => setToast(""), 2500);
  };

  const rejectArticle = async (id) => {
    await persistPending(pending.filter(p => p.id !== id));
    setToast("Article refusé.");
    setTimeout(() => setToast(""), 2500);
  };

  const updateArticle = async (id, data) => {
    const next = articles.map(a => a.id === id ? { ...a, ...data } : a);
    await persist(next);
    setEditingArticle(null);
    setToast("Article modifié.");
    setTimeout(() => setToast(""), 2500);
  };

  const handleAdminLogin = async () => {
    const hash = await hashAdminInput(loginInput);
    if (hash === ADMIN_HASH) {
      setIsAdmin(true); setShowLogin(false); setLoginError(false);
      setView("redaction");
    } else { setLoginError(true); }
  };

  return (
    <div style={{ minHeight: "100vh", background: WHITE, fontFamily: "'Source Serif 4', serif", color: INK }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; }
        img { max-width: 100%; display: block; }
        .oswald { font-family: 'Oswald', sans-serif; }
        .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.5px; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; }
        ::selection { background: ${RED}; color: #fff; }
        .card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
        .navbtn { transition: opacity 0.15s ease; }
        .navbtn:hover { opacity: 0.7; }
        input:focus, textarea:focus, select:focus { outline: 2px solid ${RED}; outline-offset: 1px; }
        @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @media (prefers-reduced-motion: reduce) { .card, .navbtn { transition: none; } }

        /* ── RESPONSIVE MOBILE ── */
        @media (max-width: 680px) {
          .header-slogan { display: none !important; }
          .header-nav-center { display: none !important; }
          .croco-mobile-btn { display: inline-flex !important; }
          .news-layout { flex-direction: column !important; }
          .news-grid { grid-template-columns: repeat(1, 1fr) !important; gap: 12px !important; padding: 0 12px !important; }
          .news-grid > * { border-radius: 8px !important; overflow: hidden !important; max-width: 480px !important; margin: 0 auto !important; width: 100% !important; }
          .hashtag-sidebar { display: none !important; }
          .hashtag-mobile { display: flex !important; }
          .post-modal-inner { max-width: 100% !important; max-height: 100vh !important; border-radius: 0 !important; }
          .croco-form-grid { grid-template-columns: 1fr !important; }
          .leaderboard-table th:nth-child(n+5), .leaderboard-table td:nth-child(n+5) { display: none; }
          .main-container { padding: 0 0 60px !important; }
          .last-news-title { padding: 12px 10px 8px !important; }
          .hashtag-pills { padding: 0 10px 8px !important; }
        }
        @media (min-width: 681px) {
          .croco-mobile-btn { display: none !important; }
        }
      `}</style>

      <div style={{ height: 5, display: "flex" }}>
        <div style={{ flex: 1, background: RED }} />
        <div style={{ flex: 1, background: WHITE }} />
        <div style={{ flex: 1, background: GREEN }} />
      </div>

      <header style={{ background: INK, color: WHITE, position: "sticky", top: 0, zIndex: 20, borderBottom: `3px solid ${GREEN}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          {/* Logo + titre */}
          <button onClick={() => { setView("public"); setOpenArticle(null); }} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: 0, flexShrink: 0 }}>
            <Logo size={44} />
            <div style={{ textAlign: "left" }}>
              <div className="bebas" style={{ fontSize: 26, lineHeight: 1, color: WHITE }}>
                NÎ<span style={{ color: RED }}>MEDIA</span>SPORT
              </div>
              <div className="mono header-slogan" style={{ fontSize: 9.5, color: "#C9A6AC", letterSpacing: 0.8, marginTop: 3 }}>{SLOGAN}</div>
            </div>
          </button>

          {/* Navigation centrée */}
          <nav className="header-nav-center" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flex: 1 }}>
            <button onClick={() => { setView("public"); setOpenArticle(null); }} className="oswald"
              style={{ background: "none", border: "none", color: view === "public" ? WHITE : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", padding: "6px 0", borderBottom: view === "public" ? `2px solid ${RED}` : "2px solid transparent" }}>
              Actualités
            </button>
            <button onClick={() => setView(view === "crocoprono" ? "public" : "crocoprono")} className="oswald"
              style={{ background: "none", border: "none", color: view === "crocoprono" ? WHITE : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", padding: "6px 0", borderBottom: view === "crocoprono" ? `2px solid ${GREEN}` : "2px solid transparent", whiteSpace: "nowrap" }}>
              🐊&nbsp;Crocoprono
            </button>
          </nav>

          {/* Actions droite */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Crocoprono visible sur mobile */}
            <button onClick={() => setView(view === "crocoprono" ? "public" : "crocoprono")} className="oswald"
              style={{ background: "none", border: `1px solid ${view === "crocoprono" ? GREEN : "rgba(255,255,255,0.3)"}`, color: view === "crocoprono" ? GREEN : "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", padding: "6px 10px", borderRadius: 3, whiteSpace: "nowrap" }}
              className="croco-mobile-btn oswald">
              🐊 Prono
            </button>
            <button onClick={() => setShowSubmit(true)} className="oswald"
              style={{ display: "flex", alignItems: "center", gap: 6, background: RED, border: "none", color: WHITE, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 16px", borderRadius: 3, cursor: "pointer" }}>
              <PenSquare size={13} /> <span className="header-slogan">Proposer</span>
            </button>
          </div>
        </div>
      </header>

      {toast && (
        <div style={{ position: "fixed", top: 78, right: 20, zIndex: 50, background: INK, color: WHITE, padding: "10px 16px", borderRadius: 4, fontSize: 13, fontFamily: "'Oswald',sans-serif", boxShadow: "0 6px 18px rgba(0,0,0,0.3)" }}>
          {toast}
        </div>
      )}

      {/* Modal Login Admin */}
      {showLogin && (
        <div onClick={() => { setShowLogin(false); setLoginError(false); setLoginInput(""); }} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 8, padding: "28px 24px", width: "100%", maxWidth: 340 }}>
            <div className="bebas" style={{ fontSize: 22, color: INK, marginBottom: 4 }}>Espace Admin</div>
            <p style={{ fontSize: 13, color: "#6B6456", marginBottom: 16 }}>Réservé à l'administrateur du site.</p>
            <input
              type="password" value={loginInput} onChange={e => { setLoginInput(e.target.value); setLoginError(false); }}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              placeholder="Mot de passe"
              style={{ width: "100%", border: loginError ? `2px solid ${RED}` : "1px solid #D8D2C2", borderRadius: 4, padding: "10px 12px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK, marginBottom: 6 }}
            />
            {loginError && <div className="mono" style={{ color: RED, fontSize: 11, marginBottom: 8 }}>Mot de passe incorrect.</div>}
            <button onClick={handleAdminLogin} className="oswald" style={{ width: "100%", background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "11px", fontSize: 14, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
              Connexion
            </button>
          </div>
        </div>
      )}

      {/* Modal Soumission Communautaire */}
      {showSubmit && <CommunitySubmitForm onSubmit={submitArticle} onClose={() => setShowSubmit(false)} />}

      {/* Modal Modification d'article */}
      {editingArticle && <EditModal article={editingArticle} onSave={(data) => updateArticle(editingArticle.id, data)} onClose={() => setEditingArticle(null)} />}

      <main className="main-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 0 80px", width: "100%" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", padding: "80px 0", color: "#8A8375" }}>
            <Loader2 className="mono" size={18} style={{ animation: "spin 1s linear infinite" }} />
            Chargement…
          </div>
        ) : view === "crocoprono" ? (
          <div style={{ padding: "24px 20px" }}>
            <CrocoProno isAdmin={isAdmin} />
          </div>
        ) : view === "redaction" ? (
          <div style={{ padding: "24px 20px" }}>
            <Redaction onPublish={publish} saving={saving} articles={articles} onDelete={remove} pending={pending} onApprove={approveArticle} onReject={rejectArticle} onEdit={setEditingArticle} />
          </div>
        ) : (
          <>
            {/* Titre de section */}
            <div className="last-news-title" style={{ padding: "18px 16px 10px", borderBottom: `2px solid ${RED}`, marginBottom: 2 }}>
              <h1 className="bebas" style={{ fontSize: 28, margin: 0, letterSpacing: 1, color: INK }}>
                Last <span style={{ color: RED }}>News</span>
              </h1>
            </div>

            {/* Layout : grille + sidebar */}
            <div className="news-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginTop: 4 }}>

              {/* Grille articles */}
              <div style={{ flex: 1, minWidth: 0, overflow: "hidden", padding: isMobile ? "0 12px" : 0 }}>
                {/* Barre hashtag horizontale sur mobile */}
                <div className="hashtag-mobile hashtag-pills" style={{ display: "none", gap: 6, overflowX: "auto", paddingBottom: 10, marginBottom: 8, flexWrap: "nowrap", padding: "0 16px 10px" }}>
                  <button onClick={() => { setActiveTag(null); setCurrentPage(1); }} className="oswald"
                    style={{ background: !activeTag ? RED : "#F0EBE3", color: !activeTag ? WHITE : INK, border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Tout
                  </button>
                  {[...new Set(articles.map(a => a.hashtag || DEFAULT_HASHTAG))].map(tag => (
                    <button key={tag} onClick={() => { setActiveTag(activeTag === tag ? null : tag); setCurrentPage(1); }} className="oswald"
                      style={{ background: activeTag === tag ? RED : "#F0EBE3", color: activeTag === tag ? WHITE : INK, border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {tag}
                    </button>
                  ))}
                </div>

                {articles.length === 0 ? (
                  <div style={{ padding: "20px" }}><EmptyState onGoRedaction={() => setView("redaction")} /></div>
                ) : (() => {
                  const filtered = activeTag ? articles.filter(a => a.hashtag === activeTag) : articles;
                  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
                  const paginated = filtered.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);
                  return filtered.length === 0 ? (
                    <div style={{ padding: "40px 20px", textAlign: "center", color: "#8A8375" }} className="oswald">
                      Aucun article pour ce hashtag.
                    </div>
                  ) : (
                    <>
                      <div className="news-grid" style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                        gap: isMobile ? 12 : 4,
                        padding: 0,
                        boxSizing: "border-box",
                        width: "100%",
                      }}>
                        {paginated.map((a) => (
                          <GridThumb key={a.id} article={a} onOpen={() => setOpenArticle(a)} isMobile={isMobile} />
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "24px 0 8px", flexWrap: "wrap" }}>
                          <button onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }} disabled={currentPage === 1} className="oswald"
                            style={{ background: "none", border: `1px solid ${currentPage === 1 ? "#D8D2C2" : RED}`, color: currentPage === 1 ? "#D8D2C2" : RED, borderRadius: 4, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: currentPage === 1 ? "default" : "pointer" }}>
                            ← Précédent
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => { setCurrentPage(p); window.scrollTo(0, 0); }} className="oswald"
                              style={{ background: p === currentPage ? RED : "none", color: p === currentPage ? WHITE : INK, border: `1px solid ${p === currentPage ? RED : "#D8D2C2"}`, borderRadius: 4, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", minWidth: 36 }}>
                              {p}
                            </button>
                          ))}
                          <button onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }} disabled={currentPage === totalPages} className="oswald"
                            style={{ background: "none", border: `1px solid ${currentPage === totalPages ? "#D8D2C2" : RED}`, color: currentPage === totalPages ? "#D8D2C2" : RED, borderRadius: 4, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: currentPage === totalPages ? "default" : "pointer" }}>
                            Suivant →
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Sidebar hashtags */}
              {articles.length > 0 && (
                <HashtagSidebar
                  articles={articles}
                  activeTag={activeTag}
                  onSelect={(tag) => { setActiveTag(tag); setCurrentPage(1); }}
                />
              )}
            </div>

            {/* Modal post au clic */}
            {openArticle && (
              <PostModal
                article={openArticle}
                onClose={() => setOpenArticle(null)}
                eng={engagement[openArticle.id] || { likes: 0, comments: [] }}
                liked={!!likedByMe[openArticle.id]}
                onLike={() => toggleLike(openArticle.id)}
                onComment={(author, text) => addComment(openArticle.id, author, text)}
                isAdmin={isAdmin}
                onEdit={() => { setEditingArticle(openArticle); setOpenArticle(null); }}
              />
            )}
          </>
        )}
      </main>

      <footer style={{ background: INK, color: "#8A8375", padding: "22px 20px", textAlign: "center", borderTop: `3px solid ${GREEN}` }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span>NÎMEDIASPORT - Une Nîmoiserie créée avec l'aide de Claude</span>
          <a
            href="mailto:nimes.mediasport@gmail.com"
            onClick={e => { e.stopPropagation(); window.open('mailto:nimes.mediasport@gmail.com'); }}
            title="nimes.mediasport@gmail.com"
            style={{ color: "#8A8375", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = WHITE}
            onMouseLeave={e => e.currentTarget.style.color = "#8A8375"}>
            <Mail size={15} />
            <span style={{ fontSize: 11, letterSpacing: 0.5 }}>nimes.mediasport@gmail.com</span>
          </a>
          <button onClick={() => { if (isAdmin) { setView(view === "redaction" ? "public" : "redaction"); } else { setShowLogin(true); } }}
            title="Administration"
            style={{ background: "none", border: "none", color: view === "redaction" && isAdmin ? RED : "rgba(255,255,255,0.15)", cursor: "pointer", padding: "2px 4px", display: "flex", alignItems: "center", position: "relative" }}>
            <Lock size={12} />
            {pending.length > 0 && isAdmin && (
              <span style={{ position: "absolute", top: -3, right: -3, background: RED, color: WHITE, borderRadius: "50%", fontSize: 8, width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald',sans-serif", fontWeight: 700 }}>{pending.length}</span>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

function HashtagSidebar({ articles, activeTag, onSelect }) {
  // Compter les articles par hashtag
  const counts = {};
  articles.forEach(a => {
    const tag = a.hashtag || DEFAULT_HASHTAG;
    counts[tag] = (counts[tag] || 0) + 1;
  });
  const tags = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="hashtag-sidebar" style={{ width: 170, flexShrink: 0, position: "sticky", top: 80 }}>
      <div className="oswald" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#8A8375", padding: "12px 0 8px", borderBottom: `2px solid ${INK}`, marginBottom: 8 }}>
        Catégories
      </div>
      <button
        onClick={() => onSelect(null)}
        className="oswald"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: !activeTag ? RED : "none", color: !activeTag ? WHITE : INK, border: "none", borderRadius: 4, padding: "7px 10px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 4, textAlign: "left" }}>
        <span>Tout voir</span>
        <span style={{ fontSize: 11, opacity: 0.75 }}>{articles.length}</span>
      </button>
      {tags.map(([tag, count]) => (
        <button
          key={tag}
          onClick={() => onSelect(activeTag === tag ? null : tag)}
          className="oswald"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: activeTag === tag ? RED : "none", color: activeTag === tag ? WHITE : INK, border: "none", borderRadius: 4, padding: "7px 10px", fontSize: 12, fontWeight: activeTag === tag ? 700 : 500, cursor: "pointer", marginBottom: 3, textAlign: "left", transition: "background 0.15s" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tag}</span>
          <span style={{ fontSize: 11, opacity: 0.75, flexShrink: 0, marginLeft: 4 }}>{count}</span>
        </button>
      ))}
    </div>
  );
}

function GridThumb({ article, onOpen, isMobile }) {
  const [failed, setFailed] = useState(false);
  const hashtag = article.hashtag || DEFAULT_HASHTAG;

  if (isMobile) {
    return (
      <div onClick={onOpen} className="card" style={{
        position: "relative",
        cursor: "pointer",
        background: "#F4EBEC",
        width: "100%",
        overflow: "hidden",
        borderRadius: 8,
      }}>
        {article.image && !failed ? (
          <img src={article.image} alt="" onError={() => setFailed(true)}
            style={{ width: "100%", maxWidth: "100%", height: "auto", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageOff size={22} color={RED} />
          </div>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "28px 10px 8px" }}>
          {article.title && (
            <div className="oswald" style={{ color: WHITE, fontSize: 13, fontWeight: 700, lineHeight: 1.2, marginBottom: 3 }}>{article.title}</div>
          )}
          <span className="mono" style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{hashtag}</span>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onOpen} className="card" style={{
      position: "relative",
      aspectRatio: "4 / 5",
      overflow: "hidden",
      cursor: "pointer",
      background: "#F4EBEC",
    }}>
      {article.image && !failed ? (
        <img src={article.image} alt="" onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ImageOff size={22} color={RED} />
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "28px 10px 8px" }}>
        {article.title && (
          <div className="oswald" style={{ color: WHITE, fontSize: 13, fontWeight: 700, lineHeight: 1.2, marginBottom: 3 }}>{article.title}</div>
        )}
        <span className="mono" style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{hashtag}</span>
      </div>
    </div>
  );
}

function PostModal({ article, onClose, eng, liked, onLike, onComment, isAdmin, onEdit }) {
  const [failed, setFailed] = useState(false);
  const hashtag = article.hashtag || DEFAULT_HASHTAG;
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [comments, setComments] = useState(eng.comments || []);
  const [likes, setLikes] = useState(eng.likes || 0);
  const [isLiked, setIsLiked] = useState(liked);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [shared, setShared] = useState(false);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikes(l => l + (next ? 1 : -1));
    onLike();
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const c = await onComment(commentAuthor, commentText);
    setComments(prev => [...prev, c]);
    setCommentText("");
    setShowCommentBox(false);
  };

  const handleShare = async () => {
    const text = `${article.excerpt || ""}\n${hashtag}\n— Nîmediasport`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Nîmediasport", text });
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div onClick={e => e.stopPropagation()} className="post-modal-inner" style={{ background: WHITE, borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 480, maxHeight: "94vh", display: "flex", flexDirection: "column" }}>

        {/* En-tête fixe */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #EAD9DB", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={32} />
            <span className="oswald" style={{ fontSize: 13, fontWeight: 700 }}>nimediasport</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#8A8375", fontSize: 24, lineHeight: 1, padding: "0 4px", cursor: "pointer" }}>×</button>
        </div>

        {/* Tout le contenu défile ensemble : image + actions + texte */}
        <div style={{ overflowY: "auto", flexShrink: 1 }}>

          {/* Image */}
          <div style={{ aspectRatio: "4 / 5", background: "#F4EBEC", overflow: "hidden" }}>
            {article.image && !failed ? (
              <img src={article.image} alt="" onError={() => setFailed(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ImageOff size={32} color={RED} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 14px 4px" }}>
            <button onClick={handleLike} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", padding: "4px 8px 4px 0", color: isLiked ? RED : INK }}>
              <Heart size={24} fill={isLiked ? RED : "none"} color={isLiked ? RED : INK} />
              {likes > 0 && <span className="oswald" style={{ fontSize: 13, fontWeight: 600 }}>{likes}</span>}
            </button>
            <button onClick={() => setShowCommentBox(s => !s)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", padding: "4px 8px", color: showCommentBox ? RED : INK }}>
              <MessageCircle size={22} />
              {comments.length > 0 && <span className="oswald" style={{ fontSize: 13, fontWeight: 600 }}>{comments.length}</span>}
            </button>
            <button onClick={handleShare} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", padding: "4px 8px", color: shared ? RED : INK }}>
              <Send size={22} />
              {shared && <span className="oswald" style={{ fontSize: 11, color: RED }}>Copié !</span>}
            </button>
            <div style={{ marginLeft: "auto" }}>
              {isAdmin ? (
                <button onClick={onEdit} title="Modifier l'article" style={{ background: "none", border: "none", color: INK, padding: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  <PenSquare size={19} />
                </button>
              ) : (
                <Bookmark size={20} color={INK} />
              )}
            </div>
          </div>

          {/* Contenu texte */}
          <div style={{ padding: "6px 14px 16px" }}>
            {article.title && (
              <div className="oswald" style={{ fontSize: 17, fontWeight: 700, color: INK, marginBottom: 6, lineHeight: 1.25 }}>{article.title}</div>
            )}
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 8px", color: INK }}
            dangerouslySetInnerHTML={{ __html: parseLinks(article.content || article.excerpt) }} />
          <div style={{ marginBottom: 8 }}>
            <span className="oswald" style={{ color: RED, fontWeight: 600, fontSize: 13 }}>{hashtag}</span>
          </div>
          <div className="mono" style={{ fontSize: 10, color: "#A09080", marginBottom: 14 }}>
            {formatDate(article.date)} — {article.author || "Rédaction"}
          </div>

          {/* Commentaires */}
          {comments.length > 0 && (
            <div style={{ borderTop: "1px solid #EAD9DB", paddingTop: 10, marginBottom: 10 }}>
              {comments.map((c) => (
                <div key={c.id} style={{ marginBottom: 8 }}>
                  <span className="oswald" style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>{c.author} </span>
                  <span style={{ fontSize: 13, color: "#333" }}>{c.text}</span>
                  <div className="mono" style={{ fontSize: 9.5, color: "#A09080", marginTop: 1 }}>{formatDate(c.date)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire de commentaire */}
          {showCommentBox && (
            <div style={{ borderTop: "1px solid #EAD9DB", paddingTop: 10 }}>
              <input
                value={commentAuthor}
                onChange={e => setCommentAuthor(e.target.value)}
                placeholder="Ton prénom"
                style={{ width: "100%", border: "1px solid #D8D2C2", borderRadius: 4, padding: "7px 10px", fontSize: 13, fontFamily: "'Source Serif 4', serif", marginBottom: 6, color: INK }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleComment()}
                  placeholder="Ajoute un commentaire…"
                  style={{ flex: 1, border: "1px solid #D8D2C2", borderRadius: 4, padding: "7px 10px", fontSize: 13, fontFamily: "'Source Serif 4', serif", color: INK }}
                />
                <button onClick={handleComment} className="oswald"
                  style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Publier
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

function CommunitySubmitForm({ onSubmit, onClose }) {
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [hashtag, setHashtag] = useState(DEFAULT_HASHTAG);
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const inputStyle = { width: "100%", border: "1px solid #D8D2C2", borderRadius: 4, padding: "9px 12px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK };
  const labelStyle = { fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#4A453C", marginBottom: 5, display: "block" };

  const handleSubmit = () => {
    if (!image || !excerpt.trim()) { setError("L'image et le texte sont obligatoires."); return; }
    let tag = hashtag.trim() || DEFAULT_HASHTAG;
    if (!tag.startsWith("#")) tag = "#" + tag;
    onSubmit({ image, excerpt: excerpt.trim(), content: excerpt.trim(), hashtag: tag.replace(/\s+/g, ""), author: author.trim() });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 10, padding: "24px 20px", width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="bebas" style={{ fontSize: 22, color: INK }}>Proposer un article</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "#8A8375", cursor: "pointer" }}>×</button>
        </div>
        <p style={{ fontSize: 12.5, color: "#6B6456", marginBottom: 18, lineHeight: 1.5 }}>
          Votre publication sera soumise à validation avant d'apparaître sur le site.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Votre nom / pseudo</label>
            <input style={inputStyle} value={author} onChange={e => setAuthor(e.target.value)} placeholder="Ex. Jean-Marc" />
          </div>
          <div>
            <label style={labelStyle}>Image (obligatoire)</label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: WHITE, borderRadius: 4, padding: "8px 16px", cursor: imageLoading ? "not-allowed" : "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", opacity: imageLoading ? 0.6 : 1 }}>
              {imageLoading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <ImageOff size={13} />}
              {imageLoading ? "Traitement…" : image ? "Changer la photo" : "Choisir une photo"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                const file = e.target.files[0]; if (!file) return;
                setImageLoading(true);
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const img = new Image(); img.onload = () => {
                    const MAX = 1080; let w = img.width, h = img.height;
                    if (w > MAX || h > MAX) { if (w > h) { h = Math.round(h*MAX/w); w=MAX; } else { w=Math.round(w*MAX/h); h=MAX; } }
                    const canvas = document.createElement("canvas"); canvas.width=w; canvas.height=h;
                    canvas.getContext("2d").drawImage(img,0,0,w,h);
                    setImage(canvas.toDataURL("image/jpeg",0.75)); setImageLoading(false);
                  }; img.src = ev.target.result;
                }; reader.readAsDataURL(file); e.target.value="";
              }} />
            </label>
            {image && !imageLoading && <div style={{ marginTop: 8, width: 80, aspectRatio: "1/1", borderRadius: 4, overflow: "hidden", border: "1px solid #D8D2C2" }}><img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
          </div>
          <div>
            <label style={labelStyle}>Hashtag du sujet</label>
            <input style={inputStyle} value={hashtag} onChange={e => setHashtag(e.target.value)} placeholder="#NimesOlympique" />
          </div>
          <div>
            <label style={labelStyle}>Texte (obligatoire)</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Décrivez votre actualité en quelques phrases…" />
            <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginTop: 6, lineHeight: 1.5 }}>
              💡 Lien cliquable : <span style={{ background: "#F0EBE3", padding: "2px 6px", borderRadius: 3, fontFamily: "monospace" }}>[mot](https://url.com)</span>
            </div>
          </div>
          {error && <div className="oswald" style={{ color: RED, fontSize: 12 }}>{error}</div>}
          <button onClick={handleSubmit} className="oswald" style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "11px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
            Soumettre ma publication
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ article, onSave, onClose }) {
  const [image, setImage] = useState(article.image || "");
  const [imageLoading, setImageLoading] = useState(false);
  const [artTitle, setArtTitle] = useState(article.title || "");
  const [excerpt, setExcerpt] = useState(article.excerpt || "");
  const [content, setContent] = useState(article.content || "");
  const [hashtag, setHashtag] = useState(article.hashtag || DEFAULT_HASHTAG);

  const inputStyle = { width: "100%", border: "1px solid #D8D2C2", borderRadius: 4, padding: "9px 12px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK };
  const labelStyle = { fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#4A453C", marginBottom: 5, display: "block" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 10, padding: "24px 20px", width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="bebas" style={{ fontSize: 22, color: INK }}>Modifier l'article</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "#8A8375", cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Image</label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, background: INK, color: WHITE, borderRadius: 4, padding: "8px 16px", cursor: imageLoading ? "not-allowed" : "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", opacity: imageLoading ? 0.6 : 1 }}>
              {imageLoading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <ImageOff size={13} />}
              {imageLoading ? "Traitement…" : "Changer la photo"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                const file = e.target.files[0]; if (!file) return;
                setImageLoading(true);
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const img = new Image(); img.onload = () => {
                    const MAX = 1080; let w = img.width, h = img.height;
                    if (w > MAX || h > MAX) { if (w > h) { h = Math.round(h*MAX/w); w=MAX; } else { w=Math.round(w*MAX/h); h=MAX; } }
                    const canvas = document.createElement("canvas"); canvas.width=w; canvas.height=h;
                    canvas.getContext("2d").drawImage(img,0,0,w,h);
                    setImage(canvas.toDataURL("image/jpeg",0.75)); setImageLoading(false);
                  }; img.src = ev.target.result;
                }; reader.readAsDataURL(file); e.target.value="";
              }} />
            </label>
            {image && <div style={{ marginTop: 8, width: 80, aspectRatio: "1/1", borderRadius: 4, overflow: "hidden", border: "1px solid #D8D2C2" }}><img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
          </div>
          <div>
            <label style={labelStyle}>Hashtag</label>
            <input style={inputStyle} value={hashtag} onChange={e => setHashtag(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Titre (optionnel)</label>
            <input style={inputStyle} value={artTitle} onChange={e => setArtTitle(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Texte (obligatoire)</label>
            <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={content} onChange={e => setContent(e.target.value)} />
            <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginTop: 6, lineHeight: 1.5 }}>
              💡 Lien cliquable : <span style={{ background: "#F0EBE3", padding: "2px 6px", borderRadius: 3, fontFamily: "monospace" }}>[mot](https://url.com)</span>
            </div>
          </div>
          <button onClick={() => onSave({ image, title: artTitle, excerpt: content || excerpt, content: content || excerpt, hashtag: (hashtag.startsWith("#") ? hashtag : "#"+hashtag).replace(/\s+/g,"") })} className="oswald" style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "11px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onGoRedaction }) {
  return (
    <div style={{ textAlign: "center", padding: "70px 20px", border: `1px dashed #E3C4C9` }}>
      <Logo size={56} />
      <p className="oswald" style={{ fontSize: 16, color: "#6B6456", margin: "16px 0 18px", textTransform: "uppercase", letterSpacing: 0.5 }}>
        Aucun article publié pour l'instant
      </p>
      <button onClick={onGoRedaction} className="oswald" style={{ background: RED, color: WHITE, border: "none", padding: "10px 22px", borderRadius: 3, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Publier le premier article
      </button>
    </div>
  );
}

function Redaction({ onPublish, saving, articles, onDelete, pending, onApprove, onReject, onEdit }) {
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [hashtag, setHashtag] = useState(DEFAULT_HASHTAG);
  const [error, setError] = useState("");

  const [brief, setBrief] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiFilled, setAiFilled] = useState(false);

  const generateWithAI = async () => {
    if (!brief.trim()) {
      setAiError("Décris d'abord l'actualité en quelques mots.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    setAiFilled(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Tu es le rédacteur de "Nîmediasport", un site d'actualité sur le sport nîmois, avec des publications dans le style d'un post Instagram (une image, un texte, un hashtag). À partir du brief ci-dessous, rédige une publication.

Brief : """${brief.trim()}"""

Réponds UNIQUEMENT avec un objet JSON valide, sans balises markdown, sans texte autour, au format exact :
{"title": "titre court et accrocheur (optionnel)", "content": "texte principal du post, 2 à 3 phrases, ton dynamique et chaleureux", "hashtag": "#UnHashtagEnCamelCase qui résume le sujet"}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const textBlock = (data.content || []).find((b) => b.type === "text");
      if (!textBlock) throw new Error("Réponse vide");
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setTitle(parsed.title || "");
      setContent(parsed.content || "");
      let tag = (parsed.hashtag || "").trim();
      if (tag && !tag.startsWith("#")) tag = `#${tag}`;
      if (tag) setHashtag(tag.replace(/\s+/g, ""));
      setAiFilled(true);
    } catch (err) {
      setAiError("L'IA n'a pas pu générer le post. Réessaie, ou remplis le formulaire manuellement.");
    } finally {
      setAiLoading(false);
    }
  };

  const submit = async () => {
    if (!image || !content.trim()) {
      setError("L'image et le texte sont obligatoires.");
      return;
    }
    setError("");
    let tag = hashtag.trim() || DEFAULT_HASHTAG;
    if (!tag.startsWith("#")) tag = `#${tag}`;
    tag = tag.replace(/\s+/g, "");
    await onPublish({
      image: image,
      title: title.trim(),
      excerpt: content.trim(),
      content: content.trim(),
      author: author.trim(),
      hashtag: tag,
    });
    setImage(""); setTitle(""); setExcerpt(""); setContent(""); setAuthor("");
    setHashtag(DEFAULT_HASHTAG);
    setBrief(""); setAiFilled(false);
  };

  const inputStyle = { width: "100%", background: WHITE, border: "1px solid #D8D2C2", borderRadius: 4, padding: "10px 12px", fontSize: 14.5, fontFamily: "'Source Serif 4', serif", color: INK };
  const labelStyle = { fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#4A453C", marginBottom: 6, display: "block" };

  return (
    <div>
      <h1 className="oswald" style={{ fontSize: 22, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Rédaction</h1>
      <p style={{ fontSize: 13.5, color: "#6B6456", marginBottom: 22 }}>Publiez un nouvel article. Il apparaît immédiatement en tête du site.</p>

      <div style={{ background: "#FBEFEF", border: `1px solid #EAD9DB`, borderLeft: `4px solid ${RED}`, borderRadius: 5, padding: "16px 18px", marginBottom: 28 }}>
        <div className="oswald" style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: RED_DARK, marginBottom: 8 }}>
          Assistant de rédaction IA
        </div>
        <p style={{ fontSize: 13, color: "#4A453C", margin: "0 0 10px" }}>
          Décris l'actu en quelques mots, l'IA rédige le texte et le hashtag. Tu n'auras plus qu'à relire, ajouter l'image, et publier.
        </p>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Ex. Le Nîmes Olympique a battu Grenoble 2-0 hier soir aux Costières, buts de Koné et Bobichon, belle affluence."
          style={{ width: "100%", minHeight: 70, background: WHITE, border: "1px solid #D8B9BD", borderRadius: 4, padding: "10px 12px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK, resize: "vertical" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
          <button type="button" onClick={generateWithAI} disabled={aiLoading} className="oswald"
            style={{ display: "flex", alignItems: "center", gap: 8, background: RED, color: WHITE, border: "none", padding: "9px 18px", borderRadius: 3, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, opacity: aiLoading ? 0.6 : 1 }}>
            {aiLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={14} />}
            {aiLoading ? "Rédaction en cours…" : "Générer le post"}
          </button>
          {aiFilled && !aiLoading && (
            <span className="mono" style={{ fontSize: 11.5, color: RED_DARK }}>✓ Champs remplis ci-dessous — vérifie puis ajoute l'image.</span>
          )}
        </div>
        {aiError && <div className="oswald" style={{ color: RED, fontSize: 12.5, marginTop: 8 }}>{aiError}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        <div>
          <label style={labelStyle}>Image — obligatoire</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: WHITE, borderRadius: 4, padding: "9px 18px", cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, opacity: imageLoading ? 0.6 : 1 }}>
              {imageLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <ImageOff size={14} />}
              {imageLoading ? "Traitement…" : image ? "Changer la photo" : "Choisir une photo"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setImageLoading(true);
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const img = new Image();
                  img.onload = () => {
                    const MAX = 1080;
                    let w = img.width, h = img.height;
                    if (w > MAX || h > MAX) {
                      if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
                      else { w = Math.round(w * MAX / h); h = MAX; }
                    }
                    const canvas = document.createElement("canvas");
                    canvas.width = w; canvas.height = h;
                    canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                    setImage(canvas.toDataURL("image/jpeg", 0.78));
                    setImageLoading(false);
                  };
                  img.src = ev.target.result;
                };
                reader.readAsDataURL(file);
                e.target.value = "";
              }} />
            </label>
            {image && !imageLoading && <span className="mono" style={{ fontSize: 11, color: "#4A453C" }}>✓ Photo prête</span>}
          </div>
          {image && !imageLoading && (
            <div style={{ marginTop: 10, width: 110, aspectRatio: "1 / 1", borderRadius: 6, overflow: "hidden", border: "1px solid #D8D2C2" }}>
              <img src={image} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
        </div>
        <div>
          <label style={labelStyle}>Hashtag du sujet</label>
          <input style={inputStyle} value={hashtag} onChange={(e) => setHashtag(e.target.value)} placeholder="#NimesOlympique" />
        </div>
        <div>
          <label style={labelStyle}>Titre (optionnel)</label>
          <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Victoire éclatante aux Costières !" />
        </div>
        <div>
          <label style={labelStyle}>Texte (obligatoire)</label>
          <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Le texte de la publication." />
          <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginTop: 6, lineHeight: 1.5 }}>
            💡 Pour ajouter un lien cliquable dans le texte : <span style={{ background: "#F0EBE3", padding: "2px 6px", borderRadius: 3, fontFamily: "monospace" }}>[mot](https://url.com)</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Auteur (optionnel)</label>
          <input style={inputStyle} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Rédaction" />
        </div>
        {error && <div className="oswald" style={{ color: RED, fontSize: 13 }}>{error}</div>}
        <button onClick={submit} disabled={saving} className="oswald" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, background: RED, color: WHITE, border: "none", padding: "11px 24px", borderRadius: 3, fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, opacity: saving ? 0.6 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> : <PenSquare size={15} />}
          {saving ? "Publication…" : "Publier l'article"}
        </button>
      </div>

      {/* Section En attente */}
      {pending && pending.length > 0 && (
        <div style={{ marginBottom: 30, borderTop: "1px solid #E7E3D8", paddingTop: 20 }}>
          <h2 className="oswald" style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14, color: RED }}>
            ⏳ En attente de validation ({pending.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pending.map(p => (
              <div key={p.id} style={{ background: "#FFF5F5", border: `1px solid #EAD9DB`, borderLeft: `3px solid ${RED}`, borderRadius: 5, padding: "12px 14px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  {p.image && <img src={p.image} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />}
                  <div style={{ minWidth: 0 }}>
                    <div className="mono" style={{ fontSize: 10.5, color: RED_DARK, fontWeight: 600 }}>{p.hashtag || DEFAULT_HASHTAG}</div>
                    <div style={{ fontSize: 13, color: INK, lineHeight: 1.4, marginTop: 3 }}>{p.excerpt}</div>
                    <div className="mono" style={{ fontSize: 10, color: "#8A8375", marginTop: 4 }}>{p.author || "Anonyme"} · {formatDate(p.date)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => onApprove(p.id)} className="oswald" style={{ flex: 1, background: GREEN, color: WHITE, border: "none", borderRadius: 3, padding: "8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
                    ✓ Approuver
                  </button>
                  <button onClick={() => onReject(p.id)} className="oswald" style={{ flex: 1, background: "transparent", color: RED, border: `1px solid ${RED}`, borderRadius: 3, padding: "8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
                    ✗ Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="oswald" style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14, color: "#4A453C", borderTop: "1px solid #E7E3D8", paddingTop: 20 }}>
        Articles publiés ({articles.length})
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {articles.length === 0 && <div style={{ fontSize: 13.5, color: "#8A8375" }}>Rien publié pour l'instant.</div>}
        {articles.map((a) => (
          <div key={a.id} style={{ background: WHITE, border: "1px solid #E7E3D8", borderLeft: `3px solid ${RED}`, borderRadius: 4, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ minWidth: 0 }}>
              <div className="oswald" style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.excerpt}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "#8A8375", marginTop: 3 }}>{a.hashtag || DEFAULT_HASHTAG} · {formatDate(a.date)}</div>
            </div>
            <button onClick={() => onDelete(a.id)} title="Supprimer" style={{ background: "none", border: "none", color: RED, padding: 4, flexShrink: 0 }}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CROCOPRONO ───────────────────────────────────────────────────────────────

async function hashCode(pseudo, code) {
  const text = `${pseudo.toLowerCase().trim()}:${code.trim()}:crocoprono`;
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function calcPoints(ph, pa, rh, ra, club) {
  if (rh === null || ra === null) return null;
  const exactPts  = club === 'USAM' ? 5 : 3;
  const resultPts = club === 'USAM' ? 2 : 1;
  if (ph === rh && pa === ra) return exactPts;
  const pr = ph > pa ? 'H' : ph < pa ? 'A' : 'D';
  const rr = rh > ra ? 'H' : rh < ra ? 'A' : 'D';
  return pr === rr ? resultPts : 0;
}

function isClosed(match) {
  if (match.status === 'finished') return true;
  if (match.closingDate && new Date() >= new Date(match.closingDate)) return true;
  return false;
}

function CrocoProno({ isAdmin }) {
  const [tab, setTab] = useState('pronos');
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState({});
  const [pronos, setPronos] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    (async () => {
      try {
        const [m, u, p] = await Promise.all([
          storage.get(MATCHES_KEY),
          storage.get(USERS_KEY),
          storage.get(PRONOS_KEY),
        ]);
        setMatches(m ? JSON.parse(m.value) : []);
        setUsers(u ? JSON.parse(u.value) : {});
        setPronos(p ? JSON.parse(p.value) : {});
      } catch { }
      setLoading(false);
    })();
  }, []);

  const saveMatches = async (next) => { setMatches(next); await storage.set(MATCHES_KEY, JSON.stringify(next)); };
  const saveUsers   = async (next) => { setUsers(next);   await storage.set(USERS_KEY, JSON.stringify(next)); };
  const savePronos  = async (next) => { setPronos(next);  await storage.set(PRONOS_KEY, JSON.stringify(next)); };

  // Login / Register
  const handleLogin = async (pseudo, code) => {
    const key = pseudo.toLowerCase().trim();
    const hash = await hashCode(pseudo, code);
    if (users[key]) {
      if (users[key].codeHash !== hash) { showToast('Code secret incorrect.'); return false; }
    } else {
      const nextUsers = { ...users, [key]: { pseudo: pseudo.trim(), codeHash: hash } };
      await saveUsers(nextUsers);
    }
    setCurrentUser({ pseudo: pseudo.trim(), key });
    showToast(`Bienvenue ${pseudo.trim()} !`);
    return true;
  };

  // Sauvegarder un pronostic
  const saveProno = async (matchId, scoreHome, scoreAway) => {
    if (!currentUser) return;
    const pronoKey = `${matchId}__${currentUser.key}`;
    const match = matches.find(m => m.id === matchId);
    const pts = match?.status === 'finished' ? calcPoints(scoreHome, scoreAway, match.scoreHome, match.scoreAway, match.club) : null;
    const next = { ...pronos, [pronoKey]: { pseudo: currentUser.pseudo, matchId, scoreHome, scoreAway, points: pts, updatedAt: new Date().toISOString() } };
    await savePronos(next);
    showToast('Pronostic enregistré !');
  };

  // Admin : ajouter un match
  const addMatch = async (match) => {
    const next = [{ ...match, id: `m_${Date.now()}`, status: 'open', scoreHome: null, scoreAway: null }, ...matches];
    await saveMatches(next);
    showToast('Match ajouté !');
  };

  const updateMatch = async (id, data) => {
    const closing = new Date(data.date);
    closing.setDate(closing.getDate() - 1);
    closing.setHours(23, 59, 0, 0);
    const next = matches.map(m => m.id === id ? { ...m, ...data, closingDate: closing.toISOString() } : m);
    await saveMatches(next);
    showToast('Match modifié !');
  };

  const deleteMatch = async (matchId) => {
    const next = matches.filter(m => m.id !== matchId);
    await saveMatches(next);
    showToast('Match supprimé.');
  };

  // Admin : saisir le score réel
  const setScore = async (matchId, scoreHome, scoreAway) => {
    const match = matches.find(m => m.id === matchId);
    const updatedMatches = matches.map(m => m.id === matchId ? { ...m, scoreHome, scoreAway, status: 'finished' } : m);
    const updatedPronos = { ...pronos };
    Object.keys(updatedPronos).forEach(k => {
      if (updatedPronos[k].matchId === matchId) {
        updatedPronos[k].points = calcPoints(updatedPronos[k].scoreHome, updatedPronos[k].scoreAway, scoreHome, scoreAway, match?.club);
      }
    });
    await saveMatches(updatedMatches);
    await savePronos(updatedPronos);
    showToast('Score enregistré et points calculés !');
  };

  // Calcul du leaderboard
  const leaderboard = (() => {
    const scores = {};
    Object.values(pronos).forEach(p => {
      const match = matches.find(m => m.id === p.matchId);
      if (!match || match.status !== 'finished') return;
      if (!scores[p.pseudo]) scores[p.pseudo] = { pseudo: p.pseudo, points: 0, played: 0, exact: 0, correct: 0 };
      scores[p.pseudo].played++;
      scores[p.pseudo].points += p.points || 0;
      if (p.points === 3) scores[p.pseudo].exact++;
      if (p.points === 1) scores[p.pseudo].correct++;
    });
    return Object.values(scores).sort((a, b) => b.points - a.points || b.exact - a.exact);
  })();


  const inputS = { border: "1px solid #D8D2C2", borderRadius: 4, padding: "8px 10px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK, background: WHITE };
  const labelS = { fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#4A453C", marginBottom: 4, display: "block" };

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: "#8A8375" }}>Chargement…</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {toast && <div style={{ position: "fixed", top: 78, right: 20, zIndex: 300, background: INK, color: WHITE, padding: "10px 16px", borderRadius: 4, fontSize: 13, fontFamily: "'Oswald',sans-serif" }}>{toast}</div>}

      {/* Titre */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, borderBottom: `2px solid ${GREEN}`, paddingBottom: 10 }}>
        <span style={{ fontSize: 32 }}>🐊</span>
        <div>
          <div className="bebas" style={{ fontSize: 28, lineHeight: 1 }}>Crocoprono</div>
          <div className="mono" style={{ fontSize: 11, color: "#8A8375" }}>Pronostique les matchs du NO et de l'USAM</div>
        </div>
        {currentUser && <div className="oswald" style={{ marginLeft: "auto", fontSize: 13, color: GREEN, fontWeight: 700 }}>🟢 {currentUser.pseudo}</div>}
        {isAdmin && (
          <button onClick={() => setTab(tab === 'admin' ? 'pronos' : 'admin')} className="oswald"
            style={{ marginLeft: currentUser ? 8 : "auto", background: tab === 'admin' ? RED : "transparent", border: `1px solid ${RED}`, color: tab === 'admin' ? WHITE : RED, fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "5px 10px", borderRadius: 3, cursor: "pointer" }}>
            {tab === 'admin' ? "← Retour" : "⚙ Gérer"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #E7E3D8" }}>
        {[["pronos","Pronostics"],["classement","Classement"]].map(([t,l]) => (
          <button key={t} onClick={() => setTab(t)} className="oswald"
            style={{ background: "none", border: "none", borderBottom: tab === t ? `3px solid ${RED}` : "3px solid transparent", color: tab === t ? RED : "#6B6456", fontSize: 13, fontWeight: 700, textTransform: "uppercase", padding: "8px 16px", cursor: "pointer" }}>
            {l}
          </button>
        ))}

      </div>

      {/* ONGLET PRONOSTICS */}
      {tab === 'pronos' && (
        <div>
          {!currentUser && <PronoLogin onLogin={handleLogin} />}
          <div className="mono" style={{ fontSize: 12, color: "#8A8375", background: "#F8F4EF", border: "1px solid #E7E3D8", borderLeft: `3px solid ${GREEN}`, borderRadius: 4, padding: "10px 14px", marginBottom: 16 }}>
            ⏰ Les matchs doivent être pronostiqués avant le début de chaque journée de championnat
          </div>
          {matches.length === 0 && <div className="oswald" style={{ color: "#8A8375", textAlign: "center", padding: 40 }}>Aucun match à pronostiquer pour l'instant.</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[...matches].sort((a, b) => new Date(a.date) - new Date(b.date)).map(match => {
              const pronoKey = currentUser ? `${match.id}__${currentUser.key}` : null;
              const myProno = pronoKey ? pronos[pronoKey] : null;
              const closed = isClosed(match);
              return <MatchCard key={match.id} match={match} myProno={myProno} closed={closed} currentUser={currentUser} onSave={(h, a) => saveProno(match.id, h, a)} />;
            })}
          </div>
        </div>
      )}

      {/* ONGLET CLASSEMENT */}
      {tab === 'classement' && (
        <div>
          {leaderboard.length === 0 ? (
            <div className="oswald" style={{ color: "#8A8375", textAlign: "center", padding: 40 }}>Aucun point marqué pour l'instant.</div>
          ) : (
            <table className="leaderboard-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${INK}` }}>
                  {["#","Pseudo","Points","Matchs","Exact","Résultat"].map(h => (
                    <th key={h} className="oswald" style={{ textAlign: h === "Pseudo" ? "left" : "center", padding: "8px 10px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#4A453C" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row, i) => (
                  <tr key={row.pseudo} style={{ borderBottom: "1px solid #F0EBE3", background: i === 0 ? "#FFF8E7" : i < 3 ? "#FAFAFA" : WHITE }}>
                    <td className="oswald" style={{ textAlign: "center", padding: "10px", fontWeight: 700, fontSize: 15, color: i === 0 ? "#B8860B" : i === 1 ? "#808080" : i === 2 ? "#8B4513" : INK }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
                    <td className="oswald" style={{ padding: "10px", fontWeight: 600 }}>{row.pseudo}</td>
                    <td className="oswald" style={{ textAlign: "center", padding: "10px", fontWeight: 700, fontSize: 16, color: RED }}>{row.points}</td>
                    <td style={{ textAlign: "center", padding: "10px", color: "#6B6456" }}>{row.played}</td>
                    <td style={{ textAlign: "center", padding: "10px" }}>🎯 {row.exact}</td>
                    <td style={{ textAlign: "center", padding: "10px" }}>✓ {row.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginTop: 16, textAlign: "center", lineHeight: 1.8 }}>
            🎯 Score exact NO = 3pts &nbsp;|&nbsp; ✓ Bon résultat NO = 1pt<br/>
            🎯 Score exact USAM = 5pts &nbsp;|&nbsp; ✓ Bon résultat USAM = 2pts
          </div>
        </div>
      )}

      {/* ONGLET ADMIN */}
      {tab === 'admin' && isAdmin && <AdminCroco matches={matches} pronos={pronos} onAddMatch={addMatch} onSetScore={setScore} onDeleteMatch={deleteMatch} onUpdateMatch={updateMatch} />}
    </div>
  );
}

function PronoLogin({ onLogin }) {
  const [pseudo, setPseudo] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const inputS = { width: "100%", border: "1px solid #D8D2C2", borderRadius: 4, padding: "9px 12px", fontSize: 14, fontFamily: "'Source Serif 4', serif", color: INK };
  const handleSubmit = async () => {
    if (!pseudo.trim() || !code.trim()) return;
    setLoading(true);
    await onLogin(pseudo, code);
    setLoading(false);
  };
  return (
    <div style={{ background: "#F8F4EF", border: "1px solid #E7E3D8", borderLeft: `4px solid ${GREEN}`, borderRadius: 6, padding: "20px", marginBottom: 24 }}>
      <div className="oswald" style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Connexion / Inscription</div>
      <p style={{ fontSize: 13, color: "#6B6456", marginBottom: 14 }}>Choisis un pseudo et un code secret pour participer. Si c'est ta première fois, ton compte est créé automatiquement.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input style={{ ...inputS, flex: 1, minWidth: 140 }} value={pseudo} onChange={e => setPseudo(e.target.value)} placeholder="Ton pseudo" />
        <input style={{ ...inputS, flex: 1, minWidth: 140 }} type="password" value={code} onChange={e => setCode(e.target.value)} placeholder="Ton code secret" onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        <button onClick={handleSubmit} disabled={loading} className="oswald"
          style={{ background: GREEN, color: WHITE, border: "none", borderRadius: 4, padding: "9px 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
          {loading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : "Jouer"}
        </button>
      </div>
    </div>
  );
}

function MatchCard({ match, myProno, closed, currentUser, onSave }) {
  const [home, setHome] = useState(myProno?.scoreHome ?? '');
  const [away, setAway] = useState(myProno?.scoreAway ?? '');
  const [saving, setSaving] = useState(false);
  const clubColor = match.club === 'NO' ? RED : GREEN;
  const pts = myProno?.points;

  useEffect(() => {
    setHome(myProno?.scoreHome ?? '');
    setAway(myProno?.scoreAway ?? '');
  }, [myProno]);

  const handleSave = async () => {
    if (home === '' || away === '' || !currentUser) return;
    setSaving(true);
    await onSave(parseInt(home), parseInt(away));
    setSaving(false);
  };

  return (
    <div style={{ background: WHITE, border: "1px solid #E7E3D8", borderLeft: `4px solid ${clubColor}`, borderRadius: 6, padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div>
          <span className="oswald" style={{ fontSize: 11, background: clubColor, color: WHITE, borderRadius: 3, padding: "2px 8px", marginRight: 8 }}>{match.club}</span>
          <span className="mono" style={{ fontSize: 11, color: "#8A8375" }}>{match.competition}</span>
          <div className="oswald" style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>
            {match.isHome ? '🏠' : '✈️'} {match.club === 'NO' ? 'Nîmes Olympique' : 'USAM Nîmes'} vs {match.adversaire}
          </div>
          <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginTop: 2 }}>
            {new Date(match.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
        {/* Score réel si terminé */}
        {match.status === 'finished' && (
          <div style={{ textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 11, color: "#8A8375", marginBottom: 2 }}>Score réel</div>
            <div className="bebas" style={{ fontSize: 28, color: INK }}>{match.scoreHome} - {match.scoreAway}</div>
          </div>
        )}
      </div>

      {/* Zone pronostic */}
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {closed ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="mono" style={{ fontSize: 11, color: "#8A8375" }}>Ton pronostic :</div>
            {myProno ? (
              <>
                <div className="oswald" style={{ fontSize: 20, fontWeight: 700 }}>{myProno.scoreHome} - {myProno.scoreAway}</div>
                {pts !== null && (
                  <div className="oswald" style={{ fontSize: 13, background: pts >= 3 ? GREEN : pts > 0 ? "#B8860B" : "#E7E3D8", color: pts > 0 ? WHITE : "#8A8375", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>
                    {pts >= 3 ? `🎯 ${pts} pts` : pts > 0 ? `✓ ${pts} pt${pts > 1 ? 's' : ''}` : "0 pt"}
                  </div>
                )}
              </>
            ) : (
              <div className="mono" style={{ fontSize: 12, color: "#8A8375", fontStyle: "italic" }}>Pas de pronostic</div>
            )}
            <div className="oswald" style={{ fontSize: 11, color: RED }}>🔒 Fermé</div>
          </div>
        ) : currentUser ? (
          <>
            <div className="mono" style={{ fontSize: 11, color: "#6B6456", whiteSpace: "nowrap" }}>Ton prono :</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="number" min={0} max={99} value={home} onChange={e => setHome(e.target.value)}
                style={{ width: 48, textAlign: "center", border: "1px solid #D8D2C2", borderRadius: 4, padding: "6px", fontSize: 16, fontFamily: "'Oswald',sans-serif", fontWeight: 700, color: INK }} />
              <span className="oswald" style={{ fontWeight: 700 }}>-</span>
              <input type="number" min={0} max={99} value={away} onChange={e => setAway(e.target.value)}
                style={{ width: 48, textAlign: "center", border: "1px solid #D8D2C2", borderRadius: 4, padding: "6px", fontSize: 16, fontFamily: "'Oswald',sans-serif", fontWeight: 700, color: INK }} />
              <button onClick={handleSave} disabled={saving || home === '' || away === ''} className="oswald"
                style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "7px 14px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", cursor: "pointer", opacity: home === '' || away === '' ? 0.5 : 1 }}>
                {saving ? <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> : myProno ? "Modifier" : "Valider"}
              </button>
            </div>
            {myProno && <div className="mono" style={{ fontSize: 11, color: "#8A8375" }}>Actuel : {myProno.scoreHome}-{myProno.scoreAway}</div>}
          </>
        ) : (
          <div className="mono" style={{ fontSize: 12, color: "#8A8375", fontStyle: "italic" }}>Connecte-toi pour pronostiquer</div>
        )}
      </div>
    </div>
  );
}

function AdminCroco({ matches, pronos, onAddMatch, onSetScore, onDeleteMatch, onUpdateMatch }) {
  const [form, setForm] = useState({ club: 'NO', competition: '', adversaire: '', date: '', isHome: true });
  const [scoreForm, setScoreForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const inputS = { border: "1px solid #D8D2C2", borderRadius: 4, padding: "8px 10px", fontSize: 13, fontFamily: "'Source Serif 4', serif", color: INK, background: WHITE };
  const labelS = { fontFamily: "'Oswald',sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4, color: "#4A453C" };

  const handleAdd = () => {
    if (!form.adversaire.trim() || !form.date) return;
    // Fermeture automatique = veille à 23h59
    const matchDate = new Date(form.date);
    const closing = new Date(matchDate);
    closing.setDate(closing.getDate() - 1);
    closing.setHours(23, 59, 0, 0);
    onAddMatch({ ...form, closingDate: closing.toISOString() });
    setForm({ club: 'NO', competition: '', adversaire: '', date: '', isHome: true });
  };

  return (
    <div>
      {/* Ajouter un match */}
      <div style={{ background: "#F8F4EF", border: "1px solid #E7E3D8", borderLeft: `4px solid ${GREEN}`, borderRadius: 6, padding: "18px", marginBottom: 24 }}>
        <div className="oswald" style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Ajouter un match</div>
        <div className="croco-form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
          <div>
            <label style={labelS}>Club</label>
            <select style={{ ...inputS, width: "100%" }} value={form.club} onChange={e => setForm(f => ({ ...f, club: e.target.value }))}>
              <option value="NO">Nîmes Olympique</option>
              <option value="USAM">USAM Nîmes</option>
            </select>
          </div>
          <div>
            <label style={labelS}>Domicile / Extérieur</label>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={() => setForm(f => ({ ...f, isHome: true }))} className="oswald"
                style={{ flex: 1, padding: "8px", border: `2px solid ${form.isHome ? GREEN : '#D8D2C2'}`, borderRadius: 4, background: form.isHome ? GREEN : WHITE, color: form.isHome ? WHITE : INK, fontSize: 16, cursor: "pointer" }}>
                🏠
              </button>
              <button type="button" onClick={() => setForm(f => ({ ...f, isHome: false }))} className="oswald"
                style={{ flex: 1, padding: "8px", border: `2px solid ${!form.isHome ? RED : '#D8D2C2'}`, borderRadius: 4, background: !form.isHome ? RED : WHITE, color: !form.isHome ? WHITE : INK, fontSize: 16, cursor: "pointer" }}>
                ✈️
              </button>
            </div>
          </div>
          <div>
            <label style={labelS}>Compétition</label>
            <input style={{ ...inputS, width: "100%" }} value={form.competition} onChange={e => setForm(f => ({ ...f, competition: e.target.value }))} placeholder="Ligue 2, Pro D2…" />
          </div>
          <div>
            <label style={labelS}>Adversaire</label>
            <input style={{ ...inputS, width: "100%" }} value={form.adversaire} onChange={e => setForm(f => ({ ...f, adversaire: e.target.value }))} placeholder="Grenoble…" />
          </div>
          <div>
            <label style={labelS}>Date du match</label>
            <input type="date" style={{ ...inputS, width: "100%" }} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            {form.date && <div className="mono" style={{ fontSize: 10, color: "#8A8375", marginTop: 4 }}>Pronos fermés la veille à 23h59</div>}
          </div>
        </div>
        <button onClick={handleAdd} className="oswald" style={{ marginTop: 14, background: GREEN, color: WHITE, border: "none", borderRadius: 4, padding: "9px 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
          + Ajouter le match
        </button>
      </div>

      {/* Saisir les scores */}
      <div className="oswald" style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Gérer les matchs</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {matches.map(m => (
          <div key={m.id} style={{ background: WHITE, border: "1px solid #E7E3D8", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <span className="oswald" style={{ fontSize: 11, background: m.club === 'NO' ? RED : GREEN, color: WHITE, borderRadius: 3, padding: "2px 6px", marginRight: 6 }}>{m.club}</span>
                <span style={{ marginRight: 6 }}>{m.isHome ? '🏠' : '✈️'}</span>
                <span className="oswald" style={{ fontSize: 13, fontWeight: 600 }}>vs {m.adversaire}</span>
                <span className="mono" style={{ fontSize: 10, color: "#8A8375", marginLeft: 8 }}>{new Date(m.date).toLocaleDateString('fr-FR')}</span>
              </div>
              {m.status === 'finished' ? (
                <div className="oswald" style={{ fontSize: 16, fontWeight: 700, color: GREEN }}>✓ {m.scoreHome} - {m.scoreAway}</div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="number" min={0} max={99} placeholder="D" value={scoreForm[m.id]?.h ?? ''} onChange={e => setScoreForm(f => ({ ...f, [m.id]: { ...f[m.id], h: e.target.value } }))}
                    style={{ ...inputS, width: 44, textAlign: "center", padding: "5px" }} />
                  <span className="oswald">-</span>
                  <input type="number" min={0} max={99} placeholder="E" value={scoreForm[m.id]?.a ?? ''} onChange={e => setScoreForm(f => ({ ...f, [m.id]: { ...f[m.id], a: e.target.value } }))}
                    style={{ ...inputS, width: 44, textAlign: "center", padding: "5px" }} />
                  <button onClick={() => onSetScore(m.id, parseInt(scoreForm[m.id]?.h || 0), parseInt(scoreForm[m.id]?.a || 0))} className="oswald"
                    style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    Valider
                  </button>
                </div>
              )}
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button onClick={() => { setEditingId(editingId === m.id ? null : m.id); setEditForm({ club: m.club, competition: m.competition || '', adversaire: m.adversaire, date: m.date?.slice(0,10) || '', isHome: m.isHome ?? true }); }} title="Modifier"
                  style={{ background: "none", border: "none", color: editingId === m.id ? GREEN : INK, cursor: "pointer", padding: 4 }}>
                  <PenSquare size={15} />
                </button>
                <button onClick={() => { if (window.confirm('Supprimer ce match ?')) onDeleteMatch(m.id); }} title="Supprimer"
                  style={{ background: "none", border: "none", color: RED, cursor: "pointer", padding: 4 }}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            {/* Formulaire d'édition inline */}
            {editingId === m.id && (
              <div style={{ background: "#F8F4EF", borderTop: "1px solid #E7E3D8", padding: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ ...labelS }}>Club</label>
                    <select style={{ ...inputS, width: "100%" }} value={editForm.club} onChange={e => setEditForm(f => ({ ...f, club: e.target.value }))}>
                      <option value="NO">Nîmes Olympique</option>
                      <option value="USAM">USAM Nîmes</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ ...labelS }}>Dom. / Ext.</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button type="button" onClick={() => setEditForm(f => ({ ...f, isHome: true }))}
                        style={{ flex: 1, padding: "7px", border: `2px solid ${editForm.isHome ? GREEN : '#D8D2C2'}`, borderRadius: 4, background: editForm.isHome ? GREEN : WHITE, cursor: "pointer", fontSize: 14 }}>🏠</button>
                      <button type="button" onClick={() => setEditForm(f => ({ ...f, isHome: false }))}
                        style={{ flex: 1, padding: "7px", border: `2px solid ${!editForm.isHome ? RED : '#D8D2C2'}`, borderRadius: 4, background: !editForm.isHome ? RED : WHITE, cursor: "pointer", fontSize: 14 }}>✈️</button>
                    </div>
                  </div>
                  <div>
                    <label style={{ ...labelS }}>Compétition</label>
                    <input style={{ ...inputS, width: "100%" }} value={editForm.competition} onChange={e => setEditForm(f => ({ ...f, competition: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ ...labelS }}>Adversaire</label>
                    <input style={{ ...inputS, width: "100%" }} value={editForm.adversaire} onChange={e => setEditForm(f => ({ ...f, adversaire: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ ...labelS }}>Date</label>
                    <input type="date" style={{ ...inputS, width: "100%" }} value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { onUpdateMatch(m.id, editForm); setEditingId(null); }} className="oswald"
                    style={{ background: GREEN, color: WHITE, border: "none", borderRadius: 4, padding: "7px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
                    Enregistrer
                  </button>
                  <button onClick={() => setEditingId(null)} className="oswald"
                    style={{ background: "none", border: "1px solid #D8D2C2", borderRadius: 4, padding: "7px 14px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", cursor: "pointer", color: "#6B6456" }}>
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {matches.length === 0 && <div className="mono" style={{ color: "#8A8375", fontSize: 13 }}>Aucun match ajouté.</div>}
      </div>
    </div>
  );
}
