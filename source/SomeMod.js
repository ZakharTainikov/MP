import { getApiKey } from "./Task1";

export default function displayNews(sourceId, page) {
    let url = "https://newsapi.org/v2/everything?" + `q=${sourceId}&apiKey=${getApiKey()}&page=${page}`;
    fetch(url)
        .then(r => r.json())
        .then((data) => {
            document.getElementById("screen").innerHTML = "";
            let { articles } = data;
            const markup = `
                <table width="100%">
                ${articles.map(article =>
                    `<tr>
                        <td align="center">
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
                ).join('')}
                </table>`;
            let pageDiv = document.createElement("div");
            pageDiv.innerHTML = markup;
            document.getElementById("newsScreen").appendChild(pageDiv);           
        })
        .catch((err) => {
            console.log(err);
        });
}
