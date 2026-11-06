/* ============================================================
   Portfolio site — main logic
   Render works / pipeline / about / contact from data.js
   ============================================================ */

const P = window.PORTFOLIO;

/* ---------- helpers ---------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* YouTube URLを動画IDに変換（URL全体を貼り付けても対応） */
function toVideoId(input) {
  if (!input) return "";
  const m = input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
          || input.match(/^([\w-]{11})$/);
  return m ? m[1] : input;
}
const embedUrl = (id, autoplay = false) =>
  `https://www.youtube.com/embed/${toVideoId(id)}?rel=0${autoplay ? "&autoplay=1" : ""}`;

/* ---------- NAV ---------- */
const nav = $("#nav");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 40));

const burger = $("#burger");
burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  $(".nav__links").classList.toggle("is-open");
});
$$(".nav__links a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    $(".nav__links").classList.remove("is-open");
  })
);

/* ---------- Showreel（クリックで読み込み） ---------- */
const reelWrap = $("#reelWrap");
const reelId = toVideoId(P.showreel.youtube || reelWrap.dataset.youtube);
$("#reelYt").href = `https://www.youtube.com/watch?v=${reelId}`;
/* ポスター：Worksと同じくYouTube公式サムネを自動取得
   （1280x720のmaxres → 無ければ480x270 → それも無ければ下地グラデーションへ） */
if (reelId) {
  const poster = document.createElement("img");
  poster.className = "reel__poster";
  poster.alt = "Showreel";
  poster.src = `https://i.ytimg.com/vi/${reelId}/maxresdefault.jpg`;
  poster.addEventListener("error", () => {
    poster.onerror = () => poster.remove();
    poster.src = `https://i.ytimg.com/vi/${reelId}/hqdefault.jpg`;
  }, { once: true });
  reelWrap.prepend(poster);
}
$("#reelPlay").addEventListener("click", () => {
  const frame = $(".reel__frame");
  frame.hidden = false;
  frame.innerHTML = `<iframe src="${embedUrl(reelId, true)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Showreel"></iframe>`;
  $("#reelPlay").remove();
});

/* ---------- Works grid ---------- */
const grid = $("#worksGrid");
const works = [...P.works];

// disciplines をユニーク抽出してフィルタボタン生成
const cats = ["all", ...new Set(works.flatMap((w) => w.disciplines.split(",").map((d) => d.trim()).filter(Boolean)))];
const filterEl = $("#filter");
cats.forEach((c, i) => {
  const b = document.createElement("button");
  b.textContent = c;
  b.dataset.cat = c;
  if (i === 0) b.classList.add("is-active");
  b.addEventListener("click", () => {
    $$(".filter button").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    renderWorks(c);
  });
  filterEl.appendChild(b);
});

function workCard(w) {
  const tags = w.disciplines.split(",").map((d) => d.trim()).filter(Boolean);
  const vid = toVideoId(w.youtube);
  // サムネイル：個別画像を指定してなければ、YouTube の公式サムネを自動で使う
  const img = w.thumb
    ? `<img class="work__img" src="${esc(w.thumb)}" alt="${esc(w.title)}" loading="lazy" />`
    : vid
    ? `<img class="work__img" src="https://i.ytimg.com/vi/${vid}/hqdefault.jpg" alt="${esc(w.title)}" loading="lazy" />`
    : "";
  const thumb = `${img}<span class="work__ph ${parseInt(w.id, 10) % 2 === 0 ? "work__ph-red" : ""}">${w.id}</span>`;
  return `
  <article class="work" data-cat="${esc(tags.join(" "))}" data-youtube="${esc(toVideoId(w.youtube))}" data-title="${esc(w.title)}" data-year="${esc(w.year)}">
    <div class="work__thumb">${thumb}
      <div class="work__play"><i></i></div>
    </div>
    <div class="work__body">
      <div class="work__top">
        <h3 class="work__title">${esc(w.title)}</h3>
        <span class="work__year">${esc(w.year)}</span>
      </div>
      <div class="work__tags">
        ${tags.map((t, i) => `<span class="work__tag${i === 0 ? " work__tag--accent" : ""}">${esc(t)}</span>`).join("")}
      </div>
    </div>
  </article>`;
}

