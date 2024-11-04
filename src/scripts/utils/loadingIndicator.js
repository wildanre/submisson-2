const showLoading = () => {
    let loadingElement = document.querySelector('.loading');
    
    if (!loadingElement) {
      loadingElement = document.createElement('div');
      loadingElement.classList.add('loading');
      loadingElement.innerHTML = `<span class="line-md--loading-loop"></span> Loading...`;
      document.body.appendChild(loadingElement);
    }
  
    loadingElement.classList.add('active');
  };
  
  const hideLoading = () => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
      loadingElement.classList.remove('active');
    }
  };
  
  export { showLoading, hideLoading };