import "./Task1.css";

function initPushMe() {
    let pushMe = document.getElementById("pushMe");
    pushMe.onclick = e => import(/* webpackChunkName: "SomeMod" */ './SomeMod')
        .then(module => {
            let source = pushMe.getAttribute("data-news-source");
            let pageId = pushMe.getAttribute("data-page-id");
            module.default(source, pageId);
            let nextPage = Number(pageId) + 1;
            pushMe.setAttribute("data-page-id", nextPage);
        }).catch(error => console.log('An error occurred while loading the component - ' + error));

}

window.addEventListener("load", function () {    
    initPushMe();
});
