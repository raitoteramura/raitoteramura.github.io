/* ============================================================
   ポートフォリオ コンテンツデータ — Raito Teramura
   ―――――――――――――――――――――――――――――――――――――――
   サイトの「中身」は全てこのファイルで管理しています。

   【動画の張り方】
   YouTubeのURLをそのまま貼っても、動画ID（11文字）だけ
   貼っても動きます。限定公開でも再生できます。

   ■ 2026-11 確認済み：
   「NEXT GENERATION」/「ザ・名電ショー2025」は
   "Video unavailable" になっているため掲載除外しています。
   公開設定に戻したら作品リストに追加してください。
   ============================================================ */

window.PORTFOLIO = {

  /* ―――――― 基本情報 ―――――― */
  name: "Raito Teramura",
  title: "CG Generalist",
  email: "raitoteramura@gmail.com",
  location: "Nagoya, Japan",

  socials: [
    { label: "X / Twitter", url: "https://x.com/RaitoTeramura" },
    { label: "YouTube",     url: "https://www.youtube.com/@RaitoTeramura" },
    { label: "TikTok",      url: "https://www.tiktok.com/@tara_mura" },
  ],

  /* ―――――― Showreel ――――――
     REEL2025（2026年1月公開） */
  showreel: {
    youtube: "https://www.youtube.com/watch?v=-8s_QW_NwJg",
  },

  /* ―――――― About ―――――― */
  about: {
    bio: `I'm Raito, an 18-year-old CG generalist from Nagoya, Japan, making video with everything I have. What started in 2020 as game footage and MAD edits grew into full 3D short films — I take one idea through modeling, animation, lighting, and final edit. My first TikTok post earned the Audience Award at JAPAN VERTICAL MV CONTEST 2023 (TikTok × Nippon TV), and my graduation piece 「僕はなりたい。」(2026) is the most personal work I've made so far. I love video that carries a message — a five-minute film can move someone as much as a two-hour one.`,

    tools: [
      "Blender", "Substance 3D Painter", "DaVinci Resolve", "Krita",
    ],

    career: [
      { year: "2026", role: "Graduation Piece 「僕はなりたい。」 released",            co: "Blender — 3D short film" },
      { year: "2025", role: "REEL 2025 / Robot Modeling Series",                      co: "YouTube — 12.2K subscribers" },
      { year: "2024", role: "Channel rebranded to \"Raito Teramura\"",                co: "Class festival 3D PR, MAD works" },
      { year: "2023", role: "Audience Prize, JAPAN VERTICAL MV CONTEST 2023",         co: "TikTok × Nippon TV — first TikTok post" },
      { year: "2020", role: "Started making video",                                   co: "Game highlights & MAD edits" },
    ],
  },

  /* ―――――― Selected Works（公開中・3年以内）――――――
     画像を置きたければ thumb: "works/01-thumb.jpg"  */
  works: [
    {
      id: "01",
      title: "僕はなりたい。",
      year: "2026",
      youtube: "https://www.youtube.com/watch?v=BgPKtZt6yXk",
      thumb: "",
      disciplines: "animation, lighting",
      desc: "Graduation piece — a boy finds his dream through drawing and SNS.",
    },
    {
      id: "02",
      title: "Robot Modeling",
      year: "2025",
      youtube: "https://www.youtube.com/watch?v=ynIJ7xiKVyU",
      thumb: "",
      disciplines: "modeling, texturing",
      desc: "Full robot modeling timelapse — Blender / Substance Painter.",
    },
    {
      id: "03",
      title: "Cultural Festival PR",
      year: "2024",
      youtube: "https://www.youtube.com/watch?v=6D9T7lhH4BA",
      thumb: "",
      disciplines: "modeling, direction",
      desc: "3D PR video for my class cultural festival — one week, zero sleep.",
    },
    {
      id: "04",
      title: "King Gnu 「一途」× Jujutsu Kaisen 0",
      year: "2024",
      youtube: "https://www.youtube.com/watch?v=YFgkvVc6VlY",
      thumb: "",
      disciplines: "editing",
      desc: "Still-image MAD — 4.3K views.",
    },
    {
      id: "05",
      title: "Happy Halloween",
      year: "2024",
      youtube: "https://www.youtube.com/watch?v=2L18WdUmp08",
      thumb: "",
      disciplines: "editing, vfx",
      desc: "Seasonal short.",
    },
    {
      id: "06",
      title: "2024 Reel",
      year: "2024",
      youtube: "https://www.youtube.com/watch?v=L-x4TRCq42w",
      thumb: "",
      disciplines: "animation, editing",
      desc: "Yearly reel of 2024's best work.",
    },
  ],

  /* ―――――― Pipeline（対応領域）――――――
     level: 0〜100（進度バーの長さ）— 自分に合う数値に調整してね */
  pipeline: [
    { name: "Animation",   desc: "Character performance, blocking, timing — story first.",        level: 85 },
    { name: "Lighting",    desc: "Light that tells the truth. Mood, air, and time of day.",      level: 90 },
    { name: "Modeling",    desc: "Characters & hard-surface. Topology-aware, production-clean.", level: 85 },
    { name: "Texturing",   desc: "PBR workflows with Substance — surfaces that feel used.",      level: 80 },
    { name: "Editing",     desc: "Rhythm, cuts, and sound. Where the message actually lands.",   level: 90 },
    { name: "VFX",         desc: "Particles, compositing touches, and final-image magic.",        level: 70 },
    { name: "Direction",   desc: "Framing, composition, and what you choose NOT to show.",       level: 85 },
    { name: "Motion",      desc: "Camera, parallax, and title movement that pulls people in.",   level: 75 },
  ],
};
