const root = document.getElementById('root');

const books = JSON.parse(localStorage.getItem('booksList'));

function createTreeDom(arr) {
  const treeDom = document.createElement('div');
  const ul = document.createElement('ul');
  arr.forEach((item) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    li.id = item.id;
    li.className = 'list-item';
    span.innerText = item.name;
    button.innerText = 'Edit';
    button.className = 'btn';
    li.append(span);
    li.append(button);
    ul.append(li);
  });

  ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
      history.pushState(
        null,
        null,
        `/index.html?id=${event.target.parentElement.id}#preview`
      );
    } else if (event.target.tagName === 'BUTTON') {
      history.pushState(
        null,
        null,
        `/index.html?id=${event.target.parentElement.id}#edit`
      );
    }
    root.append(createDinamicSection(location, books));
  });

  const buttonAdd = document.createElement('button');
  buttonAdd.className = 'btn add';
  buttonAdd.textContent = 'Add';

  buttonAdd.addEventListener('click', () => {
    history.pushState(null, null, `/index.html#add`);
    createDinamicSection(location, books, false);
  });

  treeDom.append(ul);
  treeDom.append(buttonAdd);

  return treeDom;
}

function createListOfBooksSection(obj) {
  let section = document.querySelector('.books-list-section');

  if (section) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  } else {
    section = document.createElement('section');
    section.className = 'books-list-section';
  }
  section.append(createTreeDom(obj));

  return section;
}

function createDinamicSection(location, books) {
  const { bookId, hash } = getParameters(location.href);
  let book = books.find((item) => item.id === bookId);
  let section = document.querySelector('.dinamic-section');

  if (section) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  } else {
    section = document.createElement('section');
    section.className = 'dinamic-section';
  }

  if (hash === '#preview') {
    return createBookView(section, book);
  } else if (hash === '#edit') {
    return createBookEditing(section, book);
  } else if (hash === '#add') {
    const newBook = {};
    Object.keys(books[0]).forEach((key) => {
      key === 'id' ? newBook[key] = books.length + 1 : newBook[key] = null;
    });

    return createBookEditing(section, newBook);
  }

  return createBookView(section);
}

function getParameters(href) {
  const idPos = href.search('id=');
  const hashPos = href.search('#');
  const NOT_FOUND = -1;
  const ID_SYMBOLS_LENGTH = 3;
  const bookId =
    idPos !== NOT_FOUND
      ? +href.slice(idPos + ID_SYMBOLS_LENGTH, hashPos)
      : null;
  const hash = hashPos !== NOT_FOUND ? href.slice(hashPos) : null;

  return { bookId, hash };
}

function createBookView(container, obj) {
  const ul = document.createElement('ul');
  if (obj) {
    for (let [key, value] of Object.entries(obj)) {
      if (key !== 'id') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.className = 'book-item';
        if (key !== 'image') {
          span.innerText = value;
          if (key === 'name') {
            span.className = 'heading';
          }
        } else {
          const img = document.createElement('img');
          img.src = value;
          span.append(img);
        }
        li.append(span);
        ul.append(li);
      }
    }
    container.append(ul);
  }

  return container;
}

function createBookEditing(container, obj) {
  container.append(createForm(obj));

  return container;
}

function createForm(obj) {
  const form = document.createElement('form');
  form.className = 'form';
  for (let [key, value] of Object.entries(obj)) {
    if (key === 'id') {
      form.id = value;
    } else {
      const div = document.createElement('div');
      const divLabel = document.createElement('div');
      const divInput = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      divLabel.className = 'label';
      divInput.className = 'input';
      label.for = key;
      label.textContent = key;
      input.name = key;
      input.type = 'text';
      input.className = 'input-field';
      input.required = true;
      input.value = value || '';
      divLabel.append(label);
      divInput.append(input);
      div.append(divLabel);
      div.append(divInput);
      form.append(div);
    }
  }
  const formFooter = document.createElement('div');
  const buttonSave = document.createElement('button');
  const buttonCancel = document.createElement('button');

  formFooter.className = 'form-footer';
  buttonSave.className = 'btn save';
  buttonCancel.className = 'btn cancel';
  buttonSave.textContent = 'Save';
  buttonCancel.textContent = 'Cancel';
  formFooter.append(buttonSave);
  formFooter.append(buttonCancel);
  form.append(formFooter);

  form.addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll('.input-field');
    let message = document.querySelector('.error-message');
    if (message) {
      message.remove();
    }
    if (event.target.classList.contains('save')) {
      const newBook = createNewBook(inputs, +form.id);
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
          message = document.createElement('p');
          message.className = 'error-message';
          message.textContent = 'All fields are required';
          form.append(message);
          break;
        }
      }
      if (newBook) {
        const DELAY = 300;
        saveBook(newBook);
        history.pushState(null, null, `/index.html?id=${newBook.id}#preview`);
        createPageView(root, books);
        setTimeout(() => alert('Book successfully updated'), DELAY);
      }
    } else if (event.target.classList.contains('cancel')) {
      const isCancel = confirm('Discard changes?');
      if (isCancel) {
        history.back();
      }
    }
  });

  return form;
}

function createNewBook(inputs, id) {
  const newBook = { id };
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      return;
    }
    newBook[inputs[i].name] = inputs[i].value;
  }

  return newBook;
}

function saveBook(book) {
  let consilience = books.find((item) => item.id === book.id);
  if (consilience) {
    books.forEach((item) => {
      if (item.id === book.id) {
        for (let key of Object.keys(item)) {
          item[key] = book[key];
        }
      }
    });
  } else {
    books.push(book);
  }
  localStorage.setItem('booksList', JSON.stringify(books));
}

function createPageView(node, books) {
  node.append(createListOfBooksSection(books));
  node.append(createDinamicSection(location, books));
}

window.onpopstate = () => {
  createPageView(root, books);
};

createPageView(root, books);
