
const newPhotoBtn = document.getElementById('new-photo-btn');
const reel = document.getElementById('reel');
const urlmockapi = new URL('https://67100390a85f4164ef2cc993.mockapi.io/pwaig');
urlmockapi.searchParams.append('sortBy', 'fecha');
urlmockapi.searchParams.append('order', 'desc');


newPhotoBtn.addEventListener('click', () => {
  window.location.href = 'camara.html';
});


async function loadPhotos() {
  try {
    const response = await fetch(urlmockapi);
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }    
    
    const photos = await response.json();
    
    reel.innerHTML = '';
    
    photos.forEach(photo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${photo.image}" alt="Photo">
        <p>${photo.title}</p>
        <p>${new Date(photo.createdAt).toLocaleString()}</p>
      `;
      reel.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar las imagenes', error);
    reel.innerHTML = '<p>Error al cargar las imagenes, Por favor intentelo mas tarde</p>';
  }
}

newPhotoBtn.addEventListener('click', () => {
  window.location.href = 'camara.html';
});

loadPhotos();
