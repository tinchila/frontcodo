Swal.fire({
  title: 'Confirmar edad',
  confirmButtonColor:'#000000',
  text: '¿Es mayor de 18 años?',
  confirmButtonText: 'Sí, soy mayor de 18 años',
  showCancelButton: true,
  cancelButtonText: 'No, soy menor de 18 años',
}).then((result) => {
  if (result.isConfirmed && result.value) {
    Swal.fire({
      title: 'Bienvenido a la tienda de La Bodega',
      text: 'Vinoteca Online',
      customClass: {
        confirmButton: 'estilo-boton'
      }
    });
    
    //Registracion
    class Usuarios{
    constructor(email, clave, nombre, apellido) {
      this.email = email;
      this.clave = clave;
      this.nombre = nombre;
      this.apellido = apellido;
      }
    }
    let listaDeUsuarios = [];

    const singUp = document.getElementById("singUp");
      singUp.addEventListener("click", () => {
      Swal.fire({
        title: 'Sign Up',
        html: `
          <input type="email" id="email" class="swal2-input" placeholder="Ingrese su email" required>
          <input type="password" id="clave" class="swal2-input" placeholder="Ingrese una clave (mínimo 8 caracteres)" required>
          <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese su nombre" required>
          <input type="text" id="apellido" class="swal2-input" placeholder="Ingrese su apellido" required>
        `,
        focusConfirm: false,
        confirmButtonColor:'#000000',
        preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const clave = Swal.getPopup().querySelector('#clave').value;
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const apellido = Swal.getPopup().querySelector('#apellido').value;

      if (!email || !clave || !nombre || !apellido) {
        Swal.showValidationMessage('Por favor, complete todos los campos');
      }

      return { email, clave, nombre, apellido };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { email, clave, nombre, apellido } = result.value;
        Swal.fire(
          'Usuario creado',
        );
        const nuevoUsuario = new Usuarios(email, clave, nombre, apellido);
        listaDeUsuarios.push(nuevoUsuario);
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios));
      }
    });
  });


  //Loggin
  const singIn = document.getElementById("singIn");
  singIn.addEventListener("click", () => {
    Swal.fire({
      title: 'Iniciar Sesión',
      html: `
        <input type="text" id="login" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
      `,
      confirmButtonText: 'Iniciar Sesión',
      confirmButtonColor:'#000000',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value;
        const password = Swal.getPopup().querySelector('#password').value;

        if (!login || !password) {
          Swal.showValidationMessage('Por favor, ingrese usuario y contraseña');
        }

        return { login, password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { login, password } = result.value;
        const storedUsers = JSON.parse(localStorage.getItem("listaDeUsuarios"));
        const user = storedUsers.find((usuario) => usuario.email === login);

        if (!user) {
          Swal.fire('Usuario no encontrado', 'Debe registrarse para poder realizar una compra', 'error');
        } else {
          let intentosRestantes = 3;
          let loginExitoso = false;
          while (intentosRestantes > 0 && !loginExitoso) {
            if (user.clave === password) {
              Swal.fire('Inicio de Sesión Correcto', '', 'success');
              loginExitoso = true;
              break;
            } else {
              intentosRestantes--;
              if (intentosRestantes === 0) {
                Swal.fire('Has agotado todos los intentos posibles', 'Vuelve a iniciar sesión', 'error');
                return;
              } else {
                Swal.fire(`Clave incorrecta. Te quedan ${intentosRestantes} intentos restantes.`);
                return { login, password }
            }
          }
        }
      }}
    })
    });
  
  // Clase Producto
  class Producto {
    constructor(id, bebida, marca, variedad, precio, img) {
      this.id = id;
      this.bebida = bebida;
      this.marca = marca;
      this.variedad = variedad;
      this.precio = precio;
      this.img = img;
      this.cantidad = 1;
    }
  }

  // Crear Productos
  const whiskyJDO = new Producto(1, "Whisky", "Jack Daniels", "N° 7", 13500, "/img/WhiskyJackDaniels.png");
  const whiskyJWR = new Producto(2, "Whisky", "Jhonnie Walker", "Red", 7000, "/img/WhiskyJhonnieWalkerRed.png");
  const whiskyJWB = new Producto(3, "Whisky", "Jhonnie Walker", "Black", 15000, "/img/WhiskyJhonnieWalkerBlack.png");
  const ginTO = new Producto(4, "Gin", "Tanqueray", "Original", 8000, "/img/GinTanquerayOriginal.png");
  const ginBS = new Producto(5, "Gin", "Bombay", "Shapire", 9000, "../img/GinBombayShapire.png");
  const ganciaAO = new Producto(6, "Gancia", "Americano", "Original", 1000, "/img/GanciaAmericanoOriginal.png");
  const fernetBO = new Producto(7, "Fernet" , "Branca" , "Original", 2200, "/img/FernetBrancaOriginal.png");
  const vodkaAO = new Producto(8, "Vodka" , "Absolut" , "Original", 6000, "/img/VodkaAbsolutOriginal.png");

  // Array's
  const productos = [whiskyJDO, whiskyJWR, whiskyJWB, ginTO, ginBS, ganciaAO, fernetBO, vodkaAO];
  let carrito = [];

  //Cargar carrito desde storage
  carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

  // Modificar DOM para mostrar los productos
  const contenedorProductos = document.getElementById("contenedorProductos");

  // Función Mostras Productos
  const showProductos = async () => {
    // try{
      // const response = await fetch(`../data.json`)
      // const data = await response.json();
      // data.forEach((producto) => {
    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6");
      card.innerHTML = `
        <div class="card">
          <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.bebida}">
          <div>
            <h5>${producto.bebida}</h5>
            <h5>${producto.marca}</h5>
            <h5>${producto.variedad}</h5>
            <p>${producto.precio}</p>
            <button class="btn colorBoton" id="boton${producto.id}" >Agregar al Carrito</button>
          </div>
        </div>
      `;
      contenedorProductos.appendChild(card);
      
      // Agregar productos al carrito
      const boton = document.getElementById(`boton${producto.id}`);
      boton.addEventListener("click", () => {
        addCarrito(producto.id);
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregaste el producto al carrito de compras'
      })}
      );
    });
    // }catch(error){
    //   console.log(error);
  };

  showProductos();

  // Función Agregar al Carrito
  const addCarrito = (id) => {
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
    } else {
      const producto = productos.find((producto) => producto.id === id);
      carrito.push(producto);
    }
    calcularTotal()
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  // Función Elimar Carrito
  const vaciarCarrito = () => {
    carrito = [];
    localStorage.clear;
    sessionStorage.clear;
  };
  const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
  vaciarCarritoBtn.addEventListener("click", () => {
    vaciarCarrito();
  });

  //Mostrar el carrito de compras
  const contenedorCarrito = document.getElementById("contenedorCarrito");
  const verCarrito = document.getElementById("verCarrito");

  verCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
    Swal.fire(
      'Ingrese la cantidad de botellas a adquirir. Por compra de más de 1 unidad se aplica un 10% de descuento, por más de 3 unidades se aplica un 15% de descuento y por compra de más de 5 unidades se aplica un 20% de descuento'
    );
    } else {
      Swal.fire(
        'No hay productos en el carrito'
      );
    }
    mostrarCarrito();
  })

  const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
    //   fetch(`../data.json`)
    // .then((response) => response.json())
    // .then((data) => {
      // data.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6");
      card.innerHTML = `
      <div class="card">
      <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.bebida}">
      <div>
            <h5>${producto.bebida}</h5>
            <h5>${producto.marca}</h5>
            <h5>${producto.variedad}</h5>
            <p>${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <div>
              <button class="btn btn-primary" id="restar${producto.id}">-</button>
              <button class="btn btn-primary" id="sumar${producto.id}">+</button>
              <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar</button>
            </div>
          </div>
        </div>
      `;
      contenedorCarrito.appendChild(card);

    //Eliminar productos en el carrito de compras
    const botonEliminar = document.getElementById(`eliminar${producto.id}`);
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });

    //Sumar producto en el carrito de compras
    const botonSumar = document.getElementById(`sumar${producto.id}`);
    botonSumar.addEventListener("click", () => {
      sumarProducto(producto.id);
    });

    //Restar producto en el carrito de compras
    const botonRestar = document.getElementById(`restar${producto.id}`);
    botonRestar.addEventListener("click", () => {
      restarProducto(producto.id);
      });
    });
    calcularTotal();
  };

  //Sumar productos en el carrito
  const sumarProducto = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    producto.cantidad++;
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  //Restar productos en el carrito
  const restarProducto = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    if (producto.cantidad > 1) {
      producto.cantidad--;
      mostrarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      eliminarDelCarrito(id);
    }
  }

  //Eliminar producto
  const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((producto) => producto.id !== id);
    mostrarCarrito();
  };

  //Total
  const total = document.getElementById("total");
  const calcularTotal = () => {
  let totalCompra = 0;
  let descuento = 0;
  let totalUnidades = 0;

  carrito.forEach(producto => {
    totalUnidades += producto.cantidad;
    totalCompra += producto.precio * producto.cantidad;
  });

  if (totalUnidades > 5) {
    descuento = 0.2; // 20% de descuento por más de 5 unidades
  } else if (totalUnidades > 3) {
    descuento = 0.15; // 15% de descuento por más de 3 unidades
  } else if (totalUnidades > 1) {
    descuento = 0.1; // 10% de descuento por más de 1 unidad
  }

  const totalConDescuento = totalCompra * (1 - descuento);
  total.innerHTML = `$${totalConDescuento}`; 
  }


  //Finalizar compra
  const finalizarCompra = document.getElementById("finalizarCompra");
  finalizarCompra.addEventListener("click", () => {

    if (carrito.length === 0) {
    Swal.fire({
      title: 'Error, no hay productos en el carrito',
      color: '#545454',
      icon:'error',
      confirmButtonColor:'#000000',
  })
    } else {
      const total = document.getElementById("total").textContent;
      Swal.fire({
        title: `Total de la compra con descuento: ${total}`,
        text: ' Aceptamos tarjeta, transferencia o depósito bancario',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor:'#000000',
        cancelButtonText: 'Cancelar',
        input: 'select',
        inputOptions: {
          tarjeta: 'Tarjeta',
          transferencia: 'Transferencia',
          deposito: 'Depósito'
        },
        inputValidator: (value) => {
          if (!value) {
            return 'Debe seleccionar un medio de pago';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedPaymentMethod = result.value;
          if (selectedPaymentMethod === "transferencia") {
            Swal.fire(
              'Deberá realizar la transferencia al CBU N° 0202445920000422492248',
              'Titular de la cuenta: La Bodega SRL',
              'Banco Santander Río'
            );
          } else if (selectedPaymentMethod === "deposito") {
            Swal.fire(
              'Deberá realizar el depósito en la cuenta N° 264-337792/8',
              'Titular de la cuenta: La Bodega SRL',
              'Banco Santander Río'
            );
          } else if (selectedPaymentMethod === "tarjeta") {
            Swal.fire(
              'Ingrese los datos de su tarjeta de crédito o débito'
            );
          }
        } else {
          Swal.fire(
            'Pago cancelado',
          );
        }
        eliminarTodoElCarrito();
    });

  //Vaciar carrito
  const vaciarCarrito = document.getElementById("vaciarCarrito");
  vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
  });
  const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
  }
  }}
  );
    } else {
    Swal.fire(
    'Acceso denegado', 'Debes ser mayor de 18 años para poder realizar compras en la tienda', 'error'
    )};
    }

);


document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleNavbar');
  const navbarList = document.getElementById('navbarList');

  toggleButton.addEventListener('click', function () {
      if (navbarList.style.display === 'none' || navbarList.style.display === '') {
          navbarList.style.display = 'flex';
      } else {
          navbarList.style.display = 'none';
      }
  });
});

window.addEventListener('resize', function () {
  const navbarList = document.getElementById('navbarList');
  const toggleButton = document.getElementById('toggleNavbar');
  
  if (window.innerWidth > 1050) {
      navbarList.style.display = 'flex'; // Mostrar la lista de navegación en pantallas grandes
      toggleButton.style.display = 'none'; // Ocultar el botón de dropdown en pantallas grandes
  } else {
      navbarList.style.display = 'none'; // Ocultar la lista de navegación en pantallas pequeñas
      toggleButton.style.display = 'block'; // Mostrar el botón de dropdown en pantallas pequeñas
  }
});