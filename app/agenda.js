"use client";
import { useState, useEffect, useReducer } from "react";

// ─── Config ────────────────────────────────────────────────────

const TAGS = {
  beyit: { label: "Beyit", color: "#D4846A", emoji: "🏠" },
  levantedit: { label: "Levant Edit", color: "#B07BAC", emoji: "✨" },
  mizra: { label: "Mizra", color: "#0EA5E9", emoji: "🍽" },
  venteappart: { label: "Vente Appart", color: "#E67E22", emoji: "🏢" },
  airbnb: { label: "Airbnb", color: "#FF5A5F", emoji: "🛏" },
  client: { label: "Client", color: "#6366F1", emoji: "👤" },
  perso: { label: "Perso", color: "#8B5CF6", emoji: "💜" },
};

const PROJECTS = [
  { id: "beyit", name: "Beyit", tag: "beyit" },
  { id: "levantedit", name: "Levant Edit", tag: "levantedit" },
  { id: "mizra", name: "Mizra", tag: "mizra" },
  { id: "venteappart", name: "Vente Appart", tag: "venteappart" },
  { id: "airbnb", name: "Airbnb", tag: "airbnb" },
  { id: "cl_boucherie", name: "Boucherie Fr.", tag: "client" },
  { id: "cl_zinzino", name: "Zinzino", tag: "client" },
];

const DAYS_FR = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

const ds = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().split("T")[0]; };

const fmtDate = (s) => {
  if (s === ds(0)) return "Aujourd'hui";
  if (s === ds(-1)) return "Hier";
  if (s === ds(1)) return "Demain";
  const d = new Date(s + "T12:00:00");
  return DAYS_FR[d.getDay()] + " " + d.getDate() + " " + MONTHS_FR[d.getMonth()];
};

// ─── State ─────────────────────────────────────────────────────

