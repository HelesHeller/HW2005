

document.addEventListener('DOMContentLoaded', () => {
    const addNewListButton = document.getElementById('addNewList');
    const listContainer = document.getElementById('listContainer');
    const textInput = document.getElementById('listTextInput');
    const actionRadios = document.querySelectorAll('input[name="action"]');
    let currentAction = 'addToEnd';

    actionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentAction = radio.value;
        });
    });

    addNewListButton.addEventListener('click', () => {
        const newList = document.createElement('ul');
        const listItem = document.createElement('li');
        listItem.textContent = 'Элемент списка';
        newList.appendChild(listItem);
        listContainer.appendChild(newList);
        attachListEvent(listItem);
    });

    function attachListEvent(listItem) {
        listItem.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (currentAction === 'changeText' && text) {
                listItem.textContent = text;
            } else if (currentAction === 'addToEnd' && text) {
                const parentList = listItem.parentElement;
                const newItem = document.createElement('li');
                newItem.textContent = text;
                parentList.appendChild(newItem);
                attachListEvent(newItem);
            } else if (currentAction === 'insert' && text) {
                const newItem = document.createElement('li');
                newItem.textContent = text;
                listItem.parentElement.insertBefore(newItem, listItem);
                attachListEvent(newItem);
            } else if (currentAction === 'addNestedList' && text) {
                if (listItem.querySelector('ul') === null) {
                    const nestedList = document.createElement('ul');
                    const newItem = document.createElement('li');
                    newItem.textContent = text;
                    nestedList.appendChild(newItem);
                    listItem.appendChild(nestedList);
                    attachListEvent(newItem);
                } else {
                    alert('Элемент уже содержит вложенный список.');
                }
            } else if (currentAction === 'remove') {
                listItem.remove();
            }
        });
    }
});
