const API_KEY =58df04c8eb5be6be4aef9d5d5539bdad;
const NEWS_API = `https://gnews.io/api/v4/search?q=public%20relations&lang=en&max=5&apikey=${API_KEY}`;

window.addEventListener("DOMContentLoaded", () => {
    fetchNews();
});

function fetchNews() {
    fetch(NEWS_API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("news-list");
            list.innerHTML = "";

            if (data.articles) {
                data.articles.forEach(article => {
                    const item = document.createElement("li");
                    item.innerHTML = `
                        <strong>${article.title}</strong><br>
                        <a href="${article.url}" target="_blank">${article.source.name}</a>
                    `;
                    list.appendChild(item);
                });
            } else {
                list.innerHTML = "<li>No news available.</li>";
            }
        })
        .catch(err => {
            document.getElementById("news-list").innerHTML = "<li>Error loading news.</li>";
            console.error("News API Error:", err);
        });
}
