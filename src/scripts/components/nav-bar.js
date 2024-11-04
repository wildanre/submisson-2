class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <nav>
        <div class="nav-title">
          <img src="../../images/logo/logo.png" alt="Logo" class="logo">
        </div>
        <button class="hamburger">&#9776;</button>
        <ul class="nav-list">
          <li class="nav-item"><a href="/">Home</a></li>
          <li class="nav-item"><a href="#">Favorite</a></li>
          <li class="nav-item"><a href="https://github.com/wildanre">About Us</a></li>
        </ul>
      </nav>
    `;
    this.hamburgerButton = this.querySelector('.hamburger');
    this.navList = this.querySelector('.nav-list');

    this.hamburgerButton.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  toggleMenu() {
    this.navList.classList.toggle('active');
  }
}

customElements.define('nav-bar', NavBar);
