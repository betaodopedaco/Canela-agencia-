// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
      }
    });
  });

  // Carrossel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-btn:first-child');
    const nextBtn = carousel.querySelector('.carousel-btn:last-child');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Atualiza indicadores
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Navegação
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
    
    // Indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Auto-play (opcional)
    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
  }

  // Lightbox para o portfólio
  const portfolioItems = document.querySelectorAll('.portfolio-img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Filtro do portfólio (simplificado)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove a classe active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Adiciona a classe active ao botão clicado
      this.classList.add('active');
      
      const filter = this.textContent.trim();
      
      galleryItems.forEach(item => {
        if (filter === 'Todos' || item.querySelector('h3').textContent.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Efeito de scroll suave para links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Efeito de animação ao rolar
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  // Inicializa as animações que já estão na viewport
  animateOnScroll();
});
