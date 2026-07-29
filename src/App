import React, { useState, useEffect, useCallback } from "react";
import { storage } from "./supabase";
import { PenSquare, Trash2, Calendar, User, ChevronRight, Loader2, Heart, MessageCircle, Send, Bookmark, ImageOff, Sparkles } from "lucide-react";

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
const ADMIN_PASS   = "NMSport26";

const DEFAULT_HASHTAG = "#SportNimois";

const SLOGAN = "La communauté officielle des passionnés du sport Nîmois";

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
  const [articles, setArticles] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("public");
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

  const handleAdminLogin = () => {
    if (loginInput.trim() === ADMIN_PASS) {
      setIsAdmin(true); setShowLogin(false); setLoginError(false);
      setView("redaction");
    } else { setLoginError(true); }
  };

  return (
    <div style={{ minHeight: "100vh", background: WHITE, fontFamily: "'Source Serif 4', serif", color: INK }}>
      <style>{`
        * { box-sizing: border-box; }
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
      `}</style>

      <div style={{ height: 5, display: "flex" }}>
        <div style={{ flex: 1, background: RED }} />
        <div style={{ flex: 1, background: WHITE }} />
        <div style={{ flex: 1, background: GREEN }} />
      </div>

      <header style={{ background: INK, color: WHITE, position: "sticky", top: 0, zIndex: 20, borderBottom: `3px solid ${GREEN}` }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => { setView("public"); setOpenArticle(null); }} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
            <Logo size={44} />
            <div style={{ textAlign: "left" }}>
              <div className="bebas" style={{ fontSize: 26, lineHeight: 1, color: WHITE }}>
                NÎ<span style={{ color: RED }}>MEDIA</span>SPORT
              </div>
              <div className="mono" style={{ fontSize: 9.5, color: "#C9A6AC", letterSpacing: 0.8, marginTop: 3, maxWidth: 260 }}>{SLOGAN}</div>
            </div>
          </button>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowSubmit(true)} className="oswald"
              style={{ display: "flex", alignItems: "center", gap: 6, background: GREEN, border: `1px solid ${GREEN}`, color: WHITE, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, padding: "7px 13px", borderRadius: 3 }}>
              <PenSquare size={13} /> Proposer un article
            </button>
            <button onClick={() => { if (isAdmin) { setView(view === "redaction" ? "public" : "redaction"); } else { setShowLogin(true); } }} className="oswald"
              style={{ display: "flex", alignItems: "center", gap: 6, background: view === "redaction" && isAdmin ? RED : "transparent", border: `1px solid ${RED}`, color: WHITE, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, padding: "7px 13px", borderRadius: 3 }}>
              Admin {pending.length > 0 && isAdmin && <span style={{ background: RED, color: WHITE, borderRadius: "50%", fontSize: 10, padding: "0 5px", marginLeft: 4 }}>{pending.length}</span>}
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

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 0 80px" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", padding: "80px 0", color: "#8A8375" }}>
            <Loader2 className="mono" size={18} style={{ animation: "spin 1s linear infinite" }} />
            Chargement…
          </div>
        ) : view === "redaction" ? (
          <div style={{ padding: "24px 20px" }}>
            <Redaction onPublish={publish} saving={saving} articles={articles} onDelete={remove} pending={pending} onApprove={approveArticle} onReject={rejectArticle} onEdit={setEditingArticle} />
          </div>
        ) : (
          <>
            {/* Titre de section */}
            <div style={{ padding: "18px 16px 10px", borderBottom: `2px solid ${RED}`, marginBottom: 2 }}>
              <h1 className="bebas" style={{ fontSize: 28, margin: 0, letterSpacing: 1, color: INK }}>
                Last <span style={{ color: RED }}>News</span>
              </h1>
            </div>

            {/* Grille 4 colonnes façon Instagram */}
            {articles.length === 0 ? (
              <div style={{ padding: "20px" }}><EmptyState onGoRedaction={() => setView("redaction")} /></div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginTop: 2 }}>
                {articles.map((a) => (
                  <GridThumb key={a.id} article={a} onOpen={() => setOpenArticle(a)} />
                ))}
              </div>
            )}

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
        <div className="mono" style={{ fontSize: 11, letterSpacing: 1 }}>
          NÎMEDIASPORT - Un site d'actu' sportive Nîmoise créé avec Claude
        </div>
      </footer>
    </div>
  );
}

function GridThumb({ article, onOpen }) {
  const [failed, setFailed] = useState(false);
  const hashtag = article.hashtag || DEFAULT_HASHTAG;
  return (
    <div onClick={onOpen} className="card" style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", cursor: "pointer", background: "#F4EBEC" }}>
      {article.image && !failed ? (
        <img src={article.image} alt="" onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ImageOff size={22} color={RED} />
        </div>
      )}
      {/* Hashtag en overlay en bas de l'image */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))", padding: "24px 10px 8px" }}>
        <span className="oswald" style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{hashtag}</span>
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
      <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 480, maxHeight: "94vh", display: "flex", flexDirection: "column" }}>

        {/* En-tête */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #EAD9DB", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={32} />
            <span className="oswald" style={{ fontSize: 13, fontWeight: 700 }}>nimediasport</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#8A8375", fontSize: 24, lineHeight: 1, padding: "0 4px", cursor: "pointer" }}>×</button>
        </div>

        {/* Image */}
        <div style={{ aspectRatio: "4 / 5", background: "#F4EBEC", flexShrink: 0, overflow: "hidden" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 14px 4px", flexShrink: 0 }}>
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

        {/* Contenu scrollable */}
        <div style={{ overflowY: "auto", padding: "6px 14px 16px", flexShrink: 1 }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 8px", color: INK }}>
            {article.content || article.excerpt}
          </p>
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
            <label style={labelStyle}>Texte</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Décrivez votre actualité en quelques phrases…" />
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
            <label style={labelStyle}>Texte</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Texte complémentaire</label>
            <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <button onClick={() => onSave({ image, excerpt, content: content || excerpt, hashtag: (hashtag.startsWith("#") ? hashtag : "#"+hashtag).replace(/\s+/g,"") })} className="oswald" style={{ background: RED, color: WHITE, border: "none", borderRadius: 4, padding: "11px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>
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
{"excerpt": "légende du post, 2 à 3 phrases, ton dynamique et chaleureux", "content": "texte complémentaire un peu plus détaillé si pertinent, sinon identique à excerpt", "hashtag": "#UnHashtagEnCamelCase qui résume le sujet"}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const textBlock = (data.content || []).find((b) => b.type === "text");
      if (!textBlock) throw new Error("Réponse vide");
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setExcerpt(parsed.excerpt || "");
      setContent(parsed.content || parsed.excerpt || "");
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
    if (!image || !excerpt.trim()) {
      setError("L'image et le texte sont obligatoires — comme pour un post Instagram.");
      return;
    }
    setError("");
    let tag = hashtag.trim() || DEFAULT_HASHTAG;
    if (!tag.startsWith("#")) tag = `#${tag}`;
    tag = tag.replace(/\s+/g, "");
    await onPublish({
      image: image,
      excerpt: excerpt.trim(),
      content: content.trim() || excerpt.trim(),
      author: author.trim(),
      hashtag: tag,
    });
    setImage(""); setExcerpt(""); setContent(""); setAuthor("");
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
          <label style={labelStyle}>Texte</label>
          <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Le texte qui accompagne la photo." />
        </div>
        <div>
          <label style={labelStyle}>Texte complémentaire (optionnel, affiché en détail)</label>
          <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Des détails supplémentaires si besoin, affichés quand on ouvre le post." />
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
