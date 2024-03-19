//carrito de compras

let elementosCarrito = [];
const contenedorProductos = document.getElementById('grid');
const contenedorElementosCarrito = document.getElementById('carrito');
const totalSpan = document.getElementById('total');

function renderizarProductos() {
	productos.forEach((producto) => {
		const card = document.createElement('card');
		card.innerHTML = `
      <img src=./img/${producto.img}>
			<h3>${producto.nombre}</h3>
      <p>CLP $${producto.precio}</p>
      <button class="btn-agregar-carrito" data-id="${producto.codigo}">Agregar</button>`;
		contenedorProductos.appendChild(card);
	});
}

//agregar al carrito el producto

function agregarAlCarrito(idProducto) {
	const itemExistente = elementosCarrito.find((item) => item.codigo === idProducto);
	if (itemExistente) {
		itemExistente.cantidad++;
	} else {
		const producto = productos.find((p) => p.codigo === idProducto);
		if (producto) {
			elementosCarrito.push({ ...producto, cantidad: 1 });
			renderizarCarrito();
		}
	}
	// Guardar el carrito actualizado en el localStorage
	localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
	renderizarCarrito();
}

//eliminar el producto

function eliminarDelCarrito(idProducto) {
	const indice = elementosCarrito.findIndex((item) => item.codigo === idProducto);
	if (indice !== -1) {
		elementosCarrito.splice(indice, 1);

		// Guardar el carrito actualizado en el localStorage
		localStorage.setItem('carrito', JSON.stringify(elementosCarrito));
		renderizarCarrito();
	}
}

function renderizarCarrito() {
	contenedorElementosCarrito.innerHTML = '';
	let precioTotal = 0;
	elementosCarrito.forEach((item) => {
		const div = document.createElement('div');

		div.innerHTML = `<p>${item.nombre} x ${item.cantidad}  - $${item.precio * item.cantidad}</p>`;

		const btnEliminar = document.createElement('button');
		btnEliminar.textContent = 'x';
		btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.codigo));
		div.appendChild(btnEliminar);
		contenedorElementosCarrito.appendChild(div);

		precioTotal += item.precio * item.cantidad;
	});

	const precioNeto = precioTotal / 1.19;
	const precioIVA = precioTotal - precioNeto;

	totalSpan.innerHTML = `
    <span>Precio Neto: $${precioNeto.toFixed(0)}</span>
    <span>IVA (19%): $${precioIVA.toFixed(0)}</span>
    <span class="bold">Precio Total: $${precioTotal.toFixed(0)}</span>
  `;
}
function realizarCompra() {
	const precioTotal = elementosCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
	// const precioNeto = precioTotal / 1.19;
	// const precioIVA = precioTotal - precioNeto;

	alert(`Compra finalizada\nTotal: $${precioTotal.toFixed(0)}`);
	elementosCarrito.length = 0;
	renderizarCarrito();
}

document.getElementById('btn-comprar').addEventListener('click', realizarCompra);

contenedorProductos.addEventListener('click', function (evento) {
	if (evento.target.classList.contains('btn-agregar-carrito')) {
		const idProducto = parseInt(evento.target.getAttribute('data-id'));
		agregarAlCarrito(idProducto);
	}
});

renderizarProductos();

// Función para cargar el carrito desde el localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
	const carritoGuardado = localStorage.getItem('carrito');
	if (carritoGuardado) {
		elementosCarrito = JSON.parse(carritoGuardado);
		renderizarCarrito();
	}
}

// Llama a la función para cargar el carrito desde el localStorage al cargar la página
cargarCarritoDesdeLocalStorage();
