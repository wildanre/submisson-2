class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          .hero {
            position: relative;
            width: 100%;
            height: 500px;
            background-image: url('./images/heros/hero-image_2.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }
          
          .hero-content {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
          }
  
          h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }
  
          p {
            font-size: 1.2rem;
          }

  @media screen and (max-width: 700px) {
    .hero {
      height: 200px; 
    }

    h2 {
      font-size: 1.5rem; 
    }

    p {
      font-size: 1rem; 
      padding: 0 10px; 
    }

    .hero-content {
      padding: 10px;
    }
  }
        </style>
  
        <div class="hero">
          <div class="hero-content">
            <h2>Temukan restoran favoritmu di Amba Food</h2>
            <p>Amba Food merupakan situs penyedia restoran dengan kualitas terbaik yang mungkin ada disekitar anda</p>
          </div>
        </div>
      `;
  }
}

customElements.define('hero-section', HeroSection);
