document.addEventListener('DOMContentLoaded', () => {
  const tooltipElements = document.querySelectorAll('.has-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  let currentTooltipText = '';

  tooltipElements.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const tooltipText = element.getAttribute('title');

      // Если клик по той же ссылке — скрываем/показываем подсказку
      if (tooltipText === currentTooltipText) {
        tooltip.classList.toggle('tooltip_active');
        return;
      }

      // Обновляем текст и позицию подсказки
      currentTooltipText = tooltipText;
      tooltip.textContent = tooltipText;
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

      // Показываем подсказку
      tooltip.classList.add('tooltip_active');
    });
  });

  // Скрываем подсказку при клике вне элементов с подсказкой
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.has-tooltip')) {
      tooltip.classList.remove('tooltip_active');
      currentTooltipText = '';
    }
  });
});
