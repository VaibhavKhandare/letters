// Content database for search functionality
const contentDatabase = {
    vowels: {
        title: "Vowels (स्वर)",
        items: [
            { letter: "अ", romanization: "a", description: "Neutral vowel, like 'u' in 'but'", category: "barakhadi" },
            { letter: "आ", romanization: "aa", description: "Long 'a', like 'a' in 'father'", category: "barakhadi" },
            { letter: "इ", romanization: "i", description: "Short 'i', like 'i' in 'bit'", category: "barakhadi" },
            { letter: "ई", romanization: "ii", description: "Long 'i', like 'ee' in 'see'", category: "barakhadi" },
            { letter: "उ", romanization: "u", description: "Short 'u', like 'u' in 'put'", category: "barakhadi" },
            { letter: "ऊ", romanization: "uu", description: "Long 'u', like 'oo' in 'pool'", category: "barakhadi" },
            { letter: "ए", romanization: "e", description: "Like 'ay' in 'day'", category: "barakhadi" },
            { letter: "ऐ", romanization: "ai", description: "Like 'i' in 'ice'", category: "barakhadi" },
            { letter: "ओ", romanization: "o", description: "Like 'o' in 'go'", category: "barakhadi" },
            { letter: "औ", romanization: "au", description: "Like 'ou' in 'out'", category: "barakhadi" },
            { letter: "अं", romanization: "aṃ", description: "Anusvara - nasalized vowel", category: "barakhadi" },
            { letter: "अः", romanization: "aḥ", description: "Visarga - breathy vowel", category: "barakhadi" }
        ]
    },
    ka_varga: {
        title: "Ka Varga (क वर्ग)",
        items: [
            { letter: "क", romanization: "ka", description: "Voiceless velar stop", category: "ka-kha-ga-gha" },
            { letter: "ख", romanization: "kha", description: "Aspirated voiceless velar stop", category: "ka-kha-ga-gha" },
            { letter: "ग", romanization: "ga", description: "Voiced velar stop", category: "ka-kha-ga-gha" },
            { letter: "घ", romanization: "gha", description: "Aspirated voiced velar stop", category: "ka-kha-ga-gha" },
            { letter: "ङ", romanization: "ṅa", description: "Velar nasal", category: "ka-kha-ga-gha" }
        ]
    },
    cha_varga: {
        title: "Cha Varga (च वर्ग)",
        items: [
            { letter: "च", romanization: "cha", description: "Voiceless palatal stop", category: "cha-chha" },
            { letter: "छ", romanization: "chha", description: "Aspirated voiceless palatal stop", category: "cha-chha" },
            { letter: "ज", romanization: "ja", description: "Voiced palatal stop", category: "ka-kha-ga-gha" },
            { letter: "झ", romanization: "jha", description: "Aspirated voiced palatal stop", category: "ka-kha-ga-gha" },
            { letter: "ञ", romanization: "ña", description: "Palatal nasal", category: "ka-kha-ga-gha" }
        ]
    },
    ta_varga_retroflex: {
        title: "Ta Varga - Retroflex (ट वर्ग)",
        items: [
            { letter: "ट", romanization: "ṭa", description: "Voiceless retroflex stop", category: "ta-tha" },
            { letter: "ठ", romanization: "ṭha", description: "Aspirated voiceless retroflex stop", category: "ta-tha" },
            { letter: "ड", romanization: "ḍa", description: "Voiced retroflex stop", category: "ta-tha" },
            { letter: "ढ", romanization: "ḍha", description: "Aspirated voiced retroflex stop", category: "ta-tha" },
            { letter: "ण", romanization: "ṇa", description: "Retroflex nasal", category: "ta-tha" }
        ]
    },
    ta_varga_dental: {
        title: "Ta Varga - Dental (त वर्ग)",
        items: [
            { letter: "त", romanization: "ta", description: "Voiceless dental stop", category: "ta-tha-tha" },
            { letter: "थ", romanization: "tha", description: "Aspirated voiceless dental stop", category: "ta-tha-tha" },
            { letter: "द", romanization: "da", description: "Voiced dental stop", category: "ta-tha-tha" },
            { letter: "ध", romanization: "dha", description: "Aspirated voiced dental stop", category: "ta-tha-tha" },
            { letter: "न", romanization: "na", description: "Dental nasal", category: "ta-tha-tha" }
        ]
    },
    pa_varga: {
        title: "Pa Varga (प वर्ग)",
        items: [
            { letter: "प", romanization: "pa", description: "Voiceless labial stop", category: "pa-fa" },
            { letter: "फ", romanization: "pha", description: "Aspirated voiceless labial stop", category: "pa-fa" },
            { letter: "ब", romanization: "ba", description: "Voiced labial stop", category: "pa-fa" },
            { letter: "भ", romanization: "bha", description: "Aspirated voiced labial stop", category: "pa-fa" },
            { letter: "म", romanization: "ma", description: "Labial nasal", category: "pa-fa" }
        ]
    },
    others: {
        title: "Other Letters",
        items: [
            { letter: "य", romanization: "ya", description: "Palatal approximant", category: "ya-ra-la-va-sha" },
            { letter: "र", romanization: "ra", description: "Alveolar trill", category: "ya-ra-la-va-sha" },
            { letter: "ल", romanization: "la", description: "Lateral approximant", category: "ya-ra-la-va-sha" },
            { letter: "व", romanization: "va", description: "Labiodental approximant", category: "ya-ra-la-va-sha" },
            { letter: "श", romanization: "śa", description: "Voiceless palatal fricative", category: "ya-ra-la-va-sha" },
            { letter: "ष", romanization: "ṣa", description: "Voiceless retroflex fricative", category: "kshya-sa-ha" },
            { letter: "स", romanization: "sa", description: "Voiceless alveolar fricative", category: "kshya-sa-ha" },
            { letter: "ह", romanization: "ha", description: "Voiced glottal fricative", category: "kshya-sa-ha" },
            { letter: "क्ष", romanization: "kṣa", description: "Compound letter ka+sha", category: "kshya-sa-ha" },
            { letter: "त्र", romanization: "tra", description: "Compound letter ta+ra", category: "kshya-sa-ha" },
            { letter: "ज्ञ", romanization: "gya", description: "Compound letter ja+nya", category: "kshya-sa-ha" }
        ]
    },
    names: {
        title: "Names Practice",
        items: [
            { letter: "वैभव", romanization: "Vaibhav", description: "Male name meaning prosperity", category: "names" },
            { letter: "ऐश्वर्या", romanization: "Aishwarya", description: "Female name meaning prosperity", category: "names" },
            { letter: "इंदिरा", romanization: "Indira", description: "Female name meaning beauty", category: "names" },
            { letter: "समीक्षा", romanization: "Samiksha", description: "Female name meaning analysis", category: "names" }
        ]
    }
};

