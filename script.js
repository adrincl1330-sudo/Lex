
// =========================
// LEXORA SEARCH & FILTER
// =========================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const dictionaryCards = document.querySelectorAll(".dictionary-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");
const searchSuggestions = document.getElementById("searchSuggestions");

let activeCategory = "all";

// Menampilkan saran pencarian
function showSearchSuggestions() {
    const keyword = searchInput.value.toLowerCase().trim();

    searchSuggestions.innerHTML = "";

    if (keyword.length === 0) {
        return;
    }

    const suggestions = [];

    dictionaryCards.forEach((card) => {
        const title = card.querySelector("h3").textContent;
        const normalizedTitle = title.toLowerCase();

        if (normalizedTitle.includes(keyword)) {
            suggestions.push(title);
        }
    });

    suggestions.slice(0, 5).forEach((title) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "suggestion-item";
        button.textContent = title;

        button.addEventListener("click", () => {
            searchInput.value = title;

            // Tampilkan semua kategori
            activeCategory = "all";

            filterButtons.forEach((btn) => {
                btn.classList.toggle(
                    "active",
                    btn.dataset.filter === "all"
                );
            });

            updateDictionary();
            searchSuggestions.innerHTML = "";

            document.getElementById("dictionary").scrollIntoView({
                behavior: "smooth"
            });
        });

        searchSuggestions.appendChild(button);
    });
}


// Fungsi pencarian dan filter
function updateDictionary() {
    const keyword = searchInput.value.toLowerCase().trim();

    let foundTerms = 0;

    dictionaryCards.forEach((card) => {
        const content = card.textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesKeyword = content.includes(keyword);
        const matchesCategory =
            activeCategory === "all" || category === activeCategory;

        if (matchesKeyword && matchesCategory) {
            card.hidden = false;
            foundTerms++;
        } else {
            card.hidden = true;
        }
    });

    // Tampilkan pesan jika tidak ada hasil
    noResults.hidden = foundTerms !== 0;
}

// Tombol kategori
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;

        // Atur tombol yang sedang aktif
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        updateDictionary();
    });
});

// Pencarian saat mengetik
searchInput.addEventListener("input", () => {
    updateDictionary();
    showSearchSuggestions();
});

// Pencarian melalui tombol
searchButton.addEventListener("click", () => {
    updateDictionary();

    document.getElementById("dictionary").scrollIntoView({
        behavior: "smooth"
    });
});

// Pencarian menggunakan tombol Enter
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
