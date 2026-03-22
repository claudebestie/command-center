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
    // DIMANCHE 23 MARS
    { id: 1,  text: "🎨 Ajouter mockup gratuit sur Lancio", project: "mizra", date: "2026-03-23", done: false, priority: "urgent", notes: "Section homepage + landing dédiée — formulaire reçois ton mockup gratuit en 24h" },
    { id: 2,  text: "🎨 Ajouter mockup gratuit sur Mizra", project: "mizra", date: "2026-03-23", done: false, priority: "urgent", notes: "Adapter le copy en hébreu/anglais, CTA bien visible sur la homepage" },
    { id: 3,  text: "📊 Process Datafest Lancio", project: "mizra", date: "2026-03-23", done: false, priority: "high", notes: "Importer leads, nettoyer, segmenter par pays et secteur" },
    { id: 4,  text: "📊 Process Datafest Mizra", project: "mizra", date: "2026-03-23", done: false, priority: "high", notes: "Maintenir la base propre en parallèle" },
    { id: 5,  text: "🎯 Définir positionnement Lancio vs Mizra", project: "mizra", date: "2026-03-23", done: false, priority: "high", notes: "Angle, prix, garanties — mettre ça par écrit" },
    { id: 6,  text: "💼 Offre de lancement — rédiger la proposition", project: "mizra", date: "2026-03-23", done: false, priority: "high", notes: "Site en 48h, paiement après validation" },
    { id: 7,  text: "📧 Séquence cold email Lancio — rédiger", project: "mizra", date: "2026-03-23", done: false, priority: "high", notes: "3 emails : accroche → proof → offre limitée. Brevo ou Lemlist" },
    // LUNDI 24 MARS
    { id: 8,  text: "🔍 Indexation GSC — Lancio", project: "mizra", date: "2026-03-24", done: false, priority: "urgent", notes: "Soumettre : homepage, /tarifs/, /audit-gratuit/, /services/restaurants/, /services/beaute/, /services/avocats/, /services/artisans/, /services/coaches/" },
    { id: 9,  text: "🔍 Indexation GSC — Mizra (pages restantes)", project: "mizra", date: "2026-03-24", done: false, priority: "urgent", notes: "Indexer les pages restantes — vérifier coverage report dans Search Console" },
    { id: 10, text: "📄 Créer pages sectorielles Lancio", project: "mizra", date: "2026-03-24", done: false, priority: "high", notes: "/services/restaurants/ · /services/coiffeurs/ · /services/coachs/ · /services/cliniques/" },
    { id: 11, text: "📄 Créer pages sectorielles Mizra manquantes", project: "mizra", date: "2026-03-24", done: false, priority: "high", notes: "Vérifier dans GSC quelles URLs sont crawlées vs manquantes" },
    { id: 12, text: "🇵🇱 Lancer la Pologne — setup technique", project: "mizra", date: "2026-03-24", done: false, priority: "high", notes: "Sous-domaine /pl, config DNS, Google Search Console, analytics" },
    { id: 13, text: "🇵🇱 Landing page Pologne en polonais natif", project: "mizra", date: "2026-03-24", done: false, priority: "high", notes: "strona internetowa dla małych firm — traduction pro, indexation immédiate GSC" },
    { id: 14, text: "🕷️ Scraper annuaire PME françaises", project: "mizra", date: "2026-03-24", done: false, priority: "medium", notes: "Pages Jaunes / Societe.com — 3 secteurs cibles : resto, beauté, artisans" },
    { id: 15, text: "🎨 Créer template témoignage / before-after", project: "mizra", date: "2026-03-24", done: false, priority: "medium", notes: "Visuel Canva prêt à remplir dès le 1er client — déclinable sur tous canaux" },
    // MARDI 25 MARS
    { id: 16, text: "📘 LinkedIn Lancio — page + 4 posts planifiés", project: "mizra", date: "2026-03-25", done: false, priority: "high", notes: "1/ Pourquoi Lancio · 2/ Coulisses 48h · 3/ Before/after · 4/ Mockup gratuit" },
    { id: 17, text: "📘 LinkedIn Mizra — 2 posts planifiés", project: "mizra", date: "2026-03-25", done: false, priority: "medium", notes: "Garder la présence active, réutiliser visuels existants" },
    { id: 18, text: "📱 Facebook Lancio — page + campagne test €5/jour", project: "mizra", date: "2026-03-25", done: false, priority: "high", notes: "Accroche autour du mockup gratuit — ciblage PME France 25-55 ans, objectif leads" },
    { id: 19, text: "📱 Facebook Mizra — 2 posts planifiés", project: "mizra", date: "2026-03-25", done: false, priority: "medium", notes: "" },
    { id: 20, text: "📧 Lancer la séquence cold email", project: "mizra", date: "2026-03-25", done: false, priority: "urgent", notes: "Importer leads scrapés dans Brevo — angle mockup gratuit en accroche" },
    { id: 21, text: "🗂️ Soumettre Lancio sur annuaires FR", project: "mizra", date: "2026-03-25", done: false, priority: "medium", notes: "Trustpilot, Clutch, Malt, Kompass, Google Business Profile" },
    { id: 22, text: "❓ Rédiger FAQ client FR pour le site", project: "mizra", date: "2026-03-25", done: false, priority: "medium", notes: "Objections : délai 48h crédible ? Mockup → site garanti ? Hébergement ? Contrat ?" },
    // MERCREDI 26 MARS
    { id: 23, text: "📞 Calls Lancio — 5 prospects qualifiés", project: "mizra", date: "2026-03-26", done: false, priority: "urgent", notes: "Script 10 min : problème → mockup gratuit → démo → offre. Caler via email/LinkedIn" },
    { id: 24, text: "💼 Créer devis type Lancio pour marché FR", project: "mizra", date: "2026-03-26", done: false, priority: "high", notes: "Adapter le devis Mizra en version €, mentions légales FR, conditions paiement" },
    { id: 25, text: "🤝 Outreach partenariats agences FR", project: "mizra", date: "2026-03-26", done: false, priority: "high", notes: "5 agences SEO / copywriting / branding — email d'intro + apport d'affaires mutuel" },
    { id: 26, text: "🤝 Outreach ambassadeurs — freelances et coaches", project: "mizra", date: "2026-03-26", done: false, priority: "high", notes: "LinkedIn DM à 10 freelances FR bien connectés — programme 10%" },
    { id: 27, text: "👥 Rejoindre 5 groupes Facebook PME France", project: "mizra", date: "2026-03-26", done: false, priority: "medium", notes: "entrepreneurs FR, TPE PME, groupes sectoriels — participer avant de pitcher" },
    { id: 28, text: "✍️ Rédiger 2 articles de blog SEO Lancio", project: "mizra", date: "2026-03-26", done: false, priority: "medium", notes: "créer site web PME rapidement + agence web pas cher France — soumettre dans GSC après" },
    { id: 29, text: "💬 Poster sur Reddit FR et forums pro", project: "mizra", date: "2026-03-26", done: false, priority: "medium", notes: "r/france, r/entrepreneur_fr, IndieHackers — partager l'approche mockup + 48h" },
    { id: 30, text: "📄 Créer page /partenaires sur Lancio", project: "mizra", date: "2026-03-26", done: false, priority: "medium", notes: "Programme ambassadeur 10% — page dédiée pour convaincre freelances de recommander" },
    // JEUDI 27 MARS
    { id: 31, text: "📧 Suivi relances cold email — répondre aux replies", project: "mizra", date: "2026-03-27", done: false, priority: "urgent", notes: "Qualifier les intéressés, caler des calls, archiver non-réponses" },
    { id: 32, text: "📞 Calls de relance — prospects chauds", project: "mizra", date: "2026-03-27", done: false, priority: "urgent", notes: "Rappeler ceux qui ont répondu aux emails ou demandé un mockup" },
    { id: 33, text: "🔍 Vérifier indexation GSC Lancio + Mizra", project: "mizra", date: "2026-03-27", done: false, priority: "high", notes: "Contrôler pages crawlées, re-soumettre celles en erreur ou discovered not indexed" },
    { id: 34, text: "⚡ Optimiser Lancio pour conversion", project: "mizra", date: "2026-03-27", done: false, priority: "high", notes: "CTA mockup gratuit bien visible, formulaire simple, preuve sociale en homepage" },
    { id: 35, text: "🎯 Setup pixel Meta sur Lancio + Mizra", project: "mizra", date: "2026-03-27", done: false, priority: "medium", notes: "Retargeting des visiteurs pour les prochaines campagnes" },
    { id: 36, text: "💬 Installer WhatsApp widget sur Lancio", project: "mizra", date: "2026-03-27", done: false, priority: "medium", notes: "Les PME FR préfèrent WhatsApp / Messenger — réduire la friction de contact" },
    { id: 37, text: "🌍 Identifier 3 pays à lancer après la Pologne", project: "mizra", date: "2026-03-27", done: false, priority: "medium", notes: "Belgique, Suisse, Portugal — volume recherche + concurrence locale" },
    { id: 38, text: "📊 Bilan semaine + plan semaine suivante", project: "mizra", date: "2026-03-27", done: false, priority: "high", notes: "Quels canaux ont généré des leads ? Quel taux de réponse sur le mockup ?" },
  ],
  weekGoal: "Lancer Lancio FR · Mockup gratuit sur Mizra + Lancio · Pologne live · 5 calls signés",
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

