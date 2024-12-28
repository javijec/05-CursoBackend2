document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/auth/online", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      const userData = await response.json();
      console.log(`Usuario autenticado: ${userData.response}`);
      const userGreeting = document.getElementById("user-greeting");
      const authLinks = document.getElementById("auth-links");
      userGreeting.textContent = `Hola, ${userData.response}`;
      userGreeting.style.display = "block";
      authLinks.style.display = "none";
    } else {
      console.log("Usuario no autenticado. Permaneciendo en la página de inicio de sesión.");
    }
  } catch (error) {
    console.error("Error al verificar el estado del usuario:", error);
  }
});

// Function to render products
function renderProducts(productsToRender) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCol = document.createElement("div");
    productCol.className = "col";

    productCol.innerHTML = `
              <div class="card h-100 shadow-sm">
                  ${
                    product.thumbnails && product.thumbnails.length > 0
                      ? `<img src="${product.thumbnails[0]}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${product.title}">`
                      : `<div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">
                              <i class="fas fa-image fa-3x"></i>
                          </div>`
                  }

                  <div class="card-body">
                      <h5 class="card-title text-truncate fw-bold">${product.title}</h5>
                      <p class="card-text">${product.description}</p>

                      <div class="mb-3">
                          <span class="badge bg-primary">${product.category}</span>
                          ${
                            product.status
                              ? '<span class="badge bg-success">Disponible</span>'
                              : '<span class="badge bg-danger">No disponible</span>'
                          }
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                          <h4 class="text-primary mb-0">$${product.price}</h4>
                          <span class="text-muted">Stock: ${product.stock}</span>
                      </div>

                      <button onclick="window.addToCart('${product.id}')"
                          class="btn btn-primary w-100 mt-3 ${!product.status ? "disabled" : ""}">
                          <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
                      </button>

                      <hr class="my-2">

                      <div class="d-flex justify-content-between align-items-center small text-muted">
                          <span>ID: ${product.id}</span>
                          <span>Código: ${product.code}</span>
                      </div>
                  </div>
              </div>
          `;

    productGrid.appendChild(productCol);
  });

  // Hide loading overlay
  document.getElementById("loading-overlay").style.display = "none";
}

// Function to add product to cart
async function addToCart(productId) {
  try {
    // Mostrar SweetAlert2 para solicitar el CID
    const { value: cartId } = await Swal.fire({
      title: "Agregar al carrito",
      input: "text",
      inputLabel: "Ingrese el ID del carrito",
      inputPlaceholder: "CID...",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Agregar",
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar un ID de carrito";
        }
      },
    });

    if (cartId) {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Producto agregado al carrito correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Error al agregar el producto");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al agregar el producto al carrito",
    });
  }
}

// Expose addToCart to window to work with inline onclick
window.addToCart = addToCart;

// Async function to load and render products
async function initializePage() {
  try {
    const response = await fetch("/api/products/paginated");
    const data = await response.json();
    const products = data.response.docs;

    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);

    // Hide loading overlay
    document.getElementById("loading-overlay").style.display = "none";

    // Show error message to user
    await Swal.fire({
      icon: "error",
      title: "Error de carga",
      text: "No se pudieron cargar los productos. Por favor, intente nuevamente.",
    });
  }
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
