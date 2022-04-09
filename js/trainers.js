$(document).ready(function () {
  //Trainer Errors
  let addFirstNameError = "#add_first_name_error";
  let addLastNameError = "#add_last_name_error";
  let addSubjectError = "#add_subject_error";
  let editFirstNameError = "#edit_first_name_error";
  let editLastNameError = "#edit_last_name_error";
  let editSubjectError = "#edit_subject_error";

  //Trainer attributes
  let addFirstName = "#add_first_name";
  let addLastName = "#add_last_name";
  let addSubject = "#add_subject";
  let editFirstName = "#edit_first_name";
  let editLastName = "#edit_last_name";
  let editSubject = "#edit_subject";

  hideErrors();

  $(addFirstName).keyup(() => {
    checkElement(addFirstName, addFirstNameError);
  });
  $(addLastName).keyup(() => {
    checkElement(addLastName, addLastNameError);
  });

  $(addSubject).keyup(() => {
    checkElement(addSubject, addSubjectError);
  });

  $(editFirstName).keyup(() => {
    checkElement(editFirstName, editFirstNameError);
  });
  $(editLastName).keyup(() => {
    checkElement(editLastName, editLastNameError);
  });

  $(editSubject).keyup(() => {
    checkElement(editSubject, editSubjectError);
  });

  function hideErrors() {
    $(addFirstNameError).hide();
    $(addLastNameError).hide();
    $(addSubjectError).hide();
    $(editFirstNameError).hide();
    $(editLastNameError).hide();
    $(editSubjectError).hide();
  }

  function checkElement(attribute, error) {
    let pattern = /^[A-Za-z]+$/;
    let attr = $(attribute).val();
    if (pattern.test(attr)) {
      $(error).hide();
      $(attribute).val(function () {
        return this.value.toUpperCase();
      });
    } else {
      $(error).show().html("Should contain only characters!");
    }
  }

  $("#add_new_trainer").validate({
    rules: {
      add_first_name: {
        required: true,
        minlength: 3,
      },
      add_last_name: {
        required: true,
        minlength: 4,
      },
      add_subject: {
        required: true,
        minlength: 5,
      },
    },
  });

  $("#edit_trainers").validate({
    rules: {
      edit_first_name: {
        required: true,
        minlength: 3,
      },
      edit_last_name: {
        required: true,
        minlength: 4,
      },
      edit_subject: {
        required: true,
        minlength: 5,
      },
    },
  });

  //Clear modal
  function clearModal() {
    $(".modal").on("hidden.bs.modal", function () {
      $(this).find("form")[0].reset();
    });
  }

  function hideModal() {
    $("#add").modal("hide");
  }

  //Modal close
  $(".close").click(function () {
    hideErrors();
    clearModal();
  });

  $("#add_trainer_button").click(function () {
    if ($("#add_new_trainer").valid()) {
      let firstName = $(addFirstName).val();
      let lastName = $(addLastName).val();
      let subject = $(addSubject).val();

      $("#trainers-table tbody").append(`<tr class='table-primary'>
                        <td class='align-middle'>${firstName}</td>
                        <td class='align-middle'>${lastName}</td>
                        <td class='align-middle'>${subject}</td>               
                        <td>
                        <button type="button" class="btn
                                btn-outline-primary btn-sm" data-toggle="modal" data-target="#edit">
                            Edit
                        </button>
                        </td>
                        </tr>`);

      hideModal();
      clearModal();
    }
  });
});
