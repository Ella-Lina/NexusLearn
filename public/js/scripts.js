document.getElementById('search').addEventListener('input', function (e) {
  const query = e.target.value;
  if (query.length < 3) {
    document.getElementById('search-results').innerHTML = '';
    return;
  }
  fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById('search-results');
      results.innerHTML = data.map(item => `<div>${item.name}</div>`).join('');
    });
});

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

document.getElementById('quiz-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const answers = {
    q1: 'HTML',
    q2: 'Python',
    q3: 'Mobile Apps'
  };
  let score = 0;
  const formData = new FormData(this);
  for (let [name, value] of formData) {
    if (answers[name] === value) score++;
  }
  document.getElementById('quiz-result').innerHTML = `You scored ${score}/3! ${score === 3 ? 'Perfect!' : 'Try again!'}`;
});

document.getElementById('filter-form')?.addEventListener('change', function () {
  const year = document.getElementById('year').value;
  const category = document.getElementById('category').value;
  fetch(`/api/events?year=${year}&category=${encodeURIComponent(category)}`)
    .then(response => response.json())
    .then(data => {
      const events = document.getElementById('event-list');
      events.innerHTML = data.map(event => `
        <div class="event-card">
          <h3>${event.title}</h3>
          <p>${event.date}</p>
          <a href="/event/${event.id}">Details</a>
        </div>
      `).join('');
    });
});

function handleScroll() {
  const elements = document.querySelectorAll('.course-card, .instructor-card, .event-card');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('fade-in', 'visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
