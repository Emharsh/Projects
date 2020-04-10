(function (){
$('#preregister-form').on('submit', function(e) {
  e.preventDefault();
  let submitButton = $('#submit-preregister');
  submitButton.attr('disabled', true);
  let formFeedback = $('#form-feedback')
  let formData = $(this).serializeFormJSON();
  let onCompletedUrl = $(this).attr('completed')

  $.postJson($(this).attr('action'), formData)
    .then(function() {
      formFeedback.removeClass('hidden');
      formFeedback.removeClass('alert-danger');
      formFeedback.addClass('alert-info');
      formFeedback.text('Preregistration successful. You will be redirected shortly.');
      setTimeout(function() {
        window.location.href = onCompletedUrl;
      }, 3000)
    })
    .catch(function(response) {
      formFeedback.removeClass('hidden');
      formFeedback.addClass('alert-danger');
      if (response.responseJSON) {
        formFeedback.text(response.responseJSON.error);
      }
      submitButton.attr('disabled', false);
    })
});

}
)();