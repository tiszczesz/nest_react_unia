export const ButtonLoad = (): HTMLButtonElement => {
  const buttonLoad = document.createElement('button');
  buttonLoad.id = 'buttonLoad';
  buttonLoad.textContent = 'Załaduj dane';
  return buttonLoad as HTMLButtonElement;
};
