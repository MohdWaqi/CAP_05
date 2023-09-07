function Author(authorName, authorBirthYear, authorNationality) {
  this.name = authorName;
  this.birthYear = authorBirthYear;
  this.nationality = authorNationality;
}

function Book(bookTitle, authorDetails, bookGenre, bookPrice) {
  this.title = bookTitle;
  this.details = authorDetails;
  this.genre = bookGenre;
  this.price = bookPrice;
  this.getBookInfo = function () {
    return (
      "Title : " +
      this.title +
      "\n" +
      "Author : " +
      this.details.name +
      "\n" +
      "Genre : " +
      this.genre +
      "\n" +
      "Price : " +
      this.price
    );
  };
}

let author1 = new Author("Charles Duhigg", 1974, "American");
let author2 = new Author("Shashi Tharoor", 1956, "Indian");
let author3 = new Author("Jhumpa Lahiri", 1967, "Indian");
let author4 = new Author("Peter Lynch", 1944, "American");

let book1 = new Book("The Power of Habit", author1, "Self-Help", 431);
let book2 = new Book(
  "The Paradoxical Prime Minister",
  author2,
  "Biography",
  799
);
let book3 = new Book("PAX Indica", author2, "Political Science", 339);
let book4 = new Book("Smarter Faster Better", author1, "Self-Help", 1436);
let book5 = new Book("The Namesake", author3, "Domestic Fiction", 336);
let book6 = new Book("One Up on Wall Street", author4, "Biography", 410);
let book7 = new Book("Interpreter of Maladies", author3, "Fiction", 2161);
let book8 = new Book(
  "Beating the Street",
  author4,
  "Business & Economics",
  489
);
let book9 = new Book("Unaccustomed Earth", author3, "Short Stories", 252);
let book10 = new Book("Inglorious Empire", author2, "History", 752);


function display(...books){
    for(let book of books){
        console.log(book.getBookInfo());
        console.log("                                                ");
        console.log("------------------------------------------------");
    }
}
display(book1,book2,book3,book4,book5,book6,book7,book8,book9,book10)
