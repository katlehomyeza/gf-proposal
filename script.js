const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noVideo = document.getElementById('noVideo');

yesBtn.addEventListener('click', () => {
  emailjs.send(process.env.SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, {
    email: "katlehomyeza15@gmail.com",
    to_name: "Katleho Myeza",
    from_name: "Proposal Site",
    message: "She said YES! 🎉"
  })
  .then(() => {
    window.location.href = './her-page/yena.html';
  })
  .catch((err) => {
    console.error("Email error:", err);
  });
});

noBtn.addEventListener('click', () => {
  videoModal.style.display = 'flex';
  noVideo.currentTime = 0;          
  noVideo.play();
});

noVideo.addEventListener('ended', () => {
  videoModal.style.display = 'none';
  noVideo.pause();
});