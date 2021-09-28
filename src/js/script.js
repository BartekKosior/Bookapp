{

  const select = {
    templateOf: {
      book: '#template-book',
    },
    books: {
      List: 'books-list'
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  // eslint-disable-next-line no-unused-vars
  function render(){
    const booklist = document.querySelector('.books-list');
    for (let book of dataSource.books){
      const generatedHTML = templates.booksList(book);
      // eslint-disable-next-line no-undef
      const element = utils.createDOMFromHTML(generatedHTML);
      booklist.appendChild(element);   //appendChild wykonuje się na alemencie html, nie na stringu

    }
  }
  render();
  
  favoriteBooks = [];
  function initActions(){
    // ref do wszystkich elementów .book-image w liście .bookslist
    const bookImages = document.querySelector('.books-list')
    
    for(let bookImage of bookImages){
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.add('.favorite');
        const bookId = dataSource.books(id);   //pobranie id książki
        favoriteBooks.push(bookId);            // dodanie id do tablicy favoriteBooks
      }
    }
  }
  initActions();
  
 

} 