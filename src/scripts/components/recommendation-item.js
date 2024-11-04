class RecommendationItem extends HTMLElement {
  set restaurant(restaurant) {
    this.innerHTML = `
        <div class="recommendation-item">
          <img src="${restaurant.pictureId}" alt="${restaurant.name}">
          <div class="recommendation-content">
          <p class="city"><span class="mdi--location"></span> ${restaurant.city}</p>
            <h2>
              <a href="#">${restaurant.name}</a></h2>
            <p>${restaurant.description}</p>
            <div class="recommendation-rating">
              <span class="star">⭐</span>
              <span class="rating-number">${restaurant.rating}</span>
            </div>
          </div>
        </div>
      `;
  }
}

// Mendaftarkan custom element
customElements.define('recommendation-item', RecommendationItem);

// Data restoran
const recommendations = [
  {
    id: 'fe8bbxoazddkcowlqdz',
    name: 'Pangsit Express',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    pictureId: 'https://restaurant-api.dicoding.dev/images/medium/29',
    city: 'Ternate',
    rating: 4.8
  },
  {
    id: 'ljx8i0qu2uckcowlqdz',
    name: 'Run The Gun',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    pictureId: 'https://restaurant-api.dicoding.dev/images/medium/07',
    city: 'Bali',
    rating: 4.6
  }
];

// Mengisi data ke recommendation-item
const recommendationItems = document.querySelectorAll('recommendation-item');
recommendationItems.forEach((item, index) => {
  item.restaurant = recommendations[index];
});