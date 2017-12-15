
window.addEventListener("load", function () {
    let pushMe = document.getElementById("pushMe");
    pushMe.onclick = e => import(/* webpackChunkName: "newsMod" */ './newsMod.js')
        .then(module => {
            module.default();
        }).catch(error => console.log('An error occurred while loading the component - ' + error));
});