// Category mapping for navigation
const categoryMapping = {
    'barakhadi': 'vowels',
    'ka-kha-ga-gha': ['ka_varga', 'cha_varga'],
    'cha-chha': ['cha_varga'],
    'ta-tha': ['ta_varga_retroflex'],
    'ta-tha-tha': ['ta_varga_dental'],
    'pa-fa': ['pa_varga'],
    'ya-ra-la-va-sha': ['others'],
    'kshya-sa-ha': ['others'],
    'names': ['names']
};

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryGrid = document.getElementById('categoryGrid');
const main = document.querySelector('.main .container');

// Global data store
let websiteData = null;

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        hideSearchResults();
        return;
    }

    const results = [];
    const searchTerm = query.toLowerCase();

    // Search through all content
    Object.values(contentDatabase).forEach(category => {
        category.items.forEach(item => {
            const matchScore = calculateMatchScore(item, searchTerm);
            if (matchScore > 0) {
                results.push({ ...item, score: matchScore, categoryTitle: category.title });
            }
        });
    });

    // Sort by relevance
    results.sort((a, b) => b.score - a.score);

    displaySearchResults(results, query);
}

function calculateMatchScore(item, searchTerm) {
    let score = 0;
    
    // Exact letter match (highest priority)
    if (item.letter.toLowerCase() === searchTerm) score += 100;
    
    // Letter contains search term
    if (item.letter.toLowerCase().includes(searchTerm)) score += 50;
    
    // Romanization exact match
    if (item.romanization.toLowerCase() === searchTerm) score += 80;
    
    // Romanization contains search term
    if (item.romanization.toLowerCase().includes(searchTerm)) score += 40;
    
    // Description contains search term
    if (item.description.toLowerCase().includes(searchTerm)) score += 20;
    
    return score;
}

function displaySearchResults(results, query) {
    hideSearchResults(); // Remove existing results
    
    if (results.length === 0) {
        showNoResults(query);
        return;
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results fade-in';
    resultsContainer.innerHTML = `
        <h3>Search Results for "${query}" (${results.length} found)</h3>
        ${results.slice(0, 10).map(result => `
            <div class="search-result-item" data-category="${result.category}">
                <div class="result-title">${result.letter} (${result.romanization})</div>
                <div class="result-preview">${result.description}</div>
                <small style="color: #999;">From: ${result.categoryTitle}</small>
            </div>
        `).join('')}
    `;

    // Insert after hero section
    const heroSection = document.querySelector('.hero');
    heroSection.parentNode.insertBefore(resultsContainer, heroSection.nextSibling);

    // Add click handlers to results
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            navigateToCategory(category);
        });
    });
}

