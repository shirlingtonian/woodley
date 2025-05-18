// 1. Grab the container
const grid = document.getElementById('grid');

// 2. Load data
fetch('data/colleges.json')
  .then(res => res.json())
  .then(colleges => {
    colleges.forEach(school => {
      // 3. Build each card
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h2>${school.name}</h2>
        <ul>
          <li>Founded: ${school.founded}</li>
          <li>Avg. SAT: ${school.averageSat}</li>
        </ul>
        <a href="${school.url}" class="card-more">Read More »</a>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => console.error('Failed to load data:', err));
