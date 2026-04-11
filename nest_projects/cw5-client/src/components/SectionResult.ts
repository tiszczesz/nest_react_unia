export const SectionResult = (content: string = ''): HTMLDivElement => {
  const sectionResult = document.createElement('section');
  sectionResult.id = 'sectionResult';
  sectionResult.className = 'd-flex gap-2';
  sectionResult.textContent = content;
  return sectionResult as HTMLDivElement;
};