const init = {
  todos: [
    // DIMANCHE 8 MARS
    { id: 1, text: "📧 Emails campagne 1 + 2 → vérifier programmation", project: "mizra", date: "2026-03-08", done: false, priority: "high", notes: "Déjà programmés dans Brevo" },
    { id: 2, text: "📱 WATI → vérifier que la campagne WhatsApp part bien", project: "mizra", date: "2026-03-08", done: false, priority: "urgent", notes: "" },
    { id: 3, text: "🖨️ Envoyer email devis Galsi (03-685-8604) + Touch Print (052-268-9024)", project: "mizra", date: "2026-03-08", done: false, priority: "high", notes: "Devis impression flyers" },
    { id: 4, text: "🔍 GSC → soumettre 10 URLs batch 1", project: "mizra", date: "2026-03-08", done: false, priority: "high", notes: "Homepage, pricing, free-audit, 7 services pages" },
    { id: 5, text: "📸 Publier post Instagram #1 + activer Kodo", project: "mizra", date: "2026-03-08", done: false, priority: "medium", notes: "" },
    { id: 6, text: "🐦 Post X #1 : lancer la série build in public", project: "mizra", date: "2026-03-08", done: false, priority: "medium", notes: "" },
    // LUNDI 9 MARS
    { id: 7, text: "🔍 GSC → 10 nouvelles URLs batch 2", project: "mizra", date: "2026-03-09", done: false, priority: "high", notes: "sports-coach, therapist + 8 landing pages" },
    { id: 8, text: "🕷️ Lancer scraping Wolt sans site", project: "mizra", date: "2026-03-09", done: false, priority: "urgent", notes: "PRIORITÉ ABSOLUE — restos sur Wolt sans site web" },
    { id: 9, text: "🕷️ Lancer scraping Google Maps via Lobstr", project: "mizra", date: "2026-03-09", done: false, priority: "urgent", notes: "Restaurants + cafés TLV" },
    { id: 10, text: "⚙️ Zapier Flow 1 : Supabase new lead → Brevo séquence email", project: "mizra", date: "2026-03-09", done: false, priority: "urgent", notes: "🔴 Priorité 1 — Impact immédiat" },
    { id: 11, text: "⚙️ Zapier Flow 2 : Supabase new lead → WATI WhatsApp", project: "mizra", date: "2026-03-09", done: false, priority: "urgent", notes: "🔴 Priorité 2 — Impact immédiat" },
    { id: 12, text: "📸 Post Instagram #2", project: "mizra", date: "2026-03-09", done: false, priority: "medium", notes: "" },
    { id: 13, text: "🐦 Post X #2", project: "mizra", date: "2026-03-09", done: false, priority: "medium", notes: "" },
    // MARDI 10 MARS
    { id: 14, text: "🔍 GSC → 10 nouvelles URLs batch 3", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "Pages blog + pages villes" },
    { id: 15, text: "🕷️ Scraping b144.co.il (salons, cliniques, avocats, contractors)", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "" },
    { id: 16, text: "🕷️ Scraping Instagram hashtags (#תלאביב #מסעדות #קפה #ספא)", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "" },
    { id: 17, text: "✅ Confirmer devis imprimerie → envoyer fichier flyer PDF", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "" },
    { id: 18, text: "⚙️ Zapier Flow 3 : Schedule → Claude API → article blog → GitHub", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "🟡 Priorité 3 — Fort impact long terme" },
    { id: 19, text: "📸 Post Instagram #3", project: "mizra", date: "2026-03-10", done: false, priority: "medium", notes: "" },
    { id: 20, text: "🐦 Post X #3", project: "mizra", date: "2026-03-10", done: false, priority: "medium", notes: "" },
    { id: 21, text: "✍️ Article blog #1 publié (généré via Claude)", project: "mizra", date: "2026-03-10", done: false, priority: "high", notes: "" },
    // MERCREDI 11 MARS
    { id: 22, text: "🔍 GSC → 10 nouvelles URLs batch 4", project: "mizra", date: "2026-03-11", done: false, priority: "high", notes: "" },
    { id: 23, text: "🖨️ Récupérer les flyers imprimés", project: "mizra", date: "2026-03-11", done: false, priority: "high", notes: "" },
    { id: 24, text: "🕷️ Scraping FB groupes francophones TLV", project: "mizra", date: "2026-03-11", done: false, priority: "medium", notes: "" },
    { id: 25, text: "📞 Appeler leads chauds (ouverts email 2x+ sans réponse)", project: "mizra", date: "2026-03-11", done: false, priority: "urgent", notes: "" },
    { id: 26, text: "✍️ Article blog #2 publié", project: "mizra", date: "2026-03-11", done: false, priority: "medium", notes: "Auto ou manuel" },
    { id: 27, text: "📸 Post Instagram #4 + Story terrain", project: "mizra", date: "2026-03-11", done: false, priority: "medium", notes: "" },
    { id: 28, text: "🐦 Thread X #1 (story Mizra / build in public)", project: "mizra", date: "2026-03-11", done: false, priority: "medium", notes: "" },
    // JEUDI 12 MARS
    { id: 29, text: "🔍 GSC → 10 nouvelles URLs batch 5", project: "mizra", date: "2026-03-12", done: false, priority: "high", notes: "" },
    { id: 30, text: "🏃 1ère tournée terrain : Florentin + Neve Tzedek + Rothschild", project: "mizra", date: "2026-03-12", done: false, priority: "urgent", notes: "Flyers + démarchage direct" },
    { id: 31, text: "📱 Vérifier réponses WATI → closer les intéressés", project: "mizra", date: "2026-03-12", done: false, priority: "high", notes: "" },
    { id: 32, text: "✍️ Article blog #3 publié (auto)", project: "mizra", date: "2026-03-12", done: false, priority: "medium", notes: "" },
    { id: 33, text: "📸 Post Instagram #5 (Reel #1 : site créé en 48h)", project: "mizra", date: "2026-03-12", done: false, priority: "high", notes: "" },
    { id: 34, text: "🐦 Post X #4", project: "mizra", date: "2026-03-12", done: false, priority: "medium", notes: "" },
    // VENDREDI 13 MARS
    { id: 35, text: "🔍 GSC → 10 nouvelles URLs batch 6", project: "mizra", date: "2026-03-13", done: false, priority: "high", notes: "" },
    { id: 36, text: "📧 Relance email manuelle leads chauds non-convertis", project: "mizra", date: "2026-03-13", done: false, priority: "high", notes: "" },
    { id: 37, text: "🕷️ Nouveau batch scraping Wolt + Maps", project: "mizra", date: "2026-03-13", done: false, priority: "medium", notes: "" },
    { id: 38, text: "🗂️ Préparer banque contenu semaine suivante (7 visuels Canva + captions)", project: "mizra", date: "2026-03-13", done: false, priority: "medium", notes: "" },
    { id: 39, text: "✍️ Article blog #4 publié (auto)", project: "mizra", date: "2026-03-13", done: false, priority: "medium", notes: "" },
    { id: 40, text: "📸 Post Instagram #6", project: "mizra", date: "2026-03-13", done: false, priority: "medium", notes: "" },
    { id: 41, text: "🐦 Post X #5", project: "mizra", date: "2026-03-13", done: false, priority: "medium", notes: "" },
    // DIMANCHE 15 MARS
    { id: 42, text: "🔍 GSC → 10 nouvelles URLs batch 7", project: "mizra", date: "2026-03-15", done: false, priority: "high", notes: "" },
    { id: 43, text: "📧 Email Campagne 3 : nouveaux leads scrapés semaine 1", project: "mizra", date: "2026-03-15", done: false, priority: "urgent", notes: "Zapier ou manuel" },
    { id: 44, text: "📱 WATI Wave 2 : batch leads scrapés semaine 1", project: "mizra", date: "2026-03-15", done: false, priority: "urgent", notes: "" },
    { id: 45, text: "🏃 2ème tournée terrain : Ibn Gvirol + Dizengoff + Ben Yehuda", project: "mizra", date: "2026-03-15", done: false, priority: "urgent", notes: "Flyers + démarchage direct" },
    { id: 46, text: "✍️ Article blog #5 publié (auto)", project: "mizra", date: "2026-03-15", done: false, priority: "medium", notes: "" },
    { id: 47, text: "📸 Post Instagram #7", project: "mizra", date: "2026-03-15", done: false, priority: "medium", notes: "" },
    { id: 48, text: "🐦 Thread X #2 : Ce que j'ai appris en prospectant 1400 restos", project: "mizra", date: "2026-03-15", done: false, priority: "high", notes: "" },
    // LUNDI 16 MARS
    { id: 49, text: "🔍 GSC → 10 nouvelles URLs batch 8", project: "mizra", date: "2026-03-16", done: false, priority: "high", notes: "" },
    { id: 50, text: "🕷️ Scraping b144 nouveau batch + Wolt update", project: "mizra", date: "2026-03-16", done: false, priority: "medium", notes: "" },
    { id: 51, text: "⚙️ Vérifier que tous les Zapier tournent correctement", project: "mizra", date: "2026-03-16", done: false, priority: "high", notes: "" },
    { id: 52, text: "📞 Closing sprint : appeler tous les leads chauds", project: "mizra", date: "2026-03-16", done: false, priority: "urgent", notes: "" },
    { id: 53, text: "✍️ Article blog #6 (auto)", project: "mizra", date: "2026-03-16", done: false, priority: "medium", notes: "" },
    { id: 54, text: "📸 Post Instagram #8 (Reel #2 : before/after ou démo site)", project: "mizra", date: "2026-03-16", done: false, priority: "high", notes: "" },
    { id: 55, text: "🐦 Post X #6", project: "mizra", date: "2026-03-16", done: false, priority: "medium", notes: "" },
  ],
  weekGoal: "Lancer Zapier Flows 1+2 · Scraping Wolt + Maps + b144 · Tournée terrain Florentin · 5 clients signés",
  habitLog: {},
};

