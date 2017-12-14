import "./Task1.css";

export function getApiKey() {
    return "987df01dfd9c4480932e41fa184170cf";
}

function displayNews(sourceId) {
    let url = "https://newsapi.org/v2/top-headlines?sources=" + sourceId + "&apiKey=" + getApiKey();
    fetch(url)
        .then(r => r.json())
        .then((data) => {
            document.getElementById("screen").innerHTML = "";
            let { articles } = data;
            const markup = `                
                ${articles.map(article =>
                    `<tr>
                        <td>
                            <div>
                                <h3 class="colorRed">${article.title}</h3>
                            </div>
                            <div class="img" style="background-image: url('${article.urlToImage ? article.urlToImage : ''}')"></div>                            
                            <div>
                                <span>${article.description}</span>
                            </div>
                            <div class="newsAuthor">
                                <b>${article.author ? article.author : ''}</b><br>
                                <span>${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}</span>
                            </div>
                        </td>
                    </tr>`
                ).join('')}`;
            document.getElementById("screen").innerHTML = markup;
            scroll(0, 0);
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadNewsSourses() {
    fetch("https://newsapi.org/v2/sources?apiKey=" + getApiKey())
        .then(r => r.json())
        .then(data => {
            let { sources } = data;
            const markup = `                
                ${sources.map(source =>
                    `<div class="newsSource">
                        <table width="100%">
                            <tr>
                                <td align="center">
                                    <h3>${source.name}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">                                    
                                    <span class="sourceLink" data-id='${source.id}'>${source.url}</span>
                                </td>
                            </tr>
                        </table>
                    </div>`
                ).join('')}`;
            document.getElementById("newsContainer").innerHTML = markup;
            attachDisplayNewsHandler();
        })
        .catch((err) => {
            console.log(err);
        });
}

function attachDisplayNewsHandler() {
    var newsElements = document.getElementsByClassName("sourceLink");

    for (let i = 0; i < newsElements.length; i++) {
        let news = newsElements[i];
        news.addEventListener("click", function () {
            let id = news.getAttribute("data-id");
            displayNews(id);
        })
    }
}

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
    loadNewsSourses();
    initPushMe();
});

