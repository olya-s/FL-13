const data = [
  {
    folder: true,
    title: 'Pictures',
    children: [
      {
        title: 'logo.png'
      },
      {
        folder: true,
        title: 'Vacations',
        children: [
          {
            title: 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    folder: true,
    title: 'Desktop',
    children: [
      {
        folder: true,
        title: 'screenshots',
        children: null
      }
    ]
  },
  {
    folder: true,
    title: 'Downloads',
    children: [
      {
        folder: true,
        title: 'JS',
        children: null
      },
      {
        title: 'nvm-setup.exe'
      },
      {
        title: 'node.exe'
      }
    ]
  },
  {
    title: 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function createTree(node, data) {
  if (data) {
    let ul = document.createElement('ul');
    data.forEach((obj) => {
      let li = document.createElement('li');
      let span = document.createElement('span');
      let i = document.createElement('i');
      i.className = 'material-icons';
      span.innerText = obj.title;
      li.prepend(i);
      li.append(span);
      if (obj.folder) {
        li.className = 'folder';
        i.innerText = 'folder';
        createTree(li, obj.children);
      } else {
        li.className = 'file';
        i.innerText = 'insert_drive_file';
      }
      ul.append(li);
    });
    node.append(ul);
  } else {
    const div = document.createElement('div');
    const i = document.createElement('i');
    i.innerText = 'Folder is empty';
    div.append(i);
    node.append(div);
  }
}

function createContextMenu(root) {
  const ul = document.createElement('ul');
  const liRename = document.createElement('li');
  const liRemove = document.createElement('li');
  ul.className = 'context-menu';
  liRename.className = 'menu-item rename';
  liRemove.className = 'menu-item remove';
  liRename.innerText = 'Rename';
  liRemove.innerText = 'Delete item';
  ul.append(liRename);
  ul.append(liRemove);
  root.append(ul);
}

createTree(rootNode, data);
createContextMenu(rootNode);

rootNode.addEventListener('click', (event) => {
  if (event.target.parentElement.tagName !== 'DIV') {
    let currentLi = event.target.closest('li');
    if (currentLi && currentLi.className !== 'file') {
      if (currentLi.className === 'folder') {
        currentLi.classList.add('folder-open');
        currentLi.querySelector('i').innerText = 'folder_open';
      } else if (currentLi.className === 'folder folder-open') {
        currentLi.classList.remove('folder-open');
        currentLi.querySelector('i').innerText = 'folder';
      }
    }
  }
});

let activeElement;

rootNode.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  document.querySelector('input') && document.querySelector('input').remove();
  const menu = document.querySelector('.context-menu');
  menu.classList.add('active');
  menu.classList.remove('disabled');
  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  if ((event.target.tagName || event.target.parentElement.tagName) !== 'SPAN') {
    document.querySelector('.context-menu').classList.add('disabled');
  } else {
    event.target.tabIndex = '0';
    event.target.focus();
    activeElement = event.target;
  }
});

document.querySelector('.rename').addEventListener('click', (event) => {
  if (!event.target.parentElement.classList.contains('disabled')) {
    const input = document.createElement('input');
    input.value = activeElement.textContent;
    input.setSelectionRange(0, input.value.split('.')[0].length);
    activeElement.append(input);
    input.focus();
    input.addEventListener('change', (event) => {
      activeElement.textContent = event.target.value;
    });
  }
  document.querySelector('.context-menu').classList.remove('active');
});

document.querySelector('.remove').addEventListener('click', (event) => {
  if (!event.target.parentElement.classList.contains('disabled')) {
    if (activeElement.parentElement.parentElement.children.length > 1) {
      activeElement.parentElement.remove();
    } else {
      const div = document.createElement('div');
      const i = document.createElement('i');
      i.innerText = 'Folder is empty';
      div.append(i);
      activeElement.parentElement.parentElement.closest('li').append(div);
      activeElement.parentElement.parentElement.remove();
    }
  }
  document.querySelector('.context-menu').classList.remove('active');
});

document.addEventListener(
  'click',
  () => {
    document.querySelector('.context-menu').classList.remove('active');
    document.querySelector('.context-menu').classList.remove('disabled');
    if (document.querySelector('input')) {
      document.querySelector('input').remove();
    }
  },
  false
);

document.querySelector('.context-menu').addEventListener(
  'click',
  (event) => {
    event.stopPropagation();
  },
  false
);