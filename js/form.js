const brands = [
    {"id": 1, "bebida": "Whisky", "marca": "Jack Daniels", "variedad": "N° 7"},
    {"id": 2, "bebida": "Whisky", "marca": "Jhonnie Walker", "variedad": "Red"},
    {"id": 3, "bebida": "Whisky", "marca": "Jhonnie Walker", "variedad": "Black"},
    {"id": 4, "bebida": "Gin", "marca": "Tanqueray", "variedad": "Original"},
    {"id": 5, "bebida": "Gin", "marca": "Bombay", "variedad": "Shapire"},
    {"id": 6, "bebida": "Gancia", "marca": "Americano", "variedad": "Original"},
    {"id": 7, "bebida": "Fernet", "marca": "Branca", "variedad": "Original"},
    {"id": 8, "bebida": "Vodka", "marca": "Absolut", "variedad": "Original"}
  ];
  
  function updateBrandOptions() {
    const preference = document.getElementById('preference').value;
    const brandSelect = document.getElementById('brand');
    brandSelect.innerHTML = '';
    const filteredBrands = brands.filter(b => b.bebida === preference);
    
    if (filteredBrands.length > 0) {
      filteredBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.marca;
        option.textContent = `${brand.marca} - ${brand.variedad}`;
        brandSelect.appendChild(option);
      });
    } else {
      const defaultOption = document.createElement('option');
      defaultOption.textContent = 'No hay marcas disponibles';
      brandSelect.appendChild(defaultOption);
    }
  }
  
  document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {
          document.getElementById('messageNotification').style.display = 'block';
          setTimeout(function() {
              document.getElementById('messageNotification').style.display = 'none';
          }, 3000);
      } else {
          alert('Por favor, complete todos los campos requeridos.');
      }
  });
  

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const type = document.getElementById('type').value;
    const preference = document.querySelector('input[name="preference"]:checked');
    const message = document.getElementById('message').value.trim();

    return name && email && type && preference && message;
}
