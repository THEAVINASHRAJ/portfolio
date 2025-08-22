/*
  scripts.js

  Handles interactive behaviours on the portfolio site, including
  mobile navigation toggling and dynamic year insertion. Keeping
  JavaScript minimal enhances performance and accessibility.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navbar = document.getElementById('navbar');
  const navLinks = navbar.querySelectorAll('a');

  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
  // Close navigation on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });

// Share this page top button
function shareSite() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert("Link copied! Share it:\n\n🔗 WhatsApp: https://wa.me/?text=" + encodeURIComponent(url) +
        "\n🔗 LinkedIn: https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url) +
        "\n🔗 Instagram: Open app manually (no share intent)" +
        "\n🔗 Twitter/X: https://x.com/share?url=" + encodeURIComponent(url));
}


  // Insert current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
// Social Let's connect
   
// Double-click the WhatsApp button to copy the link (nice on desktop)
  
  document.addEventListener('DOMContentLoaded', () => {
    const waBtn = document.querySelector('.wa-button');
    if (!waBtn) return;
    waBtn.addEventListener('dblclick', async () => {
      try { await navigator.clipboard.writeText('https://wa.link/5t7876'); alert('WhatsApp link copied'); }
      catch(e){ /* clipboard blocked */ }
    });
  });


 
// Simple fade-in effect on scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonial-card");
  const options = {
    threshold: 0.1
  };

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, options);

  cards.forEach(card => {
    card.classList.add("fade-init");
    reveal.observe(card);
  });
});

// -----------------------------------------------------------------------------
// Share modal integration
// A separate DOMContentLoaded listener is used here to ensure the elements exist
// when the script runs. The share overlay lives in each HTML file as
// #share-modal, with associated controls #share-btn (the nav button),
// #close-share (an × icon) and #copy-link (copy button). When a user clicks
// Share the overlay appears; they can copy the page URL or tap the social
// links.
document.addEventListener('DOMContentLoaded', () => {
  const shareModal = document.getElementById('share-modal');
  const shareBtn = document.getElementById('share-btn');
  const closeShare = document.getElementById('close-share');
  const copyLink = document.getElementById('copy-link');

  if (shareBtn && shareModal) {
    shareBtn.addEventListener('click', () => {
      // Update share links with the current page URL. Each link uses a
      // data-base attribute to store its base share URL. This prevents
      // duplication of the full URL in the markup and ensures links
      // always point to the page you are on.
      const shareAnchors = document.querySelectorAll('.share-options a[data-base]');
      shareAnchors.forEach((a) => {
        const base = a.getAttribute('data-base');
        a.href = base + encodeURIComponent(window.location.href);
      });
      shareModal.classList.remove('hidden');
    });
  }
  if (closeShare && shareModal) {
    closeShare.addEventListener('click', () => {
      shareModal.classList.add('hidden');
    });
  }
  if (copyLink) {
    copyLink.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyLink.textContent = 'Link copied!';
        setTimeout(() => {
          copyLink.textContent = 'Copy Link';
        }, 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });
  }
});







    
