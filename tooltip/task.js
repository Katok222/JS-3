document.addEventListener('DOMContentLoaded', () => {
  // Находим все элементы с классом has-tooltip
  const tooltipElements = document.querySelectorAll('.has-tooltip');

  // Создаём элемент подсказки
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  // Обработчик клика для каждого элемента
  tooltipElements.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем стандартное действие ссылки

      // Получаем текст подсказки из атрибута title
      const tooltipText = element.getAttribute('title');
      tooltip.textContent = tooltipText;

      // Позиционируем подсказку рядом с элементом
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

      // Показываем подсказку
      tooltip.classList.add('tooltip_active');

      // Скрываем подсказку при клике в любом месте документа
      document.addEventListener('click', hideTooltip, { once: true });
    });
  });

  // Функция для скрытия подсказки
  function hideTooltip() {
    tooltip.classList.remove('tooltip_active');
  }
});