function reducer(state, a) {
  switch (a.type) {
    case "ADD": return { ...state, todos: [...state.todos, { id: Date.now() + Math.random(), text: a.text, project: a.project || null, date: a.date || ds(), done: false, priority: a.priority || "medium", notes: "" }] };
    case "TOGGLE": return { ...state, todos: state.todos.map(t => t.id === a.id ? { ...t, done: !t.done } : t) };
    case "DELETE": return { ...state, todos: state.todos.filter(t => t.id !== a.id) };
    case "NOTE": return { ...state, todos: state.todos.map(t => t.id === a.id ? { ...t, notes: a.notes } : t) };
    case "MOVE": return { ...state, todos: state.todos.map(t => t.id === a.id ? { ...t, date: a.date } : t) };
    case "PRI": return { ...state, todos: state.todos.map(t => t.id === a.id ? { ...t, priority: a.priority } : t) };
    case "GOAL": return { ...state, weekGoal: a.text };
    case "HABIT": { const key = `${a.habit}_${a.date}`; return { ...state, habitLog: { ...state.habitLog, [key]: !state.habitLog[key] } }; }
    case "ROLLOVER": {
      const today = ds();
      return { ...state, todos: state.todos.map(t => (!t.done && t.date < today) ? { ...t, date: today } : t) };
    }
    default: return state;
  }
}

const KEY = "cc-v3";
const load = () => { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch { return null; } };
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify({ todos: s.todos, weekGoal: s.weekGoal, habitLog: s.habitLog })); } catch {} };

