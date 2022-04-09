$(document).ready(function () {
  //Student errors
  let addFirstNameError = "#add_first_name_error";
  let addLastNameError = "#add_last_name_error";
  let editFirstNameError = "#edit_first_name_error";
  let editLastNameError = "#edit_last_name_error";

  //Student attributes
  let addFirstName = "#add_first_name";
  let addLastName = "#add_last_name";
  let addDateOfBirth = "#add_date_of_birth";
  let addTuitionFees = "#add_tuition_fees";
  let editFirstName = "#edit_first_name";
  let editLastName = "#edit_last_name";

  hideErrors();

  $(addFirstName).keyup(() => {
    checkElement(addFirstName, addFirstNameError);
  });
  $(addLastName).keyup(() => {
    checkElement(addLastName, addLastNameError);
  });

  $(editFirstName).keyup(() => {
    checkElement(editFirstName, editFirstNameError);
  });
  $(editLastName).keyup(() => {
    checkElement(editLastName, editLastNameError);
  });

  function hideErrors() {
    $(addFirstNameError).hide();
    $(addLastNameError).hide();
    $(editFirstNameError).hide();
    $(editLastNameError).hide();
  }

  function checkElement(attribute, error) {
    let pattern = /^[A-Za-z]+$/;
    let col = $(attribute).val();
    if (pattern.test(col)) {
      $(error).hide();
      $(attribute).val(function () {
        return this.value.toUpperCase();
      });
    } else {
      $(error).show().html("Should contain only characters!");
    }
  }

  $.validator.addMethod(
    "check_for_valid_date",

    function (value, element) {
      let today = new Date();
      let minDate = Date.parse("01/01/2010");
      let maxDate = Date.parse("12/31/2015");
      let DOB = Date.parse(value);
      if (DOB <= today && DOB >= minDate) {
        if (DOB <= maxDate) {
          return true;
        }
        return false;
      }
    },
    `Not a valid Date `
  );

  $("#add_new_student").validate({
    rules: {
      add_first_name: {
        required: true,
        minlength: 3,
      },
      add_last_name: {
        required: true,
        minlength: 4,
      },
      add_date_of_birth: {
        check_for_valid_date: "#add_date_of_birth",
      },
    },
  });

  $("#edit_student").validate({
    rules: {
      edit_first_name: {
        required: true,
        minlength: 3,
      },
      edit_last_name: {
        required: true,
        minlength: 5,
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

  $("#add_student_button").click(function () {
    if ($("#add_new_student").valid()) {
      let firstName = $(addFirstName).val();
      let lastName = $(addLastName).val();
      let dateBirth = $(addDateOfBirth).val();
      let tuitionFees = $(addTuitionFees).val();

      $("#students-table tbody").append(`<tr class='table-primary'>
                          <td class='align_middle'>${firstName}</td>
                          <td class='align_middle'>${lastName}</td>
                          <td class='align_middle'>${dateBirth}</td>     
                          <td class='align_middle'>${tuitionFees}</td>    
                          <td>
                          <button type="button" class="btn
                                  btn-outline-primary bt-sm" data-toggle="modal" data-target="#edit">
                              Edit
                          </button>
                          </td>
                          </tr>`);

      hideModal();
      clearModal();
    }
  });
});
