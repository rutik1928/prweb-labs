const sizeSelect = document.getElementById("sizeSelect");
const contentSelect = document.getElementById("contentSelect");
const positionSelect = document.getElementById("positionSelect");

const modalData = new Map();
const uniqueContents = new Set();

let modalCounter = 1;

// Функция-замыкание для создания модальных окон
function createModal(id) {
  return function() {
    const [width, height] = sizeSelect.value.split("x").map(Number);
    const [top, left] = positionSelect.value.split(",").map(Number);
    const content = contentSelect.value;

    uniqueContents.add(content);
    modalData.set(id, { width, height, top, left, content });

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.width = `${width}px`;
    modal.style.height = `${height}px`;
    modal.style.top = `${top}px`;
    modal.style.left = `${left}px`;
    modal.innerHTML = `<strong>Окно ${id}</strong><br>${content}`;

    document.body.appendChild(modal);

    // Закрытие по клику
    modal.addEventListener("click", function() {
      modal.remove();
    });
  };
}

// Пример использования bind:
document.getElementById("createBtn1").addEventListener(
  "click",
  createModal.bind(null, modalCounter++)
);

// Пример использования call:
document.getElementById("createBtn2").addEventListener("click", function() {
  createModal.call(null, modalCounter++)();
});

// Пример использования apply — симуляция
// Можно вызвать: createModal.apply(null, [modalCounter++])();