const Day = ({ label, date, todos, dispatch, isToday, isPast, habitLog }) => {
  const pending = todos.filter(t => !t.done);
  const done = todos.filter(t => t.done);
  const dayOfWeek = new Date(date + "T12:00:00").getDay(); // 0=Sun

  // Hebrew: Sun-Thu (0-4), Sport: Sun/Tue/Thu (0,2,4)
  const showHebrew = dayOfWeek >= 0 && dayOfWeek <= 4;
  const showSport = dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4;
  const hebrewKey = `hebrew_${date}`;
  const sportKey = `sport_${date}`;
  const hebrewDone = habitLog?.[hebrewKey];
  const sportDone = habitLog?.[sportKey];

  if (isPast && todos.length === 0) return null;

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        {isToday && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0EA5E9", boxShadow: "0 0 10px #0EA5E944" }} />}
        <span style={{ fontSize: isToday ? 17 : 13, fontWeight: isToday ? 700 : 600, color: isPast ? "#CBD5E1" : "#0F172A", letterSpacing: "-0.02em" }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: isToday ? "#BAE6FD" : "#F1F5F9" }} />
        {pending.length > 0 && <span style={{ fontSize: 10, fontWeight: 600, color: isToday ? "#0EA5E9" : "#94A3B8" }}>{pending.length}</span>}
      </div>

      {/* Habit checkboxes */}
      {(showHebrew || showSport) && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10, paddingLeft: isToday ? 18 : 0 }}>
          {showHebrew && (
            <div onClick={() => dispatch({ type: "HABIT", habit: "hebrew", date })}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, cursor: "pointer", background: hebrewDone ? "#D4A03C12" : "#F8FAFB", border: `1px solid ${hebrewDone ? "#D4A03C" : "#E2E8F0"}`, transition: "all 0.15s" }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, border: hebrewDone ? "none" : "1.5px solid #D4A03C55", background: hebrewDone ? "#D4A03C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                {hebrewDone && <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: hebrewDone ? "#D4A03C" : "#94A3B8" }}>🇮🇱 Hébreu</span>
            </div>
          )}
          {showSport && (
            <div onClick={() => dispatch({ type: "HABIT", habit: "sport", date })}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, cursor: "pointer", background: sportDone ? "#EF444412" : "#F8FAFB", border: `1px solid ${sportDone ? "#EF4444" : "#E2E8F0"}`, transition: "all 0.15s" }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, border: sportDone ? "none" : "1.5px solid #EF444455", background: sportDone ? "#EF4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                {sportDone && <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: sportDone ? "#EF4444" : "#94A3B8" }}>💪 Sport</span>
            </div>
          )}
        </div>
      )}

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

        {/* Quick Add */}
        <Add dispatch={dispatch} />

        {/* Hier (done only) */}
        {yesterdayTodos.length > 0 && (
          <Day label={fmtDate(ds(-1))} date={ds(-1)} todos={yesterdayTodos} dispatch={dispatch} isToday={false} isPast={true} habitLog={state.habitLog} />
        )}

        {/* Aujourd'hui */}
        <Day label={fmtDate(ds())} date={ds()} todos={todayTodos} dispatch={dispatch} isToday={true} isPast={false} habitLog={state.habitLog} />

        {/* Future days — show any day that has tasks, up to 14 days */}
        {Array.from({ length: 14 }, (_, i) => i + 1).map(offset => {
          const d = ds(offset);
          const todos = state.todos.filter(t => t.date === d);
          if (todos.length === 0) return null;
          return <Day key={d} label={fmtDate(d)} date={d} todos={todos} dispatch={dispatch} isToday={false} isPast={false} habitLog={state.habitLog} />;
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
