function getBooks() {
    const apiUrl = 'https://openlibrary.org/subjects/javascript.json?limit=10';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayBooks(data.works);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function displayBooks(works) {
    const bookContainer = document.getElementById('bookContainer');

    works.forEach(work => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        const title = work.title;
        const author = work.authors ? work.authors.map(author => author.name).join(', ') : 'Unknown Author';
        const imageUrl = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`;

        bookCard.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="bookImage">
            <div class="bookTitle">${title}</div>
            <div class="bookAuthor">By ${author}</div>
        `;

        bookContainer.appendChild(bookCard);
    });
}
getBooks();