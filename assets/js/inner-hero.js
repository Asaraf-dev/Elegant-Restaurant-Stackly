
/*--- Inner Hero Content ---*/
const erInnerHeroPages = {
    "about.html": {
        eyebrow: "The Story Behind The Experience",
        title: "More Than Dining, <span>It's An Art.</span>",
        description: "Discover our passion for exceptional cuisine, thoughtful hospitality and creating moments that stay with you long after the last bite.",
        breadcrumb: "About Us",
        button: "Explore Our Menu",
        buttonLink: "404.html",
        secondary: "Reserve Your Experience",
        secondaryLink: "404.html",
        bottom: "A Story Of Passion And Flavour",
        image: "assets/images/inner-hero-about.webp",
        position: "center 48%"
    },
    "our-menu.html": {
        eyebrow: "A Collection Of Culinary Creations",
        title: "Discover The Art Of <span>Exceptional Flavour.</span>",
        description: "Explore a carefully curated menu where premium ingredients, creative techniques and culinary passion come together on every plate.",
        breadcrumb: "Our Menu",
        button: "Reserve Your Table",
        buttonLink: "404.html",
        secondary: "Get In Touch",
        secondaryLink: "404.html",
        bottom: "Thoughtfully Crafted, Beautifully Served",
        image: "assets/images/inner-hero-menu.webp",
        position: "center 50%"
    },
    "reservation.html": {
        eyebrow: "Your Table Is Waiting",
        title: "Make Room For <span>Something Special.</span>",
        description: "Whether it's an intimate dinner or a special celebration, let us make your next dining experience truly unforgettable.",
        breadcrumb: "Reservations",
        button: "Contact Our Team",
        buttonLink: "404.html",
        secondary: "Explore Our Menu",
        secondaryLink: "404.html",
        bottom: "Your Perfect Evening Starts Here",
        image: "assets/images/inner-hero-reservation.webp",
        position: "center 55%"
    },
    "contact.html": {
        eyebrow: "We Would Love To Hear From You",
        title: "Let's Make Your Next <span>Visit Special.</span>",
        description: "Have a question, planning a celebration or simply want to say hello? Our team is here to help make every interaction memorable.",
        breadcrumb: "Contact Us",
        button: "Reserve Your Table",
        buttonLink: "404.html",
        secondary: "Discover Our Story",
        secondaryLink: "404.html",
        bottom: "We're Always Happy To Welcome You",
        image: "assets/images/inner-hero-contact.webp",
        position: "center 50%"
    }
};

/*--- Inner Hero Initialization ---*/
function initInnerHero() {
    const hero = document.getElementById("erInnerHero");

    if (!hero || hero.dataset.initialized === "true") return;

    const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const page = erInnerHeroPages[currentPage];

    if (!page) return;

    const eyebrow = document.getElementById("erInnerHeroEyebrow");
    const title = document.getElementById("erInnerHeroTitle");
    const description = document.getElementById("erInnerHeroDescription");
    const breadcrumb = document.getElementById("erInnerHeroBreadcrumb");
    const button = document.getElementById("erInnerHeroButton");
    const secondary = document.getElementById("erInnerHeroSecondary");
    const bottomText = document.getElementById("erInnerHeroBottomText");
    const background = hero.querySelector(".er-com-inner-hero-bg");

    if (!eyebrow || !title || !description || !breadcrumb || !button || !secondary || !bottomText || !background) return;

    eyebrow.textContent = page.eyebrow;
    title.innerHTML = page.title;
    description.textContent = page.description;
    breadcrumb.textContent = page.breadcrumb;
    bottomText.textContent = page.bottom;

    button.querySelector("span").textContent = page.button;
    button.href = page.buttonLink;

    secondary.textContent = page.secondary;
    secondary.href = page.secondaryLink;

    background.style.backgroundImage = `url("${page.image}")`;
    background.style.backgroundPosition = page.position;

    hero.dataset.initialized = "true";
    hero.classList.add("er-inner-hero-ready");
}

/*--- Component Loader Support ---*/
document.addEventListener("DOMContentLoaded", initInnerHero);
document.addEventListener("erComponentsLoaded", initInnerHero);
