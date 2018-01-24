
let Article = function () {
    this.title = "";
    this.urlToImage = "http://";
    this.description = "";
    this.author = "";
    this.publishedAt = "";

    this.toHtml = function () {
        const markup =
            `<tr>
            <td align="center">
                <div>
                    <h3 class="colorRed">${this.title}</h3>
                </div>
                <div class="img" style="background-image: url('${this.urlToImage ? this.urlToImage : ''}')">
                    <img class="img" src='${this.urlToImage ? this.urlToImage : ''}' style="visibility: hidden;" />
                </div>                            
                <div>
                    <span>${this.description}</span>
                </div>
                <div class="newsAuthor">
                    <b>${this.author ? this.author : ''}</b><br>
                    <span>${this.publishedAt ? new Date(this.publishedAt).toLocaleDateString() : ''}</span>
                </div>
            </td>
        </tr>`;
        return markup;
    }

    this.clone = function () {
        let a = new Article();
        a.title = this.title;
        a.urlToImage = this.urlToImage;
        a.description = this.description;
        a.author = this.author;
        a.publishedAt = this.publishedAt;
        return a;
    }
};

let ArticleProxy = function (info) {
    let a = new Article();
    a.title = info.title;
    a.urlToImage = info.urlToImage;
    a.description = info.description;
    a.author = info.author;
    a.publishedAt = info.publishedAt;

    return {
        toHtml: function () {
            return a.toHtml();
        }
    }
}

let NewsSourceProxy = function (info) {
    let s = new NewsSource();
    s.id = info.id;
    s.name = info.name;
    s.url = info.url;

    return {
        toHtml: function () {
            return s.toHtml();
        }
    }
}

let NewsSource = function () {
    this.name = "";
    this.id = "";
    this.url = ""

    this.toHtml = function () {
        const markup =
            `<div class="newsSource">
                <table width="100%">
                    <tr>
                        <td align="center">
                            <h3>${this.name}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">                                    
                            <span class="sourceLink" data-id='${this.id}'>${this.url}</span>
                        </td>
                    </tr>
                </table>
            </div>`;
        return markup;
    }

    this.clone = function () {
        let s = new NewsSource();
        s.id = this.id;
        s.name = this.name;
        s.url = this.url;
        return s;
    }
};

export function newsFactory() {
    return {
        createArticle: function (info) {
            return ArticleProxy(info);
        },
        createNewsSource: function (info) {
            return new NewsSourceProxy(info);
        }
    }
}

