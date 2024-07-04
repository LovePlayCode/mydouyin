function resetVhAndPx() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'
}
resetVhAndPx();
window.addEventListener('resize', () => {
  resetVhAndPx();
});
