class FootBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
<div class="foot-bar"> "© 2024 - Amba Food | Rasakan kenikmatan kuliner yang tak terlupakan!</div>
      `;
  }
}

customElements.define('foot-bar', FootBar);
