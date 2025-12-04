const myUsernames = ["Alex"];
const friendUsernames = ["Menacing"];

const myColor = "rgba(212, 175, 55, 0.5)"; // Gold
const friendColor = "rgba(0, 191, 255, 0.5)"; // Cyan

const gradients = {
    300: "linear-gradient(115.62deg, rgb(0, 200, 170) 17.43%, rgb(0, 150, 200) 84.33%)",
    800: "linear-gradient(115.62deg, rgb(100, 100, 200) 17.43%, rgb(150, 100, 220) 84.33%)",
    1000: "linear-gradient(115.62deg, rgb(0, 200, 255) 17.43%, rgb(200, 150, 255) 84.33%)",
    1200: "linear-gradient(115.62deg, rgb(255, 200, 200) 17.43%, rgb(255, 255, 150) 84.33%)",
    1400: "linear-gradient(115.62deg, rgb(255, 220, 100) 17.43%, rgb(255, 180, 200) 84.33%)",
    1600: "linear-gradient(115.62deg, rgb(255, 200, 100) 17.43%, rgb(255, 100, 150) 84.33%)",
    1800: "linear-gradient(115.62deg, rgb(255, 50, 150) 17.43%, rgb(200, 50, 255) 84.33%)",
    2000: "linear-gradient(115.62deg, rgb(255, 100, 150) 17.43%, rgb(200, 50, 200) 84.33%)",
    2500: "linear-gradient(115.62deg, rgb(255, 166, 166) 17.43%, rgb(242, 141, 255) 84.33%)"
};

const myGradient = gradients[2500];

function applyBorders() {
    myUsernames.forEach(username => {
        document.querySelectorAll(`span[title="${username}"]`).forEach(span => {
            const li = span.closest('li');
            if (li) {
                const card = li.querySelector('.user-card');
                if (card) {
                    card.style.border = `2px solid ${myColor}`;
                    card.style.borderRadius = '8px';
                }

                const levelBadge = li.querySelector('.user-level.tag-container');
                if (levelBadge) {
                    levelBadge.style.background = myGradient;
                    levelBadge.style.borderRadius = '9px';
                }
            }
        });
    });

    friendUsernames.forEach(username => {
        document.querySelectorAll(`span[title="${username}"]`).forEach(span => {
            const li = span.closest('li');
            if (li) {
                const card = li.querySelector('.user-card');
                if (card) {
                    card.style.border = `2px solid ${friendColor}`;
                    card.style.borderRadius = '8px';
                }
            }
        });
    });
}

applyBorders();
setInterval(applyBorders, 1000);