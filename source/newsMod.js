import "./styles.css";

import * as pat from './patterns';


export function getApiKey() {
    return "987df01dfd9c4480932e41fa184170cf";
}

export default function loadNewsSourses() {
    fetch("https://newsapi.org/v2/sources?apiKey=" + getApiKey())
        .then(r => r.json())
        .then(data => {
            let { sources } = data;
            const markup = `${sources.map(sourceInfo => pat.newsFactory().createNewsSource(sourceInfo).toHtml()).join('')}`;
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

function displayNews(sourceId) {
    let url = "https://newsapi.org/v2/top-headlines?sources=" + sourceId + "&apiKey=" + getApiKey();
    fetch(url)
        .then(r => r.json())
        .then((data) => {
            document.getElementById("newsScreen").innerHTML = "";
            let { articles } = data;
            const markup = `
                <table width="100%">
                    ${articles.map(articleInfo => pat.newsFactory().createArticle(articleInfo).toHtml()).join('')}
                </table>`;
            document.getElementById("newsScreen").innerHTML = markup;
            scroll(0, 0);
        })
        .catch((err) => {
            console.log(err);
        });
}