function showNoResults(query) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results fade-in';
    resultsContainer.innerHTML = `
        <h3>No results found for "${query}"</h3>
        <p>Try searching for:</p>
        <ul style="margin-top: 1rem; padding-left: 2rem;">
            <li>Devanagari letters (अ, क, प, etc.)</li>
            <li>Romanized letters (ka, ga, ma, etc.)</li>
            <li>Letter descriptions (vowel, consonant, nasal, etc.)</li>
            <li>Names (Vaibhav, Aishwarya, etc.)</li>
        </ul>
    `;

    const heroSection = document.querySelector('.hero');
    heroSection.parentNode.insertBefore(resultsContainer, heroSection.nextSibling);
}

function hideSearchResults() {
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
}

function navigateToCategory(category) {
    // For now, just scroll to the category or show an alert
    // In a full implementation, this would navigate to a category page
    const categoryCard = document.querySelector(`[data-category="${category}"]`);
    if (categoryCard) {
        categoryCard.scrollIntoView({ behavior: 'smooth' });
        categoryCard.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            categoryCard.style.animation = '';
        }, 1000);
    }
}

// Event listeners are now handled in setupEventListeners() function

function showCategoryContent(category) {
    // Show category-specific content
    const contentSections = categoryMapping[category];
    if (!contentSections) return;

    hideSearchResults();
    
    const content = contentSections.map(section => contentDatabase[section]).filter(Boolean);
    if (content.length === 0) return;

    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'search-results fade-in';
    categoryContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h3>${content[0].title}</h3>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #ccc; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
        </div>
        ${content.map(section => `
            <div style="margin-bottom: 2rem;">
                <h4 style="color: #667eea; margin-bottom: 1rem;">${section.title}</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                    ${section.items.map(item => `
                        <div style="padding: 1rem; background: #f8f9ff; border-radius: 10px; text-align: center;">
                            <div style="font-size: 2rem; font-family: 'Noto Sans Devanagari', sans-serif; color: #667eea; margin-bottom: 0.5rem;">${item.letter}</div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${item.romanization}</div>
                            <div style="font-size: 0.9rem; color: #666;">${item.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;

    const heroSection = document.querySelector('.hero');
    heroSection.parentNode.insertBefore(categoryContainer, heroSection.nextSibling);
}

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Load website data and initialize page
async function loadWebsiteData() {
    try {
        const response = await fetch('data.json');
        websiteData = await response.json();
        generateCategoryCards();
        setupEventListeners();
    } catch (error) {
        console.error('Error loading website data:', error);
        generateFallbackCategories();
    }
}

function generateCategoryCards() {
    if (!websiteData || !websiteData.categories) return;
    
    categoryGrid.innerHTML = '';
    
    websiteData.categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-category', category.id);
        
        const isAvailable = category.id === 'vowels' || category.id === 'pa_varga'; // Vowels and Pa Varga implemented
        const buttonText = isAvailable ? 'Start Learning →' : 'Coming Soon';
        const buttonDisabled = isAvailable ? '' : 'disabled';
        const clickHandler = isAvailable ? `onclick="window.location.href='${category.url}'"` : '';
        
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.title}</h3>
            <p>${category.description}</p>
            <div class="letter-preview">${category.preview}</div>
            <button class="explore-btn" ${buttonDisabled} ${clickHandler}>${buttonText}</button>
        `;
        
        categoryGrid.appendChild(card);
        
        // Add fade-in animation with delay
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

function generateFallbackCategories() {
    categoryGrid.innerHTML = `
        <div class="category-card" onclick="window.location.href='barakhadi.html'">
            <div class="category-icon">स्वर</div>
            <h3>Barakhadi - Vowels</h3>
            <p>Master all 14 Hindi vowels with detailed pronunciation guides and mouth position instructions.</p>
            <div class="letter-preview">अ आ इ ई उ ऊ ए ऐ ओ औ अं अः</div>
            <button class="explore-btn">Start Learning →</button>
        </div>
        <div class="category-card">
            <div class="category-icon">व्यञ्जन</div>
            <h3>Consonants (Coming Soon)</h3>
            <p>Learn all Hindi consonants with their various combinations and pronunciation patterns.</p>
            <div class="letter-preview">क ख ग घ ङ च छ ज झ ञ</div>
            <button class="explore-btn" disabled>Coming Soon</button>
        </div>
    `;
}

function setupEventListeners() {
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim() === '') {
                hideSearchResults();
            }
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadWebsiteData();
    
    // Focus search input on page load if it exists
    if (searchInput) {
        setTimeout(() => searchInput.focus(), 500);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && e.target !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    
    if (e.key === 'Escape') {
        hideSearchResults();
        searchInput.blur();
    }
});

