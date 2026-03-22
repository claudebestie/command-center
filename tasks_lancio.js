// ─── OBJECTIF DE LA SEMAINE ───────────────────────────────────
// Remplace le texte dans : objectifSemaine (ou weekGoal, ou la string d'objectif)

const objectifSemaine = "Lancer Lancio FR · Mockup gratuit sur Mizra + Lancio · Pologne live · 5 calls signés"

// ─── BLOC SEMAINE À COLLER ────────────────────────────────────
// Remplace l'ancien tableau de jours (weeks/days) par celui-ci
// Format identique à ce qui existe déjà dans ton code

const days = [
  {
    date: "dimanche 23 mars",
    habits: ["🇮🇱 Hébreu", "💪 Sport"],
    tasks: [
      {
        emoji: "🎨",
        label: "Ajouter mockup gratuit sur Lancio",
        tag: "Lancio",
        note: "Section homepage + landing dédiée — formulaire reçois ton mockup gratuit en 24h",
      },
      {
        emoji: "🎨",
        label: "Ajouter mockup gratuit sur Mizra",
        tag: "Mizra",
        note: "Adapter le copy en hébreu/anglais, CTA bien visible sur la homepage",
      },
      {
        emoji: "📊",
        label: "Process Datafest Lancio",
        tag: "Lancio",
        note: "Importer leads, nettoyer, segmenter par pays et secteur",
      },
      {
        emoji: "📊",
        label: "Process Datafest Mizra",
        tag: "Mizra",
        note: "Maintenir la base propre en parallèle",
      },
      {
        emoji: "🎯",
        label: "Définir positionnement Lancio vs Mizra",
        tag: "Lancio",
        note: "Angle, prix, garanties — mettre ça par écrit",
      },
      {
        emoji: "💼",
        label: "Offre de lancement — rédiger la proposition",
        tag: "Lancio",
        note: "Site en 48h, paiement après validation",
      },
      {
        emoji: "📧",
        label: "Séquence cold email Lancio — rédiger",
        tag: "Lancio",
        note: "3 emails : accroche → proof → offre limitée. Brevo ou Lemlist",
      },
    ],
  },
  {
    date: "lundi 24 mars",
    habits: ["🇮🇱 Hébreu"],
    tasks: [
      {
        emoji: "🔍",
        label: "Indexation GSC — Lancio",
        tag: "SEO",
        note: "Soumettre manuellement : homepage, /tarifs/, /audit-gratuit/, /services/restaurants/, /services/beaute/, /services/avocats/, /services/artisans/, /services/coaches/",
      },
      {
        emoji: "🔍",
        label: "Indexation GSC — Mizra",
        tag: "SEO",
        note: "Indexer les pages restantes — vérifier coverage report dans Search Console",
      },
      {
        emoji: "📄",
        label: "Créer pages sectorielles Lancio",
        tag: "SEO",
        note: "/services/restaurants/ · /services/coiffeurs/ · /services/coachs/ · /services/cliniques/",
      },
      {
        emoji: "📄",
        label: "Créer pages sectorielles Mizra manquantes",
        tag: "Mizra",
        note: "Vérifier dans GSC quelles URLs sont crawlées vs manquantes",
      },
      {
        emoji: "🇵🇱",
        label: "Lancer la Pologne — setup technique",
        tag: "Lancio",
        note: "Sous-domaine /pl, config DNS, Google Search Console, analytics",
      },
      {
        emoji: "🇵🇱",
        label: "Landing page Pologne en polonais natif",
        tag: "SEO",
        note: "strona internetowa dla małych firm — traduction pro, indexation immédiate GSC",
      },
      {
        emoji: "🕷️",
        label: "Scraper annuaire PME françaises",
        tag: "Lancio",
        note: "Pages Jaunes / Societe.com — 3 secteurs cibles : resto, beauté, artisans",
      },
      {
        emoji: "🎨",
        label: "Créer template témoignage / before-after",
        tag: "Contenu",
        note: "Visuel Canva prêt à remplir dès le 1er client — déclinable sur tous canaux",
      },
    ],
  },
  {
    date: "mardi 25 mars",
    habits: ["🇮🇱 Hébreu", "💪 Sport"],
    tasks: [
      {
        emoji: "📘",
        label: "LinkedIn Lancio — page + 4 posts planifiés",
        tag: "LinkedIn",
        note: "1/ Pourquoi Lancio · 2/ Coulisses 48h · 3/ Before/after · 4/ Mockup gratuit",
      },
      {
        emoji: "📘",
        label: "LinkedIn Mizra — 2 posts planifiés",
        tag: "Mizra",
        note: "Garder la présence active, réutiliser visuels existants",
      },
      {
        emoji: "📱",
        label: "Facebook Lancio — page + campagne test €5/jour",
        tag: "Meta Ads",
        note: "Accroche autour du mockup gratuit — ciblage PME France 25-55 ans, objectif leads",
      },
      {
        emoji: "📱",
        label: "Facebook Mizra — 2 posts planifiés",
        tag: "Mizra",
        note: "",
      },
      {
        emoji: "📧",
        label: "Lancer la séquence cold email",
        tag: "Lancio",
        note: "Importer leads scrapés dans Brevo — angle mockup gratuit en accroche",
      },
      {
        emoji: "🗂️",
        label: "Soumettre Lancio sur annuaires FR",
        tag: "SEO",
        note: "Trustpilot, Clutch, Malt, Kompass, Google Business Profile",
      },
      {
        emoji: "❓",
        label: "Rédiger FAQ client FR pour le site",
        tag: "Contenu",
        note: "Objections : délai 48h crédible ? Mockup → site garanti ? Hébergement ? Contrat ?",
      },
    ],
  },
  {
    date: "mercredi 26 mars",
    habits: ["🇮🇱 Hébreu"],
    tasks: [
      {
        emoji: "📞",
        label: "Calls Lancio — 5 prospects qualifiés",
        tag: "Sales",
        note: "Script 10 min : problème → mockup gratuit → démo → offre. Caler via email/LinkedIn",
      },
      {
        emoji: "💼",
        label: "Créer devis type Lancio pour marché FR",
        tag: "Sales",
        note: "Adapter le devis Mizra en version €, mentions légales FR, conditions paiement",
      },
      {
        emoji: "🤝",
        label: "Outreach partenariats agences FR",
        tag: "Growth",
        note: "5 agences SEO / copywriting / branding — email d'intro + apport d'affaires mutuel",
      },
      {
        emoji: "🤝",
        label: "Outreach ambassadeurs — freelances et coaches",
        tag: "Growth",
        note: "LinkedIn DM à 10 freelances FR bien connectés — programme 10%",
      },
      {
        emoji: "👥",
        label: "Rejoindre 5 groupes Facebook PME France",
        tag: "Growth",
        note: "entrepreneurs FR, TPE PME, groupes sectoriels — participer avant de pitcher",
      },
      {
        emoji: "✍️",
        label: "Rédiger 2 articles de blog SEO Lancio",
        tag: "SEO",
        note: "créer site web PME rapidement + agence web pas cher France — soumettre dans GSC après",
      },
      {
        emoji: "💬",
        label: "Poster sur Reddit FR et forums pro",
        tag: "Growth",
        note: "r/france, r/entrepreneur_fr, IndieHackers — partager l'approche mockup + 48h",
      },
      {
        emoji: "📄",
        label: "Créer page /partenaires sur Lancio",
        tag: "Lancio",
        note: "Programme ambassadeur 10% — page dédiée pour convaincre freelances de recommander",
      },
    ],
  },
  {
    date: "jeudi 27 mars",
    habits: ["🇮🇱 Hébreu", "💪 Sport"],
    tasks: [
      {
        emoji: "📧",
        label: "Suivi relances cold email — répondre aux replies",
        tag: "Lancio",
        note: "Qualifier les intéressés, caler des calls, archiver non-réponses",
      },
      {
        emoji: "📞",
        label: "Calls de relance — prospects chauds",
        tag: "Sales",
        note: "Rappeler ceux qui ont répondu aux emails ou demandé un mockup",
      },
      {
        emoji: "🔍",
        label: "Vérifier indexation GSC Lancio + Mizra",
        tag: "SEO",
        note: "Contrôler quelles pages sont crawlées, re-soumettre celles en erreur ou discovered not indexed",
      },
      {
        emoji: "⚡",
        label: "Optimiser Lancio pour conversion",
        tag: "CRO",
        note: "CTA mockup gratuit bien visible, formulaire simple, preuve sociale en homepage",
      },
      {
        emoji: "🎯",
        label: "Setup pixel Meta sur Lancio + Mizra",
        tag: "Meta Ads",
        note: "Retargeting des visiteurs pour les prochaines campagnes",
      },
      {
        emoji: "💬",
        label: "Installer WhatsApp widget sur Lancio",
        tag: "Lancio",
        note: "Les PME FR préfèrent WhatsApp / Messenger — réduire la friction de contact",
      },
      {
        emoji: "🌍",
        label: "Identifier 3 pays à lancer après la Pologne",
        tag: "Expansion",
        note: "Belgique, Suisse, Portugal — volume recherche + concurrence locale",
      },
      {
        emoji: "📊",
        label: "Bilan de la semaine + plan semaine suivante",
        tag: "Stratégie",
        note: "Quels canaux ont généré des leads ? Quel taux de réponse sur le mockup ?",
      },
    ],
  },
]
