document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/auth/online", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const userData = await response.json();
      const userGreeting = document.getElementById("user-greeting");
      const authLinks = document.getElementById("auth-links");
      const cartLink = document.getElementById("cart-link");
      userGreeting.textContent = `Hola, ${userData.response}`;
      userGreeting.style.display = "block";
      authLinks.style.display = "none";
      cartLink.style.display = "block";
      loadCartItems();
    } else {
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.error("Error al verificar el estado del usuario:", error);
  }
});

async function loadCartItems() {
  try {
    const response = await fetch("/api/carts");
    const data = await response.json();
    const cartItems = data.response;
    renderCartItems(cartItems);
  } catch (error) {
    console.error("Error al cargar los productos del carrito:", error);
  }
}

function renderCartItems(cartItems) {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-details">
        <h5>${item.product.title}</h5>
        <p>${item.product.description}</p>
        <p>Cantidad: ${item.quantity}</p>
        <p>Precio: $${item.product.price}</p>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  const checkoutButton = document.getElementById("checkoutButton");
  if (cartItems.length > 0) {
    checkoutButton.style.display = "block";
    checkoutButton.addEventListener("click", finalizePurchase);
  } else {
    checkoutButton.style.display = "none";
  }
}

async function finalizePurchase() {
  try {
    const response = await fetch("/api/carts/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await Swal.fire({
        icon: "success",
        title: "¡Compra finalizada!",
        text: "Tu compra se ha realizado con éxito.",
        timer: 2000,
        showConfirmButton: false,
      });
      loadCartItems();
    } else {
      throw new Error("Error al finalizar la compra");
    }
  } catch (error) {
    console.error("Error:", error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al finalizar la compra.",
    });
  }
}
