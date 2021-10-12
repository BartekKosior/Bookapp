{

  const select = {
    templateOf: {
      book: '#template-book',
    },
    books: {
      list: 'books-list'
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
      const ratingBgc =                //która będzie równa temu, co zwróci determineRatingBgc dla rating danej książki. ????????????????????
      const ratingWidth =          //która ustali długość paska. Musi się ona opierać na wartości ratingu. Jeśli rating równa się 5, to ratingWidth musi równać się 50 itd. Czyli tak naprawdę konwertujemy rating do skali procentowej. ???????
    }
  }
  render();
  
  const favoriteBooks = [];
  const filters =[];
  function initActions(){
    // ref do wszystkich elementów .book-image w liście .bookslist
    // const bookImages = document.querySelectorAll('.book__image');
    /* for(let bookImage of bookImages){
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = bookImage.getAttribute('data-id');   //pobranie id książki
        if(favoriteBooks.includes(bookId)){                 //sprawdzenie czy tablica zawiera bookId
          bookImage.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId)
          favoriteBooks.splice(index, 1)                    //usun
        } else {
          bookImage.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      });  
    } */
    
    // ref do listy .bookslist
    const bookList = document.querySelector('.books-list');
    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
      //  const bookImage = document.querySelectorAll('.book__image');
      
      if(event.target.offsetParent.classList.contains('book__image')){
        const bookImage = event.target.offsetParent;
        const bookId = bookImage.getAttribute('data-id');
        if(favoriteBooks.includes(bookId)){                 //sprawdzenie czy tablica zawiera bookId
          bookImage.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);                    //usun
        } else {
          bookImage.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }
    });

    const form = document.querySelector('form');
    form.addEventListener('click', function(event){
      //(czy jego tagName to INPUT, type to checkbox, a name to filter), a jeśli tak, to pokaż w konsoli, jego wartość (value).
      if(event.target.tagName == 'INPUT' &&  event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log('event.target.value:', event.target.value);
        if(event.target.checked){
          filters.push(event.target.value);
        } else {
          const index = filters.indexOf(event.target.value);
          filters.splice(index, 1);
        }           
      }
    });

  
  }
  initActions();

  function filterbooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(let filter of filters){
        if(!book.details[filter]) { 
          shouldBeHidden = true;
          break;
        }
      }

      if(shouldBeHidden == true){
        const bookImage = document.querySelectorAll('book__image[data-id="id"]');
        bookImage.classList.add('hidden');
      } else {
        const bookImage = document.querySelectorAll('book__image[data-id="id"]');
        bookImage.classList.remove('hidden');
      }
    }
  };

  filterbooks()
  
  function determineRatingBgc('rating'){
    
  };

  class BooksList {
    constructor() {
      
    }
  
    initData() {
      this.data = dataSource.books;
    }
  
    getElements() {
      
    }
  
    initActions() {
      
    }
  
    filterBooks() {
      
    }
  
    determineRatingBgc() {
      
    }
  
  }
  
  const app = new BooksList();






} 