export const SectionResult = (content: string = ''): HTMLDivElement => {
  const sectionResult = document.createElement('section');
  sectionResult.id = 'sectionResult';
  sectionResult.textContent = content;
  return sectionResult as HTMLDivElement;
};
