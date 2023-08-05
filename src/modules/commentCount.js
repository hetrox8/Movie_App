const commentCounter = async () => {
  const commentsContainer = document.querySelector('.commentDiv');
  const commentCount = commentsContainer.children.length;
  const counterElement = document.querySelector('.counter');
  if (counterElement) {
    counterElement.textContent = `(${commentCount})`;
  }
};
export default commentCounter;