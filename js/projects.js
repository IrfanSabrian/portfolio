// Project data structure
const projects = [
  {
    id: 1,
    title: "Website Diskominfo Kalbar",
    description:
      "Redesigned and developed the official website for the Department of Communication and Information Technology of West Kalimantan Province using modern web technologies to enhance UI/UX and performance",
    categories: ["web"],
    image: "assets/images/project1.jpg",
    technologies: [
      "Hugo",
      "Tailwind CSS",
      "Swiper.js",
      "FancyBox.js",
      "AOS Animate",
    ],
    links: {
      github: "https://github.com/IrfanSabrian/Diskominfo-Kalbarprov-2025",
      live: "https://diskominfo.kalbarprov.go.id/",
    },
  },
  {
    id: 2,
    title: "Website Balitbang Kalbar",
    description:
      "Redesigned and developed the official website for the Research and Development Agency of West Kalimantan Province using modern web technologies to enhance UI/UX and performance",
    categories: ["web"],
    image: "assets/images/project2.jpg",
    technologies: [
      "Hugo",
      "Tailwind CSS",
      "Swiper.js",
      "FancyBox.js",
      "AOS Animate",
    ],
    links: {
      github: "https://github.com/IrfanSabrian/Balitbang-Kalbarprov-2025",
      live: "https://litbang.kalbarprov.go.id/",
    },
  },
  {
    id: 3,
    title: "SIPARTI - Room Management System",
    description:
      "Interactive room management system with data analytics features for Polnep's Informatics Department, featuring 2D floor plans, real-time status monitoring, usage statistics, and occupancy analysis",
    categories: ["web", "system"],
    image: "assets/images/project3.jpg",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Supabase",
      "Vercel",
      "Interactive Maps",
      "Authentication",
      "Data Visualization",
      "Usage Analytics",
    ],
    links: {
      github:
        "https://github.com/IrfanSabrian/SIPARTI-Sistem-Informasi-Penggunaan-Ruang-Teknik-Informatika",
      live: "http://siparti.vercel.app",
    },
  },
  {
    id: 4,
    title: "Employee Data Manager",
    description:
      "Comprehensive employee management system with advanced data analytics capabilities, featuring CRUD operations, demographic analysis, salary management, and employee lifecycle tracking. Built with Python and Streamlit for interactive data visualization and analysis.",
    categories: ["data", "system"],
    image: "assets/images/project4.jpg",
    technologies: [
      "Python",
      "Streamlit",
      "Pandas",
      "Plotly",
      "Excel Integration",
      "Data Analytics",
      "Data Visualization",
      "Authentication System",
    ],
    links: {
      github: "https://github.com/IrfanSabrian/employee-data-manager",
      live: "https://employee-data-manager-irfansabrian.streamlit.app/",
    },
  },
];

// Pagination configuration
const ITEMS_PER_PAGE = 3;
let currentPage = 1;

// Function to generate HTML for a single project
function generateProjectHTML(project) {
  const technologiesHTML = project.technologies
    .map(
      (tech) => `
            <span class="px-3 py-1 bg-gray-100 text-primary rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
                ${tech}
            </span>
        `
    )
    .join("");

  return `
        <div class="project-card bg-white rounded-xl overflow-hidden shadow-lg group" 
             data-categories='${JSON.stringify(
               project.categories || [project.category]
             )}' 
             data-aos="fade-up">
            <div class="relative overflow-hidden pt-[56.25%]">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a href="${project.links.github}" 
                       target="_blank"
                       class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform">
                        <i class="fab fa-github text-xl"></i>
                    </a>
                    <a href="${project.links.live}" 
                       target="_blank"
                       class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform">
                        <i class="fas fa-external-link-alt text-lg"></i>
                    </a>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${technologiesHTML}
                </div>
            </div>
        </div>
    `;
}

// Function to generate pagination HTML
function generatePaginationHTML(totalPages) {
  let paginationHTML = `
    <div class="flex justify-center items-center space-x-2 mt-8">
      <button class="pagination-btn prev-btn px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" ${
        currentPage === 1 ? "disabled" : ""
      }>
        <i class="fas fa-chevron-left"></i>
      </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="pagination-btn page-btn px-4 py-2 rounded-lg ${
        currentPage === i
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
      } transition-colors" data-page="${i}">
        ${i}
      </button>
    `;
  }

  paginationHTML += `
      <button class="pagination-btn next-btn px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" ${
        currentPage === totalPages ? "disabled" : ""
      }>
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;

  return paginationHTML;
}

// Function to render projects with pagination
function renderProjects(filteredProjects = projects) {
  const projectsContainer = document.querySelector("#projects-container");
  const paginationContainer = document.querySelector("#pagination-container");
  if (!projectsContainer || !paginationContainer) return;

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  let projectsHTML;

  if (filteredProjects.length === 0) {
    projectsHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div class="text-6xl mb-4">🚧</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h3>
        <p class="text-gray-600">Projects in this category are currently under development.</p>
      </div>
    `;
  } else {
    projectsHTML = currentProjects
      .map((project) => generateProjectHTML(project))
      .join("");
  }

  projectsContainer.innerHTML = projectsHTML;
  paginationContainer.innerHTML = generatePaginationHTML(totalPages);

  // Add event listeners to pagination buttons
  const prevBtn = paginationContainer.querySelector(".prev-btn");
  const nextBtn = paginationContainer.querySelector(".next-btn");
  const pageButtons = paginationContainer.querySelectorAll(".page-btn");

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProjects(filteredProjects);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProjects(filteredProjects);
    }
  });

  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = parseInt(button.dataset.page);
      renderProjects(filteredProjects);
    });
  });
}

// Function to filter projects
function filterProjects(category) {
  currentPage = 1; // Reset to first page when filtering
  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((project) =>
          Array.isArray(project.categories)
            ? project.categories.includes(category)
            : project.categories === category
        );
  renderProjects(filteredProjects);
}

// Initialize projects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();

  // Add click handlers to filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      // Update active button state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      filterProjects(category);
    });
  });
});
