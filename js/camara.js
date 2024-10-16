const fileInput = document.getElementById('file-input');
const photoPreview = document.getElementById('photo-preview');
const acceptBtn = document.getElementById('accept-btn');
const cancelBtn = document.getElementById('cancel-btn');
const titleInput = document.getElementById('photo-title');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const urlmockapi = "https://67100390a85f4164ef2cc993.mockapi.io/pwaig"

let photoBlob;

function updateOnlineStatus() {
  if (navigator.onLine) {
    acceptBtn.disabled = false;
  } else {
    acceptBtn.disabled = true;
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

fileInput.addEventListener('dblclick', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();  
  reader.onload = function(e) {
    photoPreview.src = e.target.result;   
    const img = new Image();
    img.src = e.target.result;
    img.onload = function() {      
      canvas.width = img.width;
      canvas.height = img.height;      
      ctx.drawImage(img, 0, 0);
    };
    photoBlob = file;
  };
  reader.readAsDataURL(file);
});
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();  
  reader.onload = function(e) {
    photoPreview.src = e.target.result;   
    const img = new Image();
    img.src = e.target.result;
    img.onload = function() {      
      canvas.width = img.width;
      canvas.height = img.height;      
      ctx.drawImage(img, 0, 0);
    };
    photoBlob = file;
  };
  reader.readAsDataURL(file);
});


acceptBtn.addEventListener('click', async () => {
  const title = titleInput.value;
  if (!title || !photoBlob) {
    alert('Por favor ingresa un titulo y selecciona una foto');
    return;
  }  
  const base64Image = canvas.toDataURL('image/webp'); 
  console.log("imagen en base 64   "+ base64Image)
  
  const response = await fetch(urlmockapi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      image: base64Image,  
      createdAt: new Date().toISOString()
    })
  });
  if (response.ok) {
    alert('Foto subida correctamente');
    window.location.href = 'index.html';
  }
});


cancelBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});


document.getElementById('back-btn').addEventListener('click', function() {
  window.location.href = 'index.html';
});