const apiKey = "58df04c8eb5be6be4aef9d5d5539bdad";
const newsList = document.getElementById("newsList");

async function loadNews() {
  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=gb&apikey=${apiKey}`);
    const data = await response.json();

    newsList.innerHTML = "";

    data.articles.slice(0, 6).forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `<strong><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></strong><br/><small>${article.source.name}</small>`;
      newsList.appendChild(li);
    });
  } catch (error) {
    newsList.innerHTML = `<li>Could not fetch news. Please check your connection or API key.</li>`;
  }
}

loadNews();