// ─── Todo Item ─────────────────────────────────────────────────

const PriDot = ({ p }) => {
  const c = { urgent: "#EF4444", high: "#F59E0B", medium: "transparent", low: "transparent" };
  if (p === "medium" || p === "low") return null;
  return <span style={{ width: 6, height: 6, borderRadius: "50%", background: c[p], flexShrink: 0, marginTop: 1 }} />;
};

const Todo = ({ t, dispatch, showProject }) => {
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(t.notes || "");
  const proj = PROJECTS.find(p => p.id === t.project);

  const projColor = proj ? (TAGS[proj.tag]?.color || "#E2E8F0") : "transparent";

  return (
    <div style={{ display: "flex", gap: 10, padding: "12px 0 12px 12px", borderBottom: "1px solid #F1F5F9", borderLeft: `3px solid ${projColor}`, marginLeft: -1, opacity: t.done ? 0.3 : 1, transition: "opacity 0.2s" }}>
      <div onClick={() => dispatch({ type: "TOGGLE", id: t.id })}
        style={{ width: 18, height: 18, borderRadius: 6, border: t.done ? "none" : "1.5px solid #CBD5E1", background: t.done ? "#10B981" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 1, transition: "all 0.15s" }}>
        {t.done && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <PriDot p={t.priority} />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", textDecoration: t.done ? "line-through" : "none", textDecorationColor: "#CBD5E1" }}>{t.text}</span>
        </div>
        {showProject && proj && <span style={{ fontSize: 10, color: TAGS[proj.tag]?.color || "#94A3B8", marginTop: 2, display: "block" }}>{TAGS[proj.tag]?.emoji} {proj.name}</span>}
        {t.notes && !noteOpen && <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3 }}>{t.notes}</div>}
        {noteOpen && <textarea value={note} onChange={e => setNote(e.target.value)} onBlur={() => { dispatch({ type: "NOTE", id: t.id, notes: note }); setNoteOpen(false); }} placeholder="Note..." autoFocus style={{ width: "100%", marginTop: 6, border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 10px", fontSize: 12, outline: "none", resize: "none", minHeight: 34, color: "#0F172A", background: "#F8FAFB", fontFamily: "inherit" }} />}
      </div>
      {!t.done && (
        <div style={{ display: "flex", gap: 4, opacity: 0.2, alignItems: "start", paddingTop: 2 }}>
          <span onClick={() => setNoteOpen(!noteOpen)} style={{ cursor: "pointer", fontSize: 10, padding: 2 }}>📝</span>
          <span onClick={() => dispatch({ type: "MOVE", id: t.id, date: ds(1) })} style={{ cursor: "pointer", fontSize: 10, padding: 2 }} title="Demain">→</span>
          <span onClick={() => dispatch({ type: "DELETE", id: t.id })} style={{ cursor: "pointer", fontSize: 10, padding: 2 }}>✕</span>
        </div>
      )}
    </div>
  );
};

// ─── Day Section ───────────────────────────────────────────────

const Day = ({ label, todos, dispatch, isToday, isPast }) => {
  const pending = todos.filter(t => !t.done);
  const done = todos.filter(t => t.done);

  if (isPast && todos.length === 0) return null;

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        {isToday && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0EA5E9", boxShadow: "0 0 10px #0EA5E944" }} />}
        <span style={{ fontSize: isToday ? 17 : 13, fontWeight: isToday ? 700 : 600, color: isPast ? "#CBD5E1" : "#0F172A", letterSpacing: "-0.02em" }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: isToday ? "#BAE6FD" : "#F1F5F9" }} />
        {pending.length > 0 && <span style={{ fontSize: 10, fontWeight: 600, color: isToday ? "#0EA5E9" : "#94A3B8" }}>{pending.length}</span>}
      </div>

      {pending.map(t => <Todo key={t.id} t={t} dispatch={dispatch} showProject={true} />)}

      {done.length > 0 && (
        <details>
          <summary style={{ fontSize: 11, color: "#CBD5E1", cursor: "pointer", padding: "6px 0", userSelect: "none" }}>{done.length} terminée{done.length > 1 ? "s" : ""}</summary>
          {done.map(t => <Todo key={t.id} t={t} dispatch={dispatch} showProject={false} />)}
        </details>
      )}

      {todos.length === 0 && (
        <div style={{ padding: "14px 0", fontSize: 12, color: "#D4D4D8", fontStyle: "italic" }}>
          {isToday ? "Rien de prévu 🌊" : "—"}
        </div>
      )}
    </div>
  );
};

// ─── Quick Add ─────────────────────────────────────────────────

const Add = ({ dispatch }) => {
  const [text, setText] = useState("");
  const [proj, setProj] = useState("");
  const [date, setDate] = useState(ds());
  const [open, setOpen] = useState(false);

  const go = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD", text: text.trim(), project: proj || null, date });
    setText(""); setOpen(false); setDate(ds());
  };

  return (
    <div style={{ marginBottom: 32, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ color: "#CBD5E1", fontSize: 16, fontWeight: 300 }}>+</span>
        <input value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") go(); }}
          onFocus={() => setOpen(true)}
          placeholder="Ajouter une tâche..."
          style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#0F172A", background: "transparent", fontFamily: "inherit" }}
        />
        {text && <span onClick={go} style={{ fontSize: 11, fontWeight: 600, color: "#0EA5E9", cursor: "pointer", padding: "4px 10px", background: "#F0F9FF", borderRadius: 6 }}>↵</span>}
      </div>
      {open && text && (
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
          {[{ d: ds(), l: "Auj" }, { d: ds(1), l: "Demain" }, { d: ds(2), l: "J+2" }, { d: ds(3), l: "J+3" }, { d: ds(7), l: "Sem. pro" }].map(({ d, l }) => (
            <span key={d} onClick={() => setDate(d)} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: "pointer", color: date === d ? "#fff" : "#64748B", background: date === d ? "#0F172A" : "#F1F5F9", transition: "all 0.15s" }}>{l}</span>
          ))}
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ fontSize: 10, border: "1px solid #E2E8F0", borderRadius: 6, padding: "3px 6px", color: "#64748B", fontFamily: "inherit", outline: "none" }} />
          <div style={{ width: 1, height: 14, background: "#E2E8F0", margin: "0 2px" }} />
          {PROJECTS.map(p => (
            <span key={p.id} onClick={() => setProj(proj === p.id ? "" : p.id)}
              style={{ fontSize: 12, cursor: "pointer", padding: "2px 4px", borderRadius: 4, background: proj === p.id ? (TAGS[p.tag]?.color || "#0F172A") + "18" : "transparent", transition: "all 0.15s" }}
              title={p.name}>
              {TAGS[p.tag]?.emoji}
            </span>
          ))}
        </div>
      )}
      {open && text && date !== ds() && date !== ds(1) && (
        <div style={{ marginTop: 6, fontSize: 10, color: "#94A3B8" }}>
          → programmée pour <strong style={{ color: "#0F172A" }}>{fmtDate(date)}</strong>
        </div>
      )}
    </div>
  );
};

