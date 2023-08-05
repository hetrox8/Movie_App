const errorMsg = (message, color) => {
  const msg = document.querySelector('.msg');
  msg.style.display = 'block';
  msg.innerText = message;
  msg.style.background = color;
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
};

export default errorMsg;