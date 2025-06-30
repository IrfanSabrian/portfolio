// Initialize AOS
AOS.init({
  duration: 1000,
  once: false,
  offset: 100,
  mirror: true,
  easing: "ease-out-cubic",
  delay: 100,
});

// Initialize Typed.js
const typed = new Typed(".typed-text", {
  strings: [
    "Frontend Developer",
    "Web Designer",
    "GIS Enthusiast",
    "Data Analytics Explorer",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  showCursor: false,
});

// Navbar Active State and Scroll Behavior
const navbar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
let lastScroll = 0;

// Ensure navbar is transparent on page load
document.addEventListener("DOMContentLoaded", () => {
  if (window.pageYOffset <= 50) {
    navbar.classList.add("navbar-at-top");
    navbar.classList.remove("navbar-scrolled");
  }
});

window.addEventListener("scroll", () => {
  // Active section highlighting
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("text-primary");
    }
  });

  // Navbar show/hide and background on scroll
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 50) {
    navbar.classList.add("navbar-at-top");
    navbar.classList.remove("navbar-scrolled", "navbar-hide");
  } else {
    navbar.classList.remove("navbar-at-top");
    navbar.classList.add("navbar-scrolled");

    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add("navbar-hide");
    } else {
      navbar.classList.remove("navbar-hide");
    }
  }

  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-times");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.add("hidden");
    menuToggle.querySelector("i").classList.add("fa-bars");
    menuToggle.querySelector("i").classList.remove("fa-times");
  }
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    // Add active class to clicked button
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    // First hide all cards with animation
    projectCards.forEach((card) => {
      card.classList.add("hidden-card");
    });

    // After hiding animation, show filtered cards
    setTimeout(() => {
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          // Remove hidden class and add showing animation
          card.classList.remove("hidden-card");
          card.classList.add("showing-card");
        } else {
          card.style.display = "none";
          card.classList.remove("showing-card");
        }
      });
    }, 300); // Wait for hide animation to complete
  });
});

// Remove animation classes after animation completes
projectCards.forEach((card) => {
  card.addEventListener("animationend", () => {
    card.classList.remove("showing-card");
  });
});

