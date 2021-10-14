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

  class BooksList{
    constructor(){
      const thisBookList = this;
      thisBookList.getElements();
      thisBookList.initData();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.filterBooks();
    }

    initData(){
      this.data = dataSource.books;
      this.filters = [];        // tablica dostepna we wszystkich metodach
    }

    getElements(){
      const thisBookList = this;
      thisBookList.booklist = document.querySelector('.books-list');
      thisBookList.form = document.querySelector('form');
      // thisBookList.bookImage = document.querySelector('book__image[data-id=id]');
    }

    // eslint-disable-next-line no-unused-vars
    render(){
      const thisBookList = this;
      // const booklist = document.querySelector('.books-list');
      for (let book of this.data  /*dataSource.books*/ ){
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating*10;
        const generatedHTML = templates.booksList(book);
        // eslint-disable-next-line no-undef
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBookList.booklist.appendChild(element);   //appendChild wykonuje się na alemencie html, nie na stringu
        // const ratingBgc = this.determineRatingBgc(book.rating); //stała która będzie równa temu, co zwróci determineRatingBgc dla rating danej książki.
        // const ratingWidth = book.rating*10;         //stała która ustali długość paska. Musi się ona opierać na wartości ratingu. Jeśli rating równa się 5, to ratingWidth musi równać się 50 itd. Czyli tak naprawdę konwertujemy rating do skali procentowej.
      }
    }

    initActions(){
      const thisBookList = this;
      const favoriteBooks = [];
      
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
      // const bookList = document.querySelector('.books-list');
      thisBookList.booklist.addEventListener('dblclick', function(event){
        event.preventDefault();
        //const bookImage = document.querySelectorAll('.book__image');
      
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

      //const form = document.querySelector('form');
      thisBookList.form.addEventListener('click', function(event){
        //(czy jego tagName to INPUT, type to checkbox, a name to filter), a jeśli tak, to pokaż w konsoli, jego wartość (value).
        if(event.target.tagName == 'INPUT' &&  event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log('event.target.value:', event.target.value);
          if(event.target.checked){
            thisBookList.filters.push(event.target.value);
          } else {
            const index = thisBookList.filters.indexOf(event.target.value);
            thisBookList.filters.splice(index, 1);
          } 
          thisBookList.filterBooks();
          
        }
      });   
    }

    filterBooks(){
      const thisBookList = this;
      for(let book of dataSource.books){
        let shouldBeHidden = false;
        for(let filter of thisBookList.filters){
          if(!book.details[filter]){ 
            shouldBeHidden = true;
            break;
          }
        }

        const bookImage = document.querySelector('.book__image[data-id= "' +book.id+ '"]');
        if(shouldBeHidden == true){
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      } 
    }

    determineRatingBgc(rating){
      if(rating<6){
        return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } 
      
      if(rating > 6 && rating <= 8){
        return 'background: linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      }

      if(rating > 8 && rating <= 9 ){
        return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }

      if(rating > 9){
        return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }



   
  
  }
  const app = new BooksList();
  
}