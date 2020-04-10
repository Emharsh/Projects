/******************************************************************************/
/*******************JavaScript file for Book i.e Book.js***********************/
function Book( slots)
{
  this.Code = slots.Code;
  this.Name = slots.Name;
  this.year = slots.year;
};

//Create an empty portion i.e array for the storage of the book
Book.instances = {};

Book.convertRow2Obj = function (bookRow)
{
  var book = new Book( bookRow);
  return book;
};

// Load the book table from Local Storage
Book.loadAll = function ()
{
  var key="", keys=[], booksString="", books={}, i=0;
  try
  {
    if (localStorage.getItem("books"))
    {
      booksString = localStorage.getItem("books");
    }
  }
  catch (e)
  {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString)
  {
    books = JSON.parse( booksString);
    keys = Object.keys( books);
    console.log( keys.length +" books loaded.");
    for (i=0; i < keys.length; i++)
    {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( books[key]);
    }
  }
};

//Using javascript to save all database in local Storage
Book.saveAll = function ()
{
  var booksString="", error=false,
  nmrOfBooks = Object.keys( Book.instances).length;
  try
  {
    booksString = JSON.stringify( Book.instances);
    localStorage.setItem("books", booksString);
  }
  catch (e)
  {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved.");
  {

  }
};

//Create new book database
Book.add = function (slots)
{
  var book = new Book( slots);
  Book.instances[slots.Code] = book;
  console.log("Book " + slots.Code + " created!");
};

//Update the book in the database or change it.
Book.update = function (slots)
{
  var book = Book.instances[slots.Code];
  var year = parseInt( slots.year);
  if (book.Name !== slots.Name)
  {
    book.Name = slots.Name;
  }
  if (book.year !== slots.year)
  {
    book.year = year;
  }
  console.log("Book " + slots.Code + " modified!");
};

//Delete the book database from the storage
Book.destroy = function (Code) {
    if (Book.instances[Code]) {
      console.log("Book " + Code + " deleted");
      delete Book.instances[Code];
    } else {
      console.log("There is no book with Code " + Code + " in the database!");
    }
  };

/***************************************************
***** Adding some books name  for unit testing *****
****************************************************/

//Create database for testing
Book.createTestData = function ()
{
  Book.instances["12345"] = new Book({Code:"12345", Name:"Computer Architecture", year:2000});
  Book.instances["21547"] = new Book({Code:"21547", Name:"Harry Potter", year:1999});
  Book.instances["64874"] = new Book({Code:"64874", Name:"Introducton to Mathematics", year:2008});
  Book.saveAll();
};

//Clear the data
Book.clearData = function ()
{
  if (confirm("Delete all book data?"))
  {
    Book.instances = {};
    localStorage.setItem("books", "{}");
  }
};

/*******************************************************************************/
