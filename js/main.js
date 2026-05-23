/* ===================================================
   CONVITE DE CASAMENTO — JavaScript
   Funcionalidades:
   - Contagem regressiva em tempo real
   - Animações de scroll (Intersection Observer)
   - Scroll suave
   =================================================== */

(function () {
  'use strict';

  /* ===================== CONTAGEM REGRESSIVA ===================== */

  // Data do casamento: 28 de Junho de 2026, às 16:30 (horário de Brasília)
  const WEDDING_DATE = new Date('2026-06-28T16:30:00-03:00');

  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds'),
  };

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      // O casamento já aconteceu ou está acontecendo
      if (countdownElements.days) countdownElements.days.textContent = '0';
      if (countdownElements.hours) countdownElements.hours.textContent = '0';
      if (countdownElements.minutes) countdownElements.minutes.textContent = '0';
      if (countdownElements.seconds) countdownElements.seconds.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (countdownElements.days) countdownElements.days.textContent = days;
    if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
    if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
  }

  // Atualiza a cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ===================== ANIMAÇÕES DE SCROLL ===================== */

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: mostra tudo se IntersectionObserver não for suportado
    revealElements.forEach((el) => {
      el.classList.add('active');
    });
  }

  /* ===================== SCROLL SUAVE PARA LINKS INTERNOS ===================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  /* ===================== EFEITO PARALLAX SUTIL NAS FLORES ===================== */

  // Efeito parallax removido para garantir que as flores fiquem 100% fixas
  // como solicitado, sem nenhum movimento ao scrollar.

  /* ===================== FADE-IN DA PÁGINA ===================== */

  window.addEventListener('load', function () {
    document.body.classList.add('fade-in-page');
  });

  /* ===================== LÓGICA DO ENVELOPE & MÚSICA ===================== */
  
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelopeWrapper = document.querySelector('.envelope-wrapper');
  const bgMusic = document.getElementById('bg-music');

  if (envelopeOverlay && envelopeWrapper && bgMusic) {
    envelopeWrapper.addEventListener('click', function() {
      // 1. Toca a música (como é um clique, o navegador permite)
      bgMusic.play().catch(function(error) {
        console.log('Áudio não pôde ser reproduzido automaticamente:', error);
      });

      // 2. Dispara animação CSS adicionando classe
      envelopeWrapper.classList.add('open');

      // 3. Aguarda animação de abertura (1.5s) e começa a esconder overlay
      setTimeout(function() {
        envelopeOverlay.style.opacity = '0';
        envelopeOverlay.style.visibility = 'hidden';
        
        // Remove a trava de scroll para permitir navegação
        document.body.classList.remove('body-locked');
      }, 1500);

      // 4. Remove o overlay de vez para não interferir em cliques futuros
      setTimeout(function() {
        envelopeOverlay.style.display = 'none';
      }, 3000);
    });
  }

  /* ===================== COPIAR PIX ===================== */
  const btnCopyPix = document.getElementById('btn-copy-pix');
  const pixKeyText = document.getElementById('pix-key-text');

  if (btnCopyPix && pixKeyText) {
    btnCopyPix.addEventListener('click', function () {
      navigator.clipboard.writeText(pixKeyText.textContent).then(function() {
        const originalHTML = btnCopyPix.innerHTML;
        btnCopyPix.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        btnCopyPix.style.backgroundColor = '#25D366'; // Verde sucesso
        
        setTimeout(function() {
          btnCopyPix.innerHTML = originalHTML;
          btnCopyPix.style.backgroundColor = '';
        }, 2000);
      }).catch(function(err) {
        console.error('Falha ao copiar Pix: ', err);
      });
    });
  }

})();

