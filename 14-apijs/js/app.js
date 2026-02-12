const views = document.querySelectorAll("main");
let currentView = 0;

function showView() {

    views.forEach(element => {

        element.classList.add("hide");
    });


    views[currentView].classList.remove("hide");
}


showView();