function renderWorks(cat = "all") {
  const list = cat === "all" ? works : works.filter((w) => w.disciplines.split(",").map((d) => d.trim()).includes(cat));
  grid.innerHTML = list.map(workCard).join("");
  // カード出現アニメ（rAF + タイムアウトの二重保険）
  $$(".work", grid).forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  });
  setTimeout(() => $$(".work", grid).forEach((el) => el.classList.add("is-in")), 1200);
  // サムネイル読み込み失敗時は自動で外す（下地のプレースホルダに残る）
  $$(".work__img", grid).forEach((im) => im.addEventListener("error", () => im.remove(), { once: true }));
}
renderWorks();

/* ---------- Video modal（クリック時だけiframe読み込み） ---------- */
const modal = $("#videoModal");
const modalFrame = $("#modalFrame");
const modalMeta = $("#modalMeta");

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".work");
  if (!card) return;
  openVideo(card.dataset.youtube, `${card.dataset.title} — ${card.dataset.year}`);
});

function openVideo(youtubeId, meta) {
  modalMeta.textContent = meta;
  $("#modalYt").href = `https://www.youtube.com/watch?v=${youtubeId}`;
  modalFrame.innerHTML = `<iframe src="${embedUrl(youtubeId, true)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Work video"></iframe>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-open");
}
function closeVideo() {
  modalFrame.innerHTML = "";   // iframe破棄して再生停止
  modal.hidden = true;
  document.body.style.overflow = "";
  document.body.classList.remove("modal-open");
}
// ✕ボタン・背景クリック・Esc — どれででも閉じる
$$("[data-close]", modal).forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); closeVideo(); }));
addEventListener("click", (e) => { if (e.target.classList?.contains("modal__backdrop")) closeVideo(); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeVideo(); });

/* ---------- Pipeline ---------- */
$("#pipelineGrid").innerHTML = P.pipeline.map((p, i) => `
  <div class="pipe reveal">
    <span class="pipe__no">${String(i + 1).padStart(2, "0")}</span>
    <h3 class="pipe__name">${esc(p.name)}</h3>
    <p class="pipe__desc">${esc(p.desc)}</p>
    <div class="pipe__bar" style="--lvl:${p.level}%"><i></i><span class="pipe__lvl">${p.level}%</span></div>
  </div>`).join("");

/* ---------- About ---------- */
$("#aboutBio").innerHTML = P.about.bio;
$("#toolChips").innerHTML = P.about.tools.map((t) => `<li>${esc(t)}</li>`).join("");
$("#career").innerHTML = P.about.career
  .map((c) => `<li><span class="tl__year">${esc(c.year)}</span><span class="tl__dot"></span><div><div class="tl__role">${esc(c.role)}</div><div class="tl__co">${esc(c.co)}</div></div></li>`)
  .join("");

/* ---------- Contact / Footer ---------- */
const mail = $("#contactMail");
mail.textContent = P.email;
mail.href = `mailto:${P.email}`;
$("#socials").innerHTML = P.socials
  .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`)
  .join("");
$("#footerName").textContent = P.name;
$("#year").textContent = new Date().getFullYear();

/* ---------- Reveal on scroll ---------- */
if (!("IntersectionObserver" in window)) {
  // 非対応環境では即時に全て表示
  $$(".reveal").forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));
  // 保険：observerが発火しない環境（小さめのプレビュー表示など）では強制表示
  setTimeout(() => $$(".reveal:not(.is-visible)").forEach((el) => el.classList.add("is-visible")), 2500);
}
