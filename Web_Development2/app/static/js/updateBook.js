/******************************************************************************/
/**************JavaScript file for updateBook i.e updateBook.js****************/

pl.view.updateBook = {
    setupUserInterface: function ()
    {
      var formEl = document.forms['Book'],
      saveButton = formEl.commit,
      selectBookEl = formEl.selectBook;
      var key="", keys=[], book=null, optionEl=null, i=0;

      //Save all the books
      Book.loadAll();

      //Save those books to instances i.a empty array
      keys = Object.keys( Book.instances);
      for (i=0; i < keys.length; i++)
      {
        key = keys[i];
        book = Book.instances[key];
        optionEl = document.createElement("option");
        optionEl.text = book.Name;
        optionEl.value = book.Code;
        selectBookEl.add( optionEl, null);
      }

      //Save the books when user selects the book
      selectBookEl.addEventListener("change", function ()
      {
        var book=null, key = selectBookEl.value;
        if (key)
        {
          book = Book.instances[key];
          formEl.Code.value = book.Code;
          formEl.Name.value = book.Name;
          formEl.year.value = book.year;
        }
        else
        {
          formEl.reset();
        }
      });

      saveButton.addEventListener("click", pl.view.updateBook.handleSaveButtonClickEvent);
      window.addEventListener("beforeunload", function ()
      {
          Book.saveAll();
      });
    },

    //Save the databae of the books
    handleSaveButtonClickEvent: function ()
    {
      var formEl = document.forms['Book'];
      var slots = { Code: formEl.Code.value,
            Name: formEl.Name.value,
            year: formEl.year.value
          };
      Book.update( slots);
      formEl.reset();
    }
};
