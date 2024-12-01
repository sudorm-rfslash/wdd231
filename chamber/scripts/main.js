async function fetchMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  const directory = document.getElementById('directory');

  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <div>
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${member.membership}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
    directory.appendChild(card);
  });
}

document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory').className = 'grid';
  fetchMembers();
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory').className = 'list';
  fetchMembers();
});

fetchMembers();
