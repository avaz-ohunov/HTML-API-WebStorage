
'use strict';


const storageKey = 'carsTable';


function updateTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';  // Очищаем таблицу

    // Зачитываем данные из хранилища
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (data.length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyHeader = document.createElement('td');
        emptyHeader.colSpan = 3;
        emptyHeader.textContent = 'Нет данных';
        emptyRow.appendChild(emptyHeader);
        tbody.appendChild(emptyRow);
    } else {
        data.forEach(item => {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');

            cell1.textContent = item.model;
            row.appendChild(cell1);

            const cell2 = document.createElement('td');
            cell2.textContent = item.price;
            row.appendChild(cell2);

            // Ячейка "Удалить"
            const deleteCell = document.createElement('td');
            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'X';
            deleteSpan.style.cursor = 'pointer';
            deleteSpan.onclick = () => deleteItem(item.key);
            deleteCell.appendChild(deleteSpan);
            row.appendChild(deleteCell);

            tbody.appendChild(row);
        });
    }
}


function deleteItem(key) {
    const confirmation = confirm("Вы уверены, что хотите удалить эту запись?");
    
    if(confirmation) {
        const data = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updatedData = data.filter(item => item.key !== key);
        localStorage.setItem(storageKey, JSON.stringify(updatedData));
        updateTable();
    }
}


// Пример данных для localStorage
localStorage.setItem(storageKey, JSON.stringify([
    { key: '1', model: 'Toyota Camry', price: '₽2 500 000' },
    { key: '2', model: 'BMW X5', price: '₽5 000 000' },
    { key: '3', model: 'Tesla Cybertruck', price: '₽19 300 000' }
]));


let currentStorage = [];  // Переменная для хранения текущих данных

function getStorage() {
    // Выбираем текущее хранилище
    currentStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    updateTable();
}


function saveItem(key, value) {
    // Получаем текущее хранилище
    const currentStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Проверяем, есть ли уже запись с таким ключом
    const existingItemIndex = currentStorage.findIndex(item => item.key === key);

    if (existingItemIndex !== -1) {
        // Если запись существует, обновляем её значение
        currentStorage[existingItemIndex].model = value.model;
        currentStorage[existingItemIndex].price = value.price;
    } else {
        // Если записи нет, добавляем новую
        currentStorage.push({ key, model: value.model, price: value.price });
    }

    // Сохраняем обновлённое хранилище
    localStorage.setItem(storageKey, JSON.stringify(currentStorage));

    updateTable();
}


function clearStorage() {
    const confirmation = confirm(
        "Вы уверены, что хотите полностью очистить локальное хранилище?"
    );

    if (confirmation) {
        // Очищаем локальное хранилище
        localStorage.removeItem(storageKey);

        updateTable();
    }
}


window.onload = updateTable;
