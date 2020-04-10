/******************************************************************************/
/**************JavaScript file for createBook i.e crateBook.js*****************/
pl.view.createBook = {

    setupUserInterface: function ()
    {
      var saveButton = document.forms['Book'].commit;

      //Save all the books in object
      Book.loadAll();

      //Create event handler to save everything
      saveButton.addEventListener("click", pl.view.createBook.handleSaveButtonClickEvent);
      window.addEventListener("beforeunload", function ()
      {
          Book.saveAll();
      });
    },

    //Save user's data
    handleSaveButtonClickEvent: function ()
    {
      var formEl = document.forms['Book'];
      var slots = { Code: formEl.Code.value,
          Name: formEl.Name.value,
          year: formEl.year.value};
      Book.add( slots);
      formEl.reset();
    }
};
