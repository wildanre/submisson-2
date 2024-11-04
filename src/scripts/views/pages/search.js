// import { searchRestaurants } from '../../data/restaurant-api';
// import { showLoading, hideLoading } from '../../utils/loadingIndicator';

// const Search = {
//     async render() {
//         return `
//         <div class="search-container">
//             <h2>Cari Restoran</h2>
//             <input type="text" id="searchInput" placeholder="Masukkan nama restoran..." />
//             <div id="resultsContainer" class="results-container"></div>
//         </div>
//         `;
//     },

//     async afterRender() {
//         const searchInput = document.getElementById('searchInput');
//         const resultsContainer = document.getElementById('resultsContainer');

//         searchInput.addEventListener('input', async (event) => {
//             const query = event.target.value;

//             if (query.length > 0) {
//                 showLoading();
//                 try {
//                     const response = await searchRestaurants(query);
//                     const restaurants = response.restaurants;

//                     if (response.error || response.founded === 0) {
//                         resultsContainer.innerHTML = `<p>Restoran tidak ditemukan.</p>`;
//                         return;
//                     }

//                     // Tampilkan hasil pencarian
//                     resultsContainer.innerHTML = restaurants.map(restaurant => `
//                         <div class="result-item" data-id="${restaurant.id}">
//                             ${restaurant.name}
//                             <button class="view-details-btn">View Details</button>
//                         </div>
//                     `).join('');

//                     // Event listener untuk setiap tombol "View Details"
//                     const resultItems = resultsContainer.querySelectorAll('.result-item');
//                     resultItems.forEach(item => {
//                         const restaurantId = item.getAttribute('data-id');
//                         const viewDetailsButton = item.querySelector('.view-details-btn');

//                         viewDetailsButton.addEventListener('click', () => {
//                             window.location.hash = `#/restaurant/${restaurantId}`; // Navigasi ke halaman detail
//                         });
//                     });
//                 } catch (error) {
//                     console.error('Error searching for restaurants:', error);
//                     resultsContainer.innerHTML = `<p>Terjadi kesalahan saat mencari restoran.</p>`;
//                 } finally {
//                     hideLoading();
//                 }
//             } else {
//                 resultsContainer.innerHTML = '';
//             }
//         });

//     },
// };

// export default Search;
