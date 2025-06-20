// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ===== MENU HAMBURGUER =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  
  // ===== CARROSSEL =====
  const carousel = document.querySelector('.carousel-inner');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-btn:first-child');
  const nextBtn = document.querySelector('.carousel-btn:last-child');
  
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });
  
  // Indicadores clicáveis
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  // Auto-play (opcional)
  // setInterval(() => nextBtn.click(), 5000);
  
  // ===== FILTRO PORTFÓLIO =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe ativa de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar classe ativa ao botão clicado
      button.classList.add('active');
      
      const filter = button.textContent.trim();
      
      // Filtrar itens
      portfolioItems.forEach(item => {
        const category = item.querySelector('.portfolio-overlay h3').textContent;
        
        if (filter === 'Todos' || category.includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // ===== LIGHTBOX COM EFEITO LED =====
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const portfolioImages = document.querySelectorAll('.portfolio-img');
  
  portfolioImages.forEach(img => {
    img.addEventListener('click', () => {
      // Aplicar efeito LED
      img.classList.add('active-led');
      
      // Configurar lightbox
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      
      document.body.style.overflow = 'hidden';
      
      // Remover efeito LED após 0.5s
      setTimeout(() => {
        img.classList.remove('active-led');
      }, 500);
    });
  });
  
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // ===== ANIMAÇÃO AO ROLAR =====
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observar elementos com as classes de animação
  document.querySelectorAll('.fade-in, .floating').forEach(el => {
    observer.observe(el);
  });
  
  // ===== HEADER SCROLL EFFECT =====
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
      header.style.background = 'rgba(15, 3, 38, 0.95)';
    } else {
      header.style.padding = '20px 0';
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(15, 3, 38, 0.9)';
    }
  });
});
