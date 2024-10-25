const CELL_IN_TABLE = ((80 - 1) % 36) + 1;
const TABLE_SIZE = 6;

const form = document.getElementById('form');
const table = document.getElementById('table');
const colorPicker = document.getElementById('colorPicker');
let isDblсlickEvent = false;
let isThereInvalidInput = false;
let clickTimeout;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name');
  const faculty = document.getElementById('faculty');
  const birthday = document.getElementById('birthday');
  const address = document.getElementById('address');
  const email = document.getElementById('email');
  validateFields(name, faculty, birthday, address, email);
  if (!isThereInvalidInput) {
    document.getElementById('outputName').textContent = name.value;
    document.getElementById('outputFaculty').textContent = faculty.value;
    document.getElementById('outputBirthday').textContent = birthday.value;
    document.getElementById('outputAddress').textContent = address.value;
    document.getElementById('outputEmail').textContent = email.value;
    document.getElementById('receivedData').style.display = 'inline';
  }
});

const validationRegexes = {
  name: /^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/,
  faculty: /^[А-ЯІЇЄа-яіїє' -]+$/,
  birthday: /^\d{2}\.\d{2}\.\d{4}$/,
  address: /^м\.\s[А-ЯІЇЄа-яіїє' -]+$/,
  email: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
};

const validateFields = (...fields) => {
  isThereInvalidInput = false;
  for (const field of fields) {
    field.style.setProperty('border-color', 'black');
    if (!validationRegexes[field.id].test(field.value.trim())) {
      showFieldWithError(field);
    }
  }
};

const validateField = (field) => {
  if (!validationRegexes[field.id].test(field.value.trim())) {
    field.style.setProperty('border-color', 'red');
  } else {
    field.style.setProperty('border-color', 'black');
  }
};

const showFieldWithError = (field) => {
  isThereInvalidInput = true;
  field.value = '';
  field.style.setProperty('border-color', 'red');
  field.placeholder = 'Неправильний формат вводу';
};

const createTable = () => {
  for (let i = 0; i < TABLE_SIZE; i++) {
    const row = table.insertRow();
    for (let j = 0; j < TABLE_SIZE; j++) {
      const cell = row.insertCell();
      const number = j + 1 + i * TABLE_SIZE;
      cell.textContent = number;

      if (number !== CELL_IN_TABLE) continue;

      cell.addEventListener('mouseover', () => {
        cell.style.color = getRandomColor();
        cell.style.backgroundColor = getRandomColor();
      });

      colorPicker.addEventListener('input', (event) => {
        cell.style.backgroundColor = event.target.value;
      });

      cell.addEventListener('click', () => {
        clickTimeout = setTimeout(() => {
          if (!isDblсlickEvent) colorPicker.click();
          isDblсlickEvent = false;
        }, 300);
      });

      cell.addEventListener('dblclick', () => {
        clearTimeout(clickTimeout);
        isDblсlickEvent = true;
        cell.style.backgroundColor = getRandomColor();
        let n = j % 2 === 0 ? 0 : 1;
        for (n; n < TABLE_SIZE; n += 2) colorCell(i, n);
      });
    }
  }
};

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const colorCell = (i, j) => {
  const leftCell = table.rows[i].cells[j];
  leftCell.style.backgroundColor = getRandomColor();
};

createTable();
