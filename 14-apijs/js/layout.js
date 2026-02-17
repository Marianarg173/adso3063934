const views = document.querySelectorAll("main");
let currentView = 0;

// Buttons & Anchors
const btnLogin = document.querySelector('.btnLogin');
const btnLogout = document.querySelector('.btnLogout');
const btnAdd = document.querySelector('.btnAdd');
const btnBacks = document.querySelectorAll('.btnBack');
const btnShows = document.querySelectorAll('.btnShow');
const btnEdits = document.querySelectorAll('.btnEdit');
const btnCancels = document.querySelectorAll('.btnCancel');

btnLogin.addEventListener('click', () => {
    currentView = 1;
    showView();
});

btnLogout.addEventListener('click', () => {
    currentView = 0;
    showView();
});

btnAdd.addEventListener('click', () => {
    currentView = 2;
    showView();
});

btnBacks.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView();
    });
});

btnShows.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 3
        showView();
    });
});

btnEdits.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 4
        showView();
    });
});

btnCancels.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView();
    }); 
});



function showView() {
    views.forEach(element => {
        element.classList.remove('animateView');
        element.style.display = 'none';
    });


    views[currentView].classList.add('animateView');
    views[currentView].style.display = 'block';
}


showView();