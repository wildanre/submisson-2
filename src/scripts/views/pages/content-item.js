import { getListOfRestaurants } from '../../data/restaurant-api';
import { showLoading, hideLoading } from '../../utils/loadingIndicator';

const ContentItem = {
    async render() {
      showLoading(); // Menampilkan indikator loading
  
      try {
        const restaurantData = await getListOfRestaurants(); // Mendapatkan data restoran
  
        return `
          <section class="content">
            <div class="explore">
              <h1 class="explore-label">Jelajahi Restoran</h1>
              <div class="posts">
                ${restaurantData.map(restaurant => `
                  <div class="restaurant-item" tabindex="0">
                    <div class="rating">
                      <span class="star">⭐</span>
                      <span class="rating-number">${restaurant.rating}</span>
                    </div>
                    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
                    <div class="restaurant-item-content">
                      <p class="city">
                        <span class="mdi--location"></span> ${restaurant.city}
                      </p>
                      <h2>
                        <a href="#/restaurant/${restaurant.id}">${restaurant.name}</a>
                      </h2>
                      <p>${restaurant.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;
      } finally {
        hideLoading(); // Menyembunyikan indikator loading setelah data selesai dimuat
      }
    },
  
    async afterRender() {
      // Logika tambahan setelah render jika diperlukan
    }
  };
  
  export default ContentItem;
  