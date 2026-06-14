const inventory = [
  {
    model: "BMW 320i M Sport",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_G20_(2022)_1X7A0420.jpg?width=900",
    specs: ["2.0L Petrol", "Automatic", "Leather Interior", "M Sport Package"],
    price: "LKR 18.5M",
    availability: "available",
    description: "A sporty executive sedan with balanced comfort, sharp handling, and premium BMW cabin quality for daily driving.",
    highlights: ["Ideal for city and highway use", "M Sport styling with premium interior feel", "Efficient engine with smooth automatic transmission", "Service and spare parts support available"]
  },
  {
    model: "BMW 520d Executive",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_F10_520d_Limousine_M_Sportpaket_Alpinweiss.JPG?width=900",
    specs: ["Diesel", "Automatic", "Executive Comfort", "Navigation"],
    price: "LKR 24.9M",
    availability: "booking",
    description: "A refined business-class BMW sedan with diesel efficiency, executive comfort, and strong long-distance cruising ability.",
    highlights: ["Comfort-focused executive seating", "Fuel-efficient diesel powertrain", "Navigation and premium driving features", "Booking open for serious enquiries"]
  },
  {
    model: "BMW X5 xDrive",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_X5_(47356480251).jpg?width=900",
    specs: ["SUV", "xDrive AWD", "Panoramic Roof", "7 Seat Option"],
    price: "LKR 42.0M",
    availability: "available",
    description: "A powerful luxury SUV with confident road presence, xDrive traction, spacious comfort, and family-friendly practicality.",
    highlights: ["Premium SUV stance and comfort", "xDrive all-wheel-drive capability", "Spacious cabin with panoramic roof option", "Great for family and business use"]
  },
  {
    model: "BMW M4 Competition",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2018_BMW_M4.jpg?width=900",
    specs: ["Performance Coupe", "Twin Turbo", "Sport Exhaust", "Carbon Trim"],
    price: "Ask for Price",
    availability: "booking",
    description: "A high-performance BMW coupe for enthusiasts who want aggressive styling, sharp response, and track-inspired character.",
    highlights: ["Twin-turbo performance feel", "Sport exhaust character", "Carbon-style premium trim", "Available by special booking enquiry"]
  },
  {
    model: "BMW 740Li Luxury",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_740Li_M_Sport_Package_(G12)_-_Frontansicht,_15._Juli_2017,_Düsseldorf.jpg?width=900",
    specs: ["Luxury Sedan", "Rear Comfort", "Hybrid Option", "Premium Audio"],
    price: "LKR 38.5M",
    availability: "sold",
    description: "A flagship luxury sedan built for comfort, quiet travel, and premium rear-seat experience.",
    highlights: ["Flagship BMW comfort", "Luxury rear cabin experience", "Premium audio and smooth ride", "Recently sold, similar models can be sourced"]
  },
  {
    model: "BMW X1 sDrive",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_X1_sDrive18d_xLine_(F48)_-_Frontansicht,_31._Oktober_2015,_Düsseldorf.jpg?width=900",
    specs: ["Compact SUV", "Efficient Drive", "Automatic", "Family Ready"],
    price: "LKR 17.2M",
    availability: "available",
    description: "A compact BMW SUV with practical space, efficient driving, and an easy premium ownership experience.",
    highlights: ["Compact SUV practicality", "Easy to drive and park", "Automatic transmission", "Good family-friendly entry BMW"]
  }
];

const inventoryGrid = document.querySelector("#inventoryGrid");
const inventorySearch = document.querySelector("#inventorySearch");
const inventoryFilter = document.querySelector("#inventoryFilter");
const year = document.querySelector("#year");
const fallbackImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_X5.jpg?width=900";
const touchShowcase = document.querySelector("#touchShowcase");
const inventoryModalElement = document.querySelector("#inventoryModal");
const inventoryModal = inventoryModalElement ? new bootstrap.Modal(inventoryModalElement) : null;

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

  inventoryGrid.innerHTML = filteredCars.map((car) => {
    const carIndex = inventory.indexOf(car);
    return `
    <div class="col-md-6 col-xl-4 reveal visible">
      <article class="inventory-card" role="button" tabindex="0" data-car-index="${carIndex}" aria-label="View full details for ${car.model}">
        <img src="${car.image}" alt="${car.model}" onerror="this.onerror=null;this.src='${fallbackImage}';">
        <div class="inventory-card-body">
          <h3>${car.model}</h3>
          <div class="inventory-meta">
            ${car.specs.map((spec) => `<span>${spec}</span>`).join("")}
          </div>
          <div class="price-row">
            <strong>${car.price}</strong>
            <span class="availability ${car.availability}">${availabilityLabels[car.availability]}</span>
          </div>
          <span class="view-details">View full details</span>
        </div>
      </article>
    </div>
  `;
  }).join("");
}

function openInventoryDetails(carIndex) {
  const car = inventory[carIndex];
  if (!car || !inventoryModal) {
    return;
  }

  document.querySelector("#modalCarImage").src = car.image;
  document.querySelector("#modalCarImage").alt = car.model;
  document.querySelector("#inventoryModalTitle").textContent = car.model;
  document.querySelector("#modalCarPrice").textContent = car.price;
  document.querySelector("#modalCarDescription").textContent = car.description;

  const availability = document.querySelector("#modalCarAvailability");
  availability.textContent = availabilityLabels[car.availability];
  availability.className = `availability ${car.availability}`;

  document.querySelector("#modalCarSpecs").innerHTML = car.specs.map((spec) => `<span>${spec}</span>`).join("");
  document.querySelector("#modalCarHighlights").innerHTML = car.highlights.map((highlight) => `<li>${highlight}</li>`).join("");

  const enquiryText = encodeURIComponent(`Hi, I want full details about ${car.model}. Price: ${car.price}. Availability: ${availabilityLabels[car.availability]}.`);
  document.querySelector("#modalWhatsApp").href = `https://wa.me/94774271715?text=${enquiryText}`;

  inventoryModal.show();
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

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.src = fallbackImage;
  });
});

if (touchShowcase) {
  const colorButtons = touchShowcase.querySelectorAll(".color-dot");

  const moveShowcase = (clientX, clientY) => {
    const rect = touchShowcase.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    touchShowcase.style.transform = `rotateY(${x * 11}deg) rotateX(${-y * 8}deg)`;
  };

  touchShowcase.addEventListener("mousemove", (event) => {
    moveShowcase(event.clientX, event.clientY);
  });

  touchShowcase.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (touch) {
      moveShowcase(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  touchShowcase.addEventListener("mouseleave", () => {
    touchShowcase.style.transform = "rotateY(0deg) rotateX(0deg)";
  });

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      colorButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      touchShowcase.dataset.filter = button.dataset.filter;
    });
  });
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
inventoryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".inventory-card");
  if (card) {
    openInventoryDetails(card.dataset.carIndex);
  }
});
inventoryGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  const card = event.target.closest(".inventory-card");
  if (card) {
    event.preventDefault();
    openInventoryDetails(card.dataset.carIndex);
  }
});
year.textContent = new Date().getFullYear();
renderInventory();
setupRevealAnimations();
