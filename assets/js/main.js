// Function to load HTML file to specified location
async function loadComponent(selector, file) {
  try {
    const response = await fetch(file);
    const data = await response.text();
    document.querySelector(selector).innerHTML = data;
  } catch (error) {
    console.error(`Lỗi khi tải ${file}:`, error);
  }
}

// Relative path `partial/`
let pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

document.addEventListener("DOMContentLoaded", async function () {
  // Load Header & Footer
  await loadComponent("#header", pathPrefix + "partial/header.html");
  await loadComponent("#footer", pathPrefix + "partial/footer.html");
  await loadComponent("#chatAi", pathPrefix + "partial/chat-ai-mobile.html");

  // Event Sticky Header
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
    handleStickyHeader(); // Gọi ngay khi load trang
  }

  // Menu active
  const currentPath = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll("nav ul li a").forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/$/, "");
    console.log(`${linkPath} = ${currentPath}`);
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // Toggle menu mobile
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

  // Toggle slide bar
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

  // Box chat
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

  // Swiper slider
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
