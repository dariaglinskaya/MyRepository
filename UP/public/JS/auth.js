'use strict'

function logIn() {
    const username = document.authorizationForm.username.value;
    const password = document.authorizationForm.password.value;
    checkUser({username, password}).then(
        resolve => {
            localStorage.setItem("username", username);
            mainPage();
        },
        reject => document.querySelector(".incorrect-input").innerHTML = "Incorrect login or password. Try again."
    );
}

function checkUser(user) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('POST', '/users/login');
        req.setRequestHeader('content-type', 'application/json');
        req.onload = () => req.status === 200 ? resolve() : reject();
        req.onerror = () => reject(new Error("authorization crashed."));
        req.send(JSON.stringify(user));
    });
}

function addUserUI() {
    let username = localStorage.getItem('username');
    isAuthorized().then(
        username => {
            document.getElementById('username').innerHTML = username;
            document.getElementById('add-news-btn').style.display = '';
            document.getElementById('log-in-button').style.display = 'none';
            document.getElementById('log-out-button').style.display = '';
            document.getElementById('view-edit-btn').style.display = '';
            document.getElementById('view-delete-btn').style.display = '';
        },
        nonAuthorized => {
            document.getElementById('username').innerHTML = 'Гость';
            document.getElementById('view-edit-btn').style.display = 'none';
            document.getElementById('view-delete-btn').style.display = 'none';
            document.getElementById('log-out-button').style.display = 'none';
            document.getElementById('log-in-button').style.display = '';
            document.querySelector('.add-news-button').style.display = 'none';
        }
    );
}
function logOut() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', '/users/logout');
        req.onload = () => req.status === 200 ? resolve() : reject();
        req.onerror = () => reject(new Error("isAuthorized crashed."));
        req.send();
        document.getElementById('username').innerHTML = 'Гость';
        localStorage.removeItem('username');
        document.getElementById('log-in-button').style.display = '';
        document.getElementById('log-out-button').style.display = 'none';
        document.getElementById('add-news-btn').style.display = 'none';
        event.preventDefault();
});
}
function isAuthorized() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', '/users/isAuthorized');
        req.onload = () => req.status === 200 ? resolve(req.responseText) : reject();
        req.onerror = () => reject(new Error("isAuthorized crashed."));
        req.send();
    });
}
document.getElementById('log-out-button').addEventListener('click', logOut);