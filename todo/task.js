document.addEventListener('DOMContentLoaded', () => {
  const tasksForm = document.getElementById('tasks__form');
  const tasksInput = document.getElementById('task__input');
  const tasksList = document.getElementById('tasks__list');
  const tasksAddButton = document.getElementById('tasks__add');

  // Функция для добавления задачи
  function addTask(text) {
    if (!text) return;

    // Создаем шаблон задачи
    const task = document.createElement('div');
    task.className = 'task';

    const taskTitle = document.createElement('div');
    taskTitle.className = 'task__title';
    taskTitle.textContent = text;

    const taskRemove = document.createElement('a');
    taskRemove.className = 'task__remove';
    taskRemove.href = '#';
    taskRemove.innerHTML = '&times;';

    // Добавляем элементы в задачу
    task.appendChild(taskTitle);
    task.appendChild(taskRemove);

    // Добавляем задачу в список
    tasksList.appendChild(task);
  }

  // Обработчик отправки формы
  tasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = tasksInput.value.trim();
    if (text) {
      addTask(text);
      tasksInput.value = '';
    }
  });

  // Обработчик нажатия на кнопку "Добавить"
  tasksAddButton.addEventListener('click', () => {
    const text = tasksInput.value.trim();
    if (text) {
      addTask(text);
      tasksInput.value = '';
    }
  });

  // Обработчик нажатия клавиши Enter в поле ввода
  tasksInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const text = tasksInput.value.trim();
      if (text) {
        addTask(text);
        tasksInput.value = '';
      }
    }
  });

  // Делегирование событий для удаления задач
  tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task__remove')) {
      event.preventDefault();
      const task = event.target.closest('.task');
      if (task) {
        task.remove();
      }
    }
  });
});
