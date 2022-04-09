$(document).ready(function () {
  //Assignment errors
  let addTitleError = "#add_title_error";
  let addDescriptionError = "#add_description_error";
  let addOralMarkError = "#add_oral_mark_error";
  let addTotalMarkError = "#add_total_mark_error";

  let editTitleError = "#edit_title_error";
  let editDescriptionError = "#edit_description_error";
  let editOralMarkError = "#edit_oral_mark_error";
  let editTotalMarkError = "#edit_total_mark_error";

  //Assignment attributes
  let addTitle = "#add_title";
  let addDescription = "#add_description";
  let addSubDateTime = "#add_sub_date_time";
  let addOralMark = "#add_oral_mark";
  let addTotalMark = "#add_total_mark";
  let editTitle = "#edit_title";
  let editDescription = "#edit_description";
  let editOralMark = "#edit_oral_mark";
  let editTotalMark = "#edit_total_mark";

  hideErrors();

  $(addTitle).keyup(() => {
    checkElement(addTitle, addTitleError);
  });
  $(addDescription).keyup(() => {
    checkElement(addDescription, addDescriptionError);
  });
  $(addOralMark).keyup(() => {
    checkMark(addOralMark, addOralMarkError);
  });
  $(addTotalMark).keyup(() => {
    checkMark(addTotalMark, addTotalMarkError);
  });

  $(editTitle).keyup(() => {
    checkElement(editTitle, editTitleError);
  });
  $(editDescription).keyup(() => {
    checkElement(editDescription, editDescriptionError);
  });
  $(editOralMark).keyup(() => {
    checkMark(editOralMark, editOralMarkError);
  });
  $(editTotalMark).keyup(() => {
    checkMark(editTotalMark, editTotalMarkError);
  });

  function hideErrors() {
    $(addTitleError).hide();
    $(addDescriptionError).hide();
    $(addOralMarkError).hide();
    $(addTotalMarkError).hide();
    $(editTitleError).hide();
    $(editDescriptionError).hide();
    $(editOralMarkError).hide();
    $(editTotalMarkError).hide();
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

  function checkMark(attribute, error) {
    let pattern = new RegExp("^[0-9]+$");
    let attr = $(attribute).val();
    pattern.test(attr)
      ? $(error).hide()
      : $(error).show().html("Should contain only numbers");
  }

  $.validator.addMethod(
    "date_greater_than_today",
    function (value, element) {
      var currentDate = new Date();
      var selectedDate = new Date(value);
      return currentDate <= selectedDate;
    },
    "You cannot select a shorter or today's date."
  );

  $("#add_new_assignment").validate({
    rules: {
      add_title: {
        required: true,
        minlength: 5,
      },
      add_description: {
        required: true,
        minlength: 10,
      },
      add_sub_date_time: {
        date_greater_than_today: "#add_sub_date_time",
      },
    },
  });

  $("#edit_assignment").validate({
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

  $("#add_assignment_button").click(function () {
    if ($("#add_new_assignment").valid()) {
      let title = $(addTitle).val();
      let description = $(addDescription).val();
      let subDateTime = $(addSubDateTime).val();
      let oralMark = $(addOralMark).val();
      let totalMark = $(addTotalMark).val();

      $("#assignments-table tbody").append(`<tr class='table-primary'>
                            <td class='align_middle'>${title}</td>
                            <td class='align_middle'>${description}</td>
                            <td class='align_middle'>${subDateTime}</td>     
                            <td class='align_middle'>${oralMark}</td>    
                            <td class='align_middle'>${totalMark}</td>    
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
