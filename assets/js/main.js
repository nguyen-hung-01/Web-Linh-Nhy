// Function to load HTML file to specified location =======================================
async function loadComponent(selector, file) {
  try {
    const response = await fetch(file);
    const data = await response.text();
    document.querySelector(selector).innerHTML = data;
  } catch (error) {
    console.error(`Lỗi khi tải ${file}:`, error);
  }
}

// Relative path `partial/` ===============================================================
let pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

// Load Header, Footer, Chat AI ===========================================================
document.addEventListener("DOMContentLoaded", async function () {
  await loadComponent("#header", pathPrefix + "partial/header.html");
  await loadComponent("#footer", pathPrefix + "partial/footer.html");
  await loadComponent("#chatAi", pathPrefix + "partial/chat-ai-mobile.html");

  // Event Sticky Header ===================================================================
  var header = document.getElementById("sticky-header");
  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html"
  ) {
    header.classList.add("header-page");
  }

  function handleStickyHeader() {
    if (window.innerWidth < 768) {
      header.classList.remove("sticky");
      document.body.style.marginTop = "0px";
      return;
    }

    var stickyPosition = header.offsetTop + header.offsetHeight;
    if (window.pageYOffset > stickyPosition) {
      header.classList.add("sticky");
      document.body.style.marginTop = header.offsetHeight + "px";
    } else {
      header.classList.remove("sticky");
      document.body.style.marginTop = "0px";
    }
  }

  if (header) {
    window.addEventListener("scroll", handleStickyHeader);
    window.addEventListener("resize", handleStickyHeader);
    handleStickyHeader();
  }

  // Menu active ==============================================================================
  const currentPath = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll("nav ul li a").forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/$/, "");
    console.log(`${linkPath} = ${currentPath}`);
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // Toggle menu mobile  ======================================================================
  const btnOpenMenuMobile = document.querySelector(".open-navigation");
  const btnCloseMenuMobile = document.querySelector(".close-navigation");
  const menuMobile = document.querySelector("nav");
  console.log(btnCloseMenuMobile);
  btnOpenMenuMobile.onclick = () => {
    menuMobile.classList.add("open-menu-mobile");
  };
  btnCloseMenuMobile.onclick = () => {
    menuMobile.classList.remove("open-menu-mobile");
  };

  // Change language ===========================================================================
  const btnToggleLang = document.getElementById("language");
  console.log(btnToggleLang);
  btnToggleLang.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".language-modal")
      .classList.toggle("open-lang-modal");
  });

  const currentLang = document.getElementById("current-lang");
  const listLang = document.querySelectorAll(".language-modal div");
  console.log(listLang);
  listLang.forEach((item) => {
    item.addEventListener("click", () => {
      listLang.forEach((lang) => lang.classList.remove("lang-active"));
      item.classList.add("lang-active");
      const selectedSpan = item.querySelector("span");
      if (selectedSpan) {
        currentLang.innerHTML = selectedSpan.textContent;
      }
    });
  });

  // Menu Dropdown ==============================================================================
  const btnToggleModalAbout = document.getElementById("about-dropdown");
  const btnToggleModalProduct = document.getElementById("product-dropdown");

  btnToggleModalAbout.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".about-modal")
      .classList.toggle("open-menu-dropdown");
    document.querySelectorAll(".about-modal div").forEach((item) => {
      item.addEventListener("click", () => {
        window.location = "../../pages/about.html";
      });
    });
  });
  btnToggleModalProduct.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".product-modal")
      .classList.toggle("open-menu-dropdown");
    document.querySelectorAll(".product-modal div").forEach((item) => {
      item.addEventListener("click", () => {
        console.log(item);
        window.location = "../../pages/about.html";
      });
    });
  });

  // Toggle slide bar ===========================================================================
  const btnOpenSlideBar = document.querySelector(".open-slide-bar");
  const btnCloseSlideBar = document.querySelector(".close-slide-bar");
  const slideBar = document.querySelector(".slide-bar");
  if (slideBar) {
    btnOpenSlideBar.onclick = () => {
      slideBar.classList.add("slide-bar-transform");
    };
    btnCloseSlideBar.onclick = () => {
      slideBar.classList.remove("slide-bar-transform");
    };
  }

  // Box chat ====================================================================================
  const boxChat = document.getElementById("box-chat");
  const btnOpenBoxChat = document.getElementById("openBoxChat");
  const btnCloseBoxChat = document.getElementById("closeBoxChat");
  function toggleBoxChat() {
    boxChat.classList.toggle("open-box-chat");
    console.log(
      "Trạng thái hộp chat:",
      boxChat.classList.contains("open-box-chat") ? "Mở" : "Đóng"
    );
  }
  btnOpenBoxChat.onclick = toggleBoxChat;
  btnCloseBoxChat.onclick = toggleBoxChat;

  // Swiper slider ================================================================================
  // Page Home
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 85,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });
  // Page Information
  const swiperInfo = new Swiper(".swiperInfo", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
  });
});
