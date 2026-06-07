const inventory = [
  {
    model: "BMW 320i M Sport",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
    specs: ["2.0L Petrol", "Automatic", "Leather Interior", "M Sport Package"],
    price: "LKR 18.5M",
    availability: "available"
  },
  {
    model: "BMW 520d Executive",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=900&q=85",
    specs: ["Diesel", "Automatic", "Executive Comfort", "Navigation"],
    price: "LKR 24.9M",
    availability: "booking"
  },
  {
    model: "BMW X5 xDrive",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=900&q=85",
    specs: ["SUV", "xDrive AWD", "Panoramic Roof", "7 Seat Option"],
    price: "LKR 42.0M",
    availability: "available"
  },
  {
    model: "BMW M4 Competition",
    image: "https://images.unsplash.com/photo-1627936351009-5b1f8028c7e6?auto=format&fit=crop&w=900&q=85",
    specs: ["Performance Coupe", "Twin Turbo", "Sport Exhaust", "Carbon Trim"],
    price: "Ask for Price",
    availability: "booking"
  },
  {
    model: "BMW 740Li Luxury",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85",
    specs: ["Luxury Sedan", "Rear Comfort", "Hybrid Option", "Premium Audio"],
    price: "LKR 38.5M",
    availability: "sold"
  },
  {
    model: "BMW X1 sDrive",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85",
    specs: ["Compact SUV", "Efficient Drive", "Automatic", "Family Ready"],
    price: "LKR 17.2M",
    availability: "available"
  }
];

const inventoryGrid = document.querySelector("#inventoryGrid");
const inventorySearch = document.querySelector("#inventorySearch");
const inventoryFilter = document.querySelector("#inventoryFilter");
const year = document.querySelector("#year");

const availabilityLabels = {
  available: "Available",
  booking: "Booking Open",
  sold: "Recently Sold"
};

function renderInventory() {
  const searchValue = inventorySearch.value.trim().toLowerCase();
  const filterValue = inventoryFilter.value;

  const filteredCars = inventory.filter((car) => {
    const searchableText = `${car.model} ${car.specs.join(" ")} ${car.price} ${availabilityLabels[car.availability]}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchValue);
    const matchesFilter = filterValue === "all" || car.availability === filterValue;
    return matchesSearch && matchesFilter;
  });

  if (!filteredCars.length) {
    inventoryGrid.innerHTML = `
      <div class="col-12">
        <div class="service-card text-center">
          <h3>No BMW models found</h3>
          <p>Try a different search term or availability filter.</p>
        </div>
      </div>
    `;
    return;
  }

  inventoryGrid.innerHTML = filteredCars.map((car) => `
    <div class="col-md-6 col-xl-4 reveal visible">
      <article class="inventory-card">
        <img src="${car.image}" alt="${car.model}">
        <div class="inventory-card-body">
          <h3>${car.model}</h3>
          <div class="inventory-meta">
            ${car.specs.map((spec) => `<span>${spec}</span>`).join("")}
          </div>
          <div class="price-row">
            <strong>${car.price}</strong>
            <span class="availability ${car.availability}">${availabilityLabels[car.availability]}</span>
          </div>
        </div>
      </article>
    </div>
  `).join("");
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll(".nav-link, .navbar-brand, .hero-actions a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("#mainNav");
    const collapse = bootstrap.Collapse.getInstance(nav);
    if (collapse) {
      collapse.hide();
    }
  });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name");
  const phone = formData.get("phone") || "Not provided";
  const message = formData.get("message");
  const whatsappMessage = encodeURIComponent(`Service enquiry from ${name}\nPhone: ${phone}\nMessage: ${message}`);
  window.open(`https://wa.me/94774271715?text=${whatsappMessage}`, "_blank", "noopener");
  form.reset();
});

inventorySearch.addEventListener("input", renderInventory);
inventoryFilter.addEventListener("change", renderInventory);
year.textContent = new Date().getFullYear();
renderInventory();
setupRevealAnimations();
