const apiKey = "58df04c8eb5be6be4aef9d5d5539bdad";
const endpoint = `https://gnews.io/api/v4/top-headlines?topic=world&lang=en&token=${apiKey}&max=5`;

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById("newsList");
        newsList.innerHTML = "";

        data.articles.forEach(article => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = article.url;
            link.textContent = article.title;
            link.target = "_blank";
            li.appendChild(link);
            newsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Failed to fetch news:", error);
        const fallback = document.getElementById("newsList");
        fallback.innerHTML = "<li>Unable to load headlines at the moment.</li>";
    });
