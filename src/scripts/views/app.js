import ContentItem from './pages/content-item.js';
import { searchRestaurants } from '../data/restaurant-api';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Detail from './pages/detail.js';
import { getListOfRestaurants, getDetailOfRestaurant } from '../data/restaurant-api';

class App {
    constructor({ content }) {
        this._content = content;
        this._initialAppShell();
        this._initSearch(); // Panggil fungsi untuk inisialisasi pencarian
    }

    _initialAppShell() {
        // Anda dapat melakukan inisialisasi komponen lain di sini
    }

    _initSearch() {
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');
        const searchResultsContainer = document.getElementById('searchResults');

        searchButton.addEventListener('click', async () => {
            const query = searchInput.value.trim();
            if (query) {
                const results = await searchRestaurants(query);
                this._displaySearchResults(results);
            }
        });
    }

    _displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = ''; // Kosongkan hasil sebelumnya

        if (results.error || results.founded === 0) {
            searchResultsContainer.innerHTML = '<p>No restaurants found.</p>';
            return;
        }

        results.restaurants.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.innerHTML = `
                <h4>${restaurant.name}</h4>
                <p>${restaurant.description}</p>
                <button class="view-details-btn" data-id="${restaurant.id}">View Details</button>
            `;
            searchResultsContainer.appendChild(restaurantElement);
        });

        // Tambahkan event listener untuk semua tombol "View Details"
        const viewDetailsButtons = searchResultsContainer.querySelectorAll('.view-details-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const restaurantId = button.getAttribute('data-id');
                window.location.hash = `#/detail/${restaurantId}`; // Navigasi ke halaman detail
            });
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url] || routes['/'];
        const isDetailPage = (page === Detail);
        const heroElement = document.querySelector('.hero-section');
        if (heroElement) {
            // Sembunyikan hero jika di halaman detail, tampilkan di halaman lain
            heroElement.style.display = isDetailPage ? 'none' : 'block';
        }

        if (!page || typeof page.render !== 'function') {
            console.error('Page not found or render function missing:', url);
            this._content.innerHTML = '<h2>Page Not Found</h2>';
            return;
        }

        let restaurantData = null;

        if (page === ContentItem) {
            restaurantData = await getListOfRestaurants();
            if (restaurantData.length === 0) {
                this._content.innerHTML = '<h2>No Restaurants Found</h2>';
                return;
            }
        } else if (page === Detail) {
            const { id } = UrlParser.parseActiveUrlWithoutCombiner(); // Mendapatkan ID dari URL
            restaurantData = await getDetailOfRestaurant(id);
            if (!restaurantData) {
                this._content.innerHTML = '<h2>Restaurant not found</h2>';
                return;
            }
        }

        this._content.innerHTML = await page.render(restaurantData);
        if (page.afterRender) await page.afterRender();
    }
}

const app = new App({
    content: document.querySelector('#mainContent'), // Pastikan ini mengarah ke elemen yang ada
});

// Event listener untuk merender halaman ketika URL hash berubah atau halaman dimuat
window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});

export default App;
