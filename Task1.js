function getApiKey() {
    return "ca5eb2b6cfe44976a01802c54c3db386";
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
                                    <span class="spanLink" onclick="displayNews('${source.id}');">${source.url}</span>
                                </td>
                            </tr>
                        </table>
                    </div>`
                ).join('')}`;
            document.getElementById("newsContainer").innerHTML = markup;
        })
        .catch((err) => {
            console.log(err);
        });
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
                            <img scr="${article.urlToImage}" height='300' width='300'>
                            <div>
                                <span>${article.description}</span>
                            </div>
                            <div class="newsAuthor">
                                <b>${article.author ? article.author : ''}</b><br>
                                <span>${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() :'' }</span>
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
