fetch('https://newsapi.org/v2/top-headlines?category=business&q=PR&apiKey=6c9e4c1a04cb47649c3a5d41c3d42a36')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('industry-news');
    data.articles.slice(0, 5).forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      list.appendChild(li);
    });
  })
  .catch(err => console.error('News fetch failed', err));
