// src/scripts/views/pages/detail.js
import { getDetailOfRestaurant, addReview } from '../../data/restaurant-api';
import { showLoading, hideLoading } from '../../utils/loadingIndicator';

const Detail = {
    async render() {
        const url = window.location.hash.slice(1).toLowerCase();
        const id = url.split('/')[2];
        const restaurant = await getDetailOfRestaurant(id);

        return `
      <div class="restaurant-detail">
        <h2>${restaurant.name}</h2>
        <div class="detail-grid">
          <div class="image-container">
            <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
          </div>
          <div class="info-container">
            <p><strong>City:</strong> ${restaurant.city}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
            <p><strong>Description:</strong> ${restaurant.description}</p>
            <h3>Categories</h3>
            <ul>
              ${restaurant.categories.map(category => `<li>${category.name}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="menu-container">
          <h3>Menu</h3>
          <div class="menu-grid">
            <div class="foods">
              <h4>Foods</h4>
              <ul>
                ${restaurant.menus.foods.slice(0, 5).map(food => `<li>${food.name}</li>`).join('')}
              </ul>
            </div>
            <div class="drinks">
              <h4>Drinks</h4>
              <ul>
                ${restaurant.menus.drinks.slice(0, 5).map(drink => `<li>${drink.name}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="review-buttons">
          <button id="showReviewsBtn">Tampilkan Review</button>
          <button id="addReviewBtn">Berikan Review</button>
        </div>

        <div id="reviewsContainer" class="reviews-container" style="display:none;">
          <h3>Reviews</h3>
          <ul class="reviews">
            ${restaurant.customerReviews.map(review => `
              <li>
                <strong>${review.name}</strong>: ${review.review} <em>(${review.date})</em>
              </li>
            `).join('')}
          </ul>
        </div>

        <div id="reviewFormContainer" class="review-form-container" style="display:none;">
          <h3>Tambahkan Review</h3>
          <form id="reviewForm">
            <input type="text" id="reviewerName" placeholder="nama" required>
            <textarea id="reviewContent" placeholder="tulis review kamu" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    `;
    },

    async afterRender() {
        const url = window.location.hash.slice(1).toLowerCase();
        const id = url.split('/')[2];
        const reviewForm = document.getElementById('reviewForm');
        const showReviewsBtn = document.getElementById('showReviewsBtn');
        const addReviewBtn = document.getElementById('addReviewBtn');
        const reviewsContainer = document.getElementById('reviewsContainer');
        const reviewFormContainer = document.getElementById('reviewFormContainer');

        // Event listener untuk tombol "Tampilkan Review"
        showReviewsBtn.addEventListener('click', () => {
            reviewsContainer.style.display = 'block'; // Menampilkan kontainer ulasan
            reviewFormContainer.style.display = 'none'; // Menyembunyikan form review
        });

        // Event listener untuk tombol "Berikan Review"
        addReviewBtn.addEventListener('click', () => {
            reviewsContainer.style.display = 'none'; // Menyembunyikan kontainer ulasan
            reviewFormContainer.style.display = 'block'; // Menampilkan form review
        });

        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            showLoading();

            const name = document.getElementById('reviewerName').value;
            const review = document.getElementById('reviewContent').value;

            try {
                const response = await addReview({ id, name, review });
                const updatedReviews = response.customerReviews;

                const reviewsList = document.querySelector('.reviews');
                reviewsList.innerHTML = updatedReviews.map(
                    review => `<li><strong>${review.name}</strong>: ${review.review} <em>(${review.date})</em></li>`
                ).join('');

                reviewForm.reset(); // Reset form setelah review dikirim
            } catch (error) {
                console.error('Failed to add review:', error);
            } finally {
                hideLoading();
            }
        });
    },
};

export default Detail;
