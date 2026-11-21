const filterButtons = document.querySelectorAll(".topic-pill");
const storyCards = [...document.querySelectorAll(".story-card")];
const searchInput = document.getElementById("searchInput");
const storyCount = document.getElementById("storyCount");
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function filterStories() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  storyCards.forEach((card) => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const textMatch = `${card.dataset.title} ${card.textContent}`.toLowerCase().includes(term);
    const show = categoryMatch && textMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  storyCount.textContent = String(visible).padStart(2, "0");
  emptyState.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterStories();
  });
});
searchInput.addEventListener("input", filterStories);

const articles = {
  featured: ["Less, but better: finding clarity in a world full of noise", "Thoughtful design is not about removing everything. It is about making deliberate room for the things that matter. Start by noticing what earns your attention, what supports your day, and what simply adds noise. A little clarity can change the way you work, create, and live."],
  ai: ["The human side of artificial intelligence", "Artificial intelligence is often discussed through speed, scale, and technical breakthroughs. But its most meaningful impact is human: helping people explore ideas, reduce repetitive work, and make better-informed decisions. The goal should not be to replace curiosity, but to give it more room."],
  mornings: ["Why slow mornings are making a comeback", "A slower morning is less about a perfect routine and more about creating a small pocket of calm. Leave a little space before the notifications, make a warm drink, and choose one thing that deserves your attention. Small rituals can set a gentler tone for the day."],
  colors: ["The colors shaping tomorrow", "Color influences how we experience spaces, products, and digital interfaces. Designers are pairing grounded natural tones with confident accents to create work that feels both familiar and fresh. The best palette is one that supports the feeling a design wants to create."],
  less: ["A practical guide to doing less", "Doing less begins with deciding what matters. Try choosing three priorities for the day, grouping small tasks, and leaving a little unscheduled space. A useful routine should make life feel more manageable, not turn every hour into another performance."],
  digital: ["Building a more thoughtful digital life", "A healthier digital routine starts with intention. Turn off notifications that do not deserve immediate attention, keep useful tools easy to reach, and create screen-free moments that protect your focus. Technology works best when it serves the life you want to live."],
  rituals: ["The little rituals that bring us together", "Connection is often built through repeated, ordinary moments: a weekly call, a shared meal, or a message that says someone crossed your mind. These rituals do not need to be elaborate. Their value comes from showing up consistently."]
};

const dialog = document.getElementById("storyDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogText = document.getElementById("dialogText");
document.querySelectorAll("[data-read]").forEach((button) => {
  button.addEventListener("click", () => {
    const article = articles[button.dataset.read];
    if (!article) return;
    dialogTitle.textContent = article[0];
    dialogText.textContent = article[1];
    dialog.showModal();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("emailInput");
  const message = document.getElementById("formMessage");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  message.textContent = `Thanks! ${email.value} has been added to the demo newsletter list.`;
  message.style.color = "#c7ed69";
  email.value = "";
});

filterStories();
