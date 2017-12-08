"use strict";

function getApiKey() {
    return "987df01dfd9c4480932e41fa184170cf";
    
}

function loadNewsSourses() {
    fetch("https://newsapi.org/v2/sources?apiKey=" + getApiKey()).then(function (r) {
        return r.json();
    }).then(function (data) {
        var sources = data.sources;
var s=7;
        var markup = "                \n                " + sources.map(function (source) {
            return "<div class=\"newsSource\">\n                        <table width=\"100%\">\n                            <tr>\n                                <td align=\"center\">\n                                    <h3>" + source.name + "</h3>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td align=\"center\">\n                                    <span class=\"spanLink\" onclick=\"displayNews('" + source.id + "');\">" + source.url + "</span>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>";
        }).join('');
        document.getElementById("newsContainer").innerHTML = markup;
    }).catch(function (err) {
        console.log(err);
    });
}

function displayNews(sourceId) {
    var url = "https://newsapi.org/v2/top-headlines?sources=" + sourceId + "&apiKey=" + getApiKey();
    fetch(url).then(function (r) {
        return r.json();
    }).then(function (data) {
        document.getElementById("screen").innerHTML = "";
        var articles = data.articles;

        var markup = "                \n                " + articles.map(function (article) {
            return "<tr>\n                        <td>\n                            <div>\n                                <h3 class=\"colorRed\">" + article.title + "</h3>\n                            </div>\n                            <div class=\"img\" style=\"background-image: url('" + (article.urlToImage ? article.urlToImage : '') + "')\"></div>                            \n                            <div>\n                                <span>" + article.description + "</span>\n                            </div>\n                            <div class=\"newsAuthor\">\n                                <b>" + (article.author ? article.author : '') + "</b><br>\n                                <span>" + (article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '') + "</span>\n                            </div>\n                        </td>\n                    </tr>";
        }).join('');
        document.getElementById("screen").innerHTML = markup;
        scroll(0, 0);
    }).catch(function (err) {
        console.log(err);
    });
}