// Particles.js Configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: false,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  retina_detect: true,
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    mobileMenu.classList.add("hidden");
    menuToggle.querySelector("i").classList.add("fa-bars");
    menuToggle.querySelector("i").classList.remove("fa-times");

    const targetId = this.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Form submission handling
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Create mailto link with form data
    const mailtoLink = `mailto:irfansabrian34@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form
    contactForm.reset();
  });
}

// Animasi skill tags
const skillTags = document.querySelectorAll(".skill-tags span");
skillTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
  tag.classList.add("animate-in");
});

// Throttle function for better performance
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Custom cursor implementation
function initCustomCursor() {
  // Check if screen width is less than 1024px (typical desktop breakpoint)
  if (window.innerWidth < 1024) {
    // Remove existing cursors if they exist
    const existingCursor = document.querySelector(".custom-cursor");
    const existingDot = document.querySelector(".cursor-dot");
    if (existingCursor) existingCursor.remove();
    if (existingDot) existingDot.remove();
    return;
  }

  const cursor = document.createElement("div");
  const cursorDot = document.createElement("div");

  cursor.classList.add("custom-cursor");
  cursorDot.classList.add("cursor-dot");

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  // Throttled cursor movement
  const updateCursorPosition = throttle((e) => {
    requestAnimationFrame(() => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });
  }, 10); // Update every 10ms maximum

  document.addEventListener("mousemove", updateCursorPosition);

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .filter-btn, .project-card, input, textarea"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursorDot.classList.add("hover");
    });
    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursorDot.classList.remove("hover");
    });
  });

  // Hide cursors when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
    cursorDot.style.display = "none";
  });

  // Show cursors when entering window
  document.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
    cursorDot.style.display = "block";
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      cursor.remove();
      cursorDot.remove();
    } else {
      if (!document.querySelector(".custom-cursor")) {
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
      }
    }
  });
}

// Initialize AOS with optimized settings
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true, // Animation only happens once
    offset: 150,
    delay: 0, // No delay for better performance
    mirror: false, // No mirroring for better performance
    easing: "ease-out",
    disable: "mobile", // Disable on mobile for better performance
  });

  // Initialize custom cursor
  initCustomCursor();

  // Initialize project filtering
  initProjectFiltering();

  // Initialize CV Modal functionality
  initCVModal();
});

// Project filtering with optimized performance
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const shouldShow =
          filter === "all" || card.getAttribute("data-category") === filter;
        card.style.display = shouldShow ? "block" : "none";

        if (shouldShow) {
          requestAnimationFrame(() => {
            card.classList.remove("hidden-card");
            card.classList.add("showing-card");
          });
        } else {
          card.classList.add("hidden-card");
          card.classList.remove("showing-card");
        }
      });
    });
  });
}

// Dark mode toggle
const darkToggle = document.getElementById("dark-toggle");
const htmlEl = document.documentElement;

function setDarkMode(enabled) {
  if (enabled) {
    htmlEl.classList.add("dark");
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
    // Update particles to star mode
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.line_linked.enable = false;
      window.pJSDom[0].pJS.particles.color.value = "#ffffff";
      window.pJSDom[0].pJS.particles.shape.type = "circle";
      window.pJSDom[0].pJS.particles.size.value = 2;
      window.pJSDom[0].pJS.particles.opacity.value = 1;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  } else {
    htmlEl.classList.remove("dark");
    darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
    // Update particles to normal mode
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.line_linked.enable = true;
      window.pJSDom[0].pJS.particles.color.value = "#ffffff";
      window.pJSDom[0].pJS.particles.shape.type = "circle";
      window.pJSDom[0].pJS.particles.size.value = 3;
      window.pJSDom[0].pJS.particles.opacity.value = 0.5;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }
}

darkToggle.addEventListener("click", () => {
  setDarkMode(!htmlEl.classList.contains("dark"));
});

// On load, set theme from localStorage or system
(function () {
  const theme = localStorage.getItem("theme");
  if (
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
})();

// Initialize CV Modal functionality
function initCVModal() {
  const cvModal = document.getElementById("cv-modal");
  const cvModalBtn = document.getElementById("cv-modal-btn");
  const cvModalClose = document.getElementById("cv-modal-close");
  const pdfContainer = document.getElementById("pdf-container");
  const canvas = document.getElementById("pdf-viewer");
  const prevButton = document.getElementById("cv-prev");
  const nextButton = document.getElementById("cv-next");
  const pageInfo = document.getElementById("cv-page-info");
  const zoomInButton = document.getElementById("cv-zoom-in");
  const zoomOutButton = document.getElementById("cv-zoom-out");
  const zoomLevel = document.getElementById("cv-zoom-level");
  const downloadButton = document.getElementById("cv-download");

  // Check if all required elements exist
  if (!cvModal || !cvModalBtn || !cvModalClose || !canvas) {
    console.warn("CV Modal: Some elements are missing");
    return;
  }

  let pdfDoc = null;
  let pageNum = 1;
  let pageRendering = false;
  let pageNumPending = null;
  let scale = 1.0;
  const ctx = canvas.getContext("2d");

  // Initialize PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      pdfContainer.style.width = `${viewport.width}px`;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        pageRendering = false;
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
        pageInfo.textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
      });
    });
  }

  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  }

  function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
  }

  function updateZoomLevel() {
    zoomLevel.textContent = `${Math.round(scale * 100)}%`;
  }

  function zoomIn() {
    if (scale >= 3.0) return;
    scale += 0.25;
    updateZoomLevel();
    queueRenderPage(pageNum);
  }

  function zoomOut() {
    if (scale <= 0.5) return;
    scale -= 0.25;
    updateZoomLevel();
    queueRenderPage(pageNum);
  }

  // Load PDF
  function loadPDF() {
    const url = "assets/pdf/CV_Irfan Sabrian Fadhillah.pdf";
    pdfjsLib.getDocument(url).promise.then((pdf) => {
      pdfDoc = pdf;
      pageInfo.textContent = `Page ${pageNum} of ${pdf.numPages}`;
      renderPage(pageNum);
    });
  }

  function toggleCVModal() {
    cvModal.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
    if (!cvModal.classList.contains("hidden") && !pdfDoc) {
      loadPDF();
    }
  }

  // Event listeners
  cvModalBtn.addEventListener("click", toggleCVModal);
  cvModalClose.addEventListener("click", toggleCVModal);
  prevButton.addEventListener("click", onPrevPage);
  nextButton.addEventListener("click", onNextPage);
  zoomInButton.addEventListener("click", zoomIn);
  zoomOutButton.addEventListener("click", zoomOut);

  // Download functionality
  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "assets/pdf/CV_Irfan Sabrian Fadhillah.pdf";
    link.download = "CV_Irfan Sabrian Fadhillah.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Close modal when clicking outside
  cvModal.addEventListener("click", (e) => {
    if (
      e.target === cvModal ||
      e.target.classList.contains("backdrop-blur-sm")
    ) {
      toggleCVModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cvModal.classList.contains("hidden")) {
      toggleCVModal();
    }
  });

  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (cvModal.classList.contains("hidden")) return;

    if (e.key === "ArrowLeft") {
      onPrevPage();
    } else if (e.key === "ArrowRight") {
      onNextPage();
    } else if (e.key === "+" || e.key === "=") {
      zoomIn();
    } else if (e.key === "-" || e.key === "_") {
      zoomOut();
    }
  });
}
