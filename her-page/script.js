let musicStarted = false;
        
function startMusic() {
    if (!musicStarted) {
        // Reload the iframe with autoplay enabled
        const iframe = document.getElementById('musicPlayer');
        iframe.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1428120055&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
        
        // Hide the instruction text
        
        musicStarted = true;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Add hover effects to photo items
    const photoItems = document.querySelectorAll(".photo-item")
  
    photoItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "rotate(0deg) scale(1.05)"
        this.style.zIndex = "10"
      })
  
      item.addEventListener("mouseleave", function () {
        const rotation = this.getAttribute("data-rotation")
        this.style.transform = `rotate(${rotation}deg) scale(1)`
        this.style.zIndex = "1"
      })
    })
  
    // Add click effect to hearts
    const hearts = document.querySelectorAll(".heart, .photo-heart, .decorative-heart")
  
    hearts.forEach((heart) => {
      heart.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Create floating heart effect
        const floatingHeart = document.createElement("span")
        floatingHeart.innerHTML = "♥"
        floatingHeart.style.position = "fixed"
        floatingHeart.style.left = e.clientX + "px"
        floatingHeart.style.top = e.clientY + "px"
        floatingHeart.style.color = "#e91e63"
        floatingHeart.style.fontSize = "2rem"
        floatingHeart.style.pointerEvents = "none"
        floatingHeart.style.zIndex = "1000"
        floatingHeart.style.animation = "floatUp 2s ease-out forwards"
  
        document.body.appendChild(floatingHeart)
  
        // Remove the floating heart after animation
        setTimeout(() => {
          floatingHeart.remove()
        }, 2000)
      })
    })
  
    // Add parallax effect to floating decorations
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(
        ".floating-heart, .floating-sparkle, .floating-music, .floating-camera",
      )
  
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        element.style.transform = `translateY(${scrolled * speed}px)`
      })
    })
  
    // Add CSS for floating heart animation
    const style = document.createElement("style")
    style.textContent = `
          @keyframes floatUp {
              0% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
              }
              100% {
                  opacity: 0;
                  transform: translateY(-100px) scale(1.5);
              }
          }
      `
    document.head.appendChild(style)
  
    // Add subtle animation to main photo
    const mainPhoto = document.querySelector(".main-polaroid")
    if (mainPhoto) {
      setInterval(() => {
        mainPhoto.style.transform = `rotate(${Math.random() * 4 - 2}deg)`
      }, 5000)
    }
  
    // Spotify button interaction
    const spotifyButton = document.querySelector(".spotify-button")
    if (spotifyButton) {
      spotifyButton.addEventListener("mouseenter", function () {
        this.style.background = "linear-gradient(135deg, #ff4081, #e91e63)"
        this.style.color = "white"
      })
  
      spotifyButton.addEventListener("mouseleave", function () {
        this.style.background = "white"
        this.style.color = "#1db954"
      })
    }
    
  })


  

  
  