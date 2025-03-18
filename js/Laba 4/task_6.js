function libraryManagement() {
  let books = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      genre: "Fantasy",
      pages: 300,
      isAvailvable: true,
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      pages: 500,
      isAvailvable: false,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Novel",
      pages: 200,
      isAvailvable: true,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Novel",
      pages: 150,
      isAvailvable: false,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      pages: 250,
      isAvailvable: true,
    },
  ];

  function addBook(title, author, genre, pages) {
    let newBook = {
      title: title,
    };
    newBook.title = title;
    newBook.author = author;
    newBook.genre = genre;
    newBook.pages = pages;
    newBook.isAvailvable = true;
    books.push(newBook);
    console.log("Array with new book:", books);
  }
  addBook("The Alchemist", "Paulo Coelho", "Novel", 200);

  function removeBook(title) {
    let result = books.filter((book) => book.title !== title);
    console.log("Array without book:", result);
  }
  removeBook("The Hobbit");

  function findBooksByAuthor(author) {
    let result = books.filter((book) => book.author === author);
    console.log("Array with books by author:", result);
  }
  findBooksByAuthor("F. Scott Fitzgerald");

  function toogleBookAvailability(title, isBorrowed) {
    let result = books.map((book) => {
      if (book.title === title) {
        book.isAvailvable = isBorrowed;
      }
      return book;
    });
    console.log("Array with updated book:", result);
  }

  toogleBookAvailability("Harry Potter", false);

  function sortBooksByPages() {
    let result = books.sort((a, b) => a.pages - b.pages);
    console.log("Sorted array by pages:", result);
  }
  sortBooksByPages();

  function getBooksStatistics(currentBooks) {
    let result = currentBooks.reduce(
      (acc, book) => {
        acc.pagesSum += book.pages;
        acc.totalBooksCount++;
        if (book.isAvailvable) {
          acc.availableBooksCount++;
        } else {
          acc.borrowedBooksCount++;
        }
        return acc;
      },
      {
        totalBooksCount: 0,
        pagesSum: 0,
        availableBooksCount: 0,
        borrowedBooksCount: 0,
      }
    );

    const averagePages =
      result.totalBooksCount > 0 ? result.pagesSum / result.totalBooksCount : 0;

    return {
      totalBooksCount: result.totalBooksCount,
      availableBooksCount: result.availableBooksCount,
      borrowedBooksCount: result.borrowedBooksCount,
      averagePages: averagePages,
    };
  }

  const statistics = getBooksStatistics(books);
  console.log("Books statistics:", statistics);
}

libraryManagement();