// ─── Habits Monthly Calendar ───────────────────────────────────

const HABITS = [
  { id: "hebrew", name: "Hébreu", emoji: "🇮🇱", color: "#D4A03C", days: [0,1,2,3,4] },
  { id: "sport", name: "Sport", emoji: "💪", color: "#EF4444", days: [1,3,5] },
];

const HabitsMonth = ({ habitLog, dispatch }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = ds();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Build calendar grid
  const cells = [];
  // Offset for first day (Sunday = 0)
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ marginBottom: 36, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "16px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 14, letterSpacing: "-0.02em" }}>
        {MONTHS_FR[month]} {year}
      </div>

      {HABITS.map(habit => {
        const checkedCount = Array.from({ length: daysInMonth }, (_, i) => {
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
          return habitLog[`${habit.id}_${dateKey}`] ? 1 : 0;
        }).reduce((a, b) => a + b, 0);

        return (
          <div key={habit.id} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{habit.emoji} {habit.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: habit.color }}>{checkedCount}j</span>
            </div>

            {/* Day labels */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 2 }}>
              {["D","L","M","M","J","V","S"].map((d, i) => (
                <div key={i} style={{ fontSize: 8, fontWeight: 600, color: "#CBD5E1", textAlign: "center", padding: "0 0 2px" }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isChecked = habitLog[`${habit.id}_${dateKey}`];
                const isToday = dateKey === today;
                const dayOfWeek = new Date(year, month, day).getDay();
                const isTarget = habit.days.includes(dayOfWeek);
                const isFuture = dateKey > today;

                return (
                  <div key={i}
                    onClick={() => !isFuture && isTarget && dispatch({ type: "HABIT", habit: habit.id, date: dateKey })}
                    style={{
                      width: "100%", aspectRatio: "1", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: isToday ? 700 : 500,
                      cursor: !isFuture && isTarget ? "pointer" : "default",
                      background: isChecked ? habit.color : isToday ? habit.color + "12" : "transparent",
                      color: isChecked ? "#fff" : isFuture ? "#E2E8F0" : isTarget ? "#0F172A" : "#E2E8F0",
                      border: isToday ? `1.5px solid ${habit.color}` : "1.5px solid transparent",
                      transition: "all 0.15s",
                    }}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── App ───────────────────────────────────────────────────────

export default function Agenda() {
  const [state, dispatch] = useReducer(reducer, init, (i) => load() || i);
  const [editGoal, setEditGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState(state.weekGoal);

  useEffect(() => { const t = setTimeout(() => save(state), 300); return () => clearTimeout(t); }, [state]);

  // Auto-rollover: undone tasks from past days → today
  useEffect(() => { dispatch({ type: "ROLLOVER" }); }, []);

  const todayTodos = state.todos.filter(t => t.date === ds());
  const yesterdayTodos = state.todos.filter(t => t.date === ds(-1));

  const todayDone = todayTodos.filter(t => t.done).length;
  const todayTotal = todayTodos.length;
  const rate = todayTotal > 0 ? Math.round((todayDone / todayTotal) * 100) : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Boker tov" : hour < 18 ? "Tsohorayim tovim" : "Erev tov";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Outfit',system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:#F8FAFB}
        ::selection{background:#BAE6FD}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:2px}
        details>summary{list-style:none}details>summary::-webkit-details-marker{display:none}
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
      `}} />

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "48px 20px 100px", minHeight: "100vh", animation: "fadeIn 0.4s ease" }}>

        {/* Greeting */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.04em" }}>{greeting}, Margaux</h1>
            <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 3 }}>
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          {todayTotal > 0 && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: rate === 100 ? "#10B981" : "#0F172A", letterSpacing: "-0.04em", transition: "color 0.3s" }}>{rate}%</div>
              <div style={{ fontSize: 10, color: "#94A3B8" }}>{todayDone}/{todayTotal}</div>
            </div>
          )}
        </div>

        {/* Week Goal */}
        <div style={{ marginBottom: 32, padding: "14px 18px", borderRadius: 12, background: "#0F172A", color: "#fff" }}>
          <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>🎯 objectif de la semaine</div>
          {editGoal ? (
            <input value={goalDraft} onChange={e => setGoalDraft(e.target.value)}
              onBlur={() => { dispatch({ type: "GOAL", text: goalDraft }); setEditGoal(false); }}
              onKeyDown={e => { if (e.key === "Enter") { dispatch({ type: "GOAL", text: goalDraft }); setEditGoal(false); } }}
              autoFocus
              style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", padding: "6px 10px", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit" }} />
          ) : (
            <div onClick={() => { setGoalDraft(state.weekGoal); setEditGoal(true); }}
              style={{ fontSize: 14, fontWeight: 600, cursor: "pointer", lineHeight: 1.5 }}>
              {state.weekGoal || "Clique pour définir..."}
            </div>
          )}
        </div>

        {/* Habits */}
        <HabitsMonth habitLog={state.habitLog} dispatch={dispatch} />

        {/* Quick Add */}
        <Add dispatch={dispatch} />

        {/* Hier (done only) */}
        {yesterdayTodos.length > 0 && (
          <Day label={fmtDate(ds(-1))} todos={yesterdayTodos} dispatch={dispatch} isToday={false} isPast={true} />
        )}

        {/* Aujourd'hui */}
        <Day label={fmtDate(ds())} todos={todayTodos} dispatch={dispatch} isToday={true} isPast={false} />

        {/* Future days — show any day that has tasks, up to 14 days */}
        {Array.from({ length: 14 }, (_, i) => i + 1).map(offset => {
          const d = ds(offset);
          const todos = state.todos.filter(t => t.date === d);
          if (todos.length === 0) return null;
          return <Day key={d} label={fmtDate(d)} todos={todos} dispatch={dispatch} isToday={false} isPast={false} />;
        })}

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#D4D4D8" }}>💾 auto</span>
          <span onClick={() => { if (confirm("Tout effacer ?")) { localStorage.removeItem(KEY); window.location.reload(); }}} style={{ fontSize: 10, color: "#EF4444", cursor: "pointer", opacity: 0.25 }}>Reset</span>
        </div>
      </div>
    </>
  );
}
