/******************************************************************************/
/***************JavaScript file for listBooksi.e listBooks.js******************/

pl.view.listBooks = {

    setupUserInterface: function ()
    {
      var tableBodyEl = document.querySelector("table#books>tbody");
      var keys=[], key="", row={}, i=0;
      // load all book objects
      Book.loadAll();
      keys = Object.keys( Book.instances);
      // for each book, create a table row with a cell for each attribute
      for (i=0; i < keys.length; i++)
      {
        key = keys[i];
        row = tableBodyEl.insertRow();
        row.insertCell(-1).textContent = Book.instances[key].Code;
        row.insertCell(-1).textContent = Book.instances[key].Name;
        row.insertCell(-1).textContent = Book.instances[key].year;
      }
    }
};
