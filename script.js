document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const validPages = ['national', 'liberal-arts', 'law-school'];
  if (!validPages.includes(page)) return;

  fetch(`data/${page}.json`)
    .then(res => res.json())
    .then(items => {
      // sort descending by score
      items.sort((a, b) => b.score - a.score);
      // assign ranks with ties
      let prevScore = null;
      let prevRank = 0;
      items.forEach((item, idx) => {
        if (item.score === prevScore) {
          item.rank = prevRank;
        } else {
          item.rank = idx + 1;
          prevRank = item.rank;
          prevScore = item.score;
        }
      });

      // build table
      const container = document.querySelector('.ranking-table');
      const table = document.createElement('table');
      table.className = 'table-sortable';
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th data-sort="rank">Rank</th>
          <th data-sort="name">School</th>
        </tr>`;
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.rank}</td><td>${item.name}</td>`;
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      container.appendChild(table);

      // add sorting
      document.querySelectorAll('.table-sortable th').forEach(th => {
        th.addEventListener('click', () => {
          const sortKey = th.dataset.sort;
          const order = th.dataset.order === 'asc' ? 'desc' : 'asc';
          items.sort((a, b) => {
            if (sortKey === 'name') {
              return order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            } else {
              return order === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
            }
          });
          // rerender
          tbody.innerHTML = '';
          items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.rank}</td><td>${item.name}</td>`;
            tbody.appendChild(row);
          });
          th.dataset.order = order;
        });
      });
    });
});
