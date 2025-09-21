const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noVideo = document.getElementById('noVideo');

yesBtn.addEventListener('click', () => {
  emailjs.send("service_eacfk6n", "template_94rj6lj", {
    to_name: "Katleho Myeza",
    from_name: "Proposal Site",
    message: "She said YES! 🎉"
  })
  .then(() => {
    // after email send, redirect to collage page
    window.location.href = 'collage.html';
  })
  .catch((err) => {
    console.error("Email error:", err);
    window.location.href = './her-page/collage.html';
  });
});

noBtn.addEventListener('click', () => {
  noVideo.style.display = 'block';
  noVideo.play();
});
