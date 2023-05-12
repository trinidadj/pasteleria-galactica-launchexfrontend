window.onscroll = function(){

    var posicion = window.pageYOffset || document.documentElement.scrollTop;

    var elemento1 = document.getElementById("icon_cake");
    var elemento2 = document.getElementById("icon_shop");

    elemento1.style.bottom = posicion * 0.2 + "px";
    elemento2.style.top = posicion * 0.1 + "px";

}

window.addEventListener('load', function(){
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: true,
        dots: '.carousel__indicadores',
        arrows: {
        prev: '.carousel__anterior',
        next: '.carousel__siguiente'
        }
    });
    })

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pastel de chispas',
            precio: 40,
            imagen: '#'
        },
        {
            id: 2,
            nombre: 'Pastel De Chocolate',
            precio: 46,
            imagen: '#'
        },
        {
            id: 3,
            nombre: 'Pastel De Limon',
            precio: 40,
            imagen: '#'
        },
        {
            id: 4,
            nombre: 'Pastel De Plasma',
            precio: 50,
            imagen: '#'
        }, 
            {
            id: 5,
            nombre: 'Pastel De Unicornio',
            precio: 60,
            imagen: '#'
        },
            {
            id: 6,
            nombre: 'Pastel De Fresa',
            precio: 44,
            imagen: '#'
        },
            {
            id: 7,
            nombre: 'Sabor chocolate',
            precio: 0,
            imagen: '#'
        },
        {
            id: 8,
            nombre: 'Sabor Fresa',
            precio: 0,
            imagen: '#'
        },
        {
            id: 9,
            nombre: 'Sabor Chispas',
            precio: 0,
            imagen: '#'
        },
        {
            id: 10,
            nombre: 'Unicornio',
            precio: 0,
            imagen: '#'
        },
        {
            id: 11,
            nombre: 'Velas',
            precio: 10,
            imagen: '#'
        },
        {
            id: 12,
            nombre: 'Velas de Colores',
            precio: 10,
            imagen: '#'
        },
        {
            id: 13,
            nombre: 'Velas con Luces',
            precio: 10,
            imagen: '#'
        },
    
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
  baseDeDatos.forEach((producto) => {
    // Estructura
    const miNodo = document.createElement('div');
    miNodo.classList.add('card', 'col-sm-4');
    // Body
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');
    // Titulo
    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    miNodoTitle.textContent = producto.nombre;
    // Imagen
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('img-fluid');
    miNodoImagen.setAttribute('src', producto.imagen);
    // Precio
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent = `${producto.precio}${divisa}`;
    // Boton
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    miNodoBoton.textContent = '+';
    miNodoBoton.dataset.id = producto.id;
    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/**
 * Añade un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
  const idProducto = evento.target.dataset.id;
  const productoEnCarrito = carrito.find((producto) => producto.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      id: idProducto,
      cantidad: 1
    });
  }

  renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
  DOMcarrito.innerHTML = '';

  const carritoSinDuplicados = carrito.filter((producto, index, array) => {
    return array.findIndex((p) => p.id === producto.id) === index;
  });

  carritoSinDuplicados.forEach((producto) => {
    const { id, cantidad } = producto;
    const productoEnBd = baseDeDatos.find((producto) => producto.id === id);
    const totalProducto = (cantidad * productoEnBd.precio).toFixed(2);

    // Nodo del producto en el carrito
    const miNodo = document.createElement('li');
    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
    miNodo.innerHTML = `
      ${cantidad} x ${productoEnBd.nombre} - ${productoEnBd.precio}${divisa} = ${totalProducto}${divisa}
      <button class="btn btn-danger mx-5
