console.clear();

const APIURL = 'http://localhost:9000';

const RequestGet = async (path = '') => {
  path = APIURL + path;
  return await fetch(path).then((response) => response.json());
};

const RequestPost = async (path = '', data = {}) => {
  path = APIURL + path;

  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.json());
};

const RequestPut = async (path = '', data) => {
  path = APIURL + path;

  return await fetch(path, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  }).then((response) => response.json());
};

const RequestDelete = async (path) => {
  path = APIURL + path;

  return await fetch(path, {
    method: 'DELETE',
  }).then((response) => response.json());
};

const Init = () => {
  const container = document.querySelector('#table tbody');

  container.innerHTML = `<tr><td> Loading... </td></tr>`;

  RequestGet('/users').then((data) => {
    container.innerHTML = '';

    data.forEach((user, index) => {
      index += 1;
      container.insertAdjacentHTML(
        'beforeend',
        `
              <tr>
                  <th scope="row">${index}</th>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.body}</td>
                    <td>
                            <button class="btn btn-warning" data-user-patch-id="${user.id}">Patch</button>
                    </td>
                     <td>
                            <button class="btn btn-danger" data-user-delete-id="${user.id}">Delete</button>
                    </td>
              </tr>
        `
      );
    });
  });
};

Init();
