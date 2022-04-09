$(document).ready(function () {
  //Course errors
  let addTitleError = "#add_title_error";
  let addTypeError = "#add_type_error";
  let editTitleError = "#edit_title_error";
  let editTypeError = "#edit_type_error";

  //Course attributes
  let addTitle = "#add_title";
  let addType = "#add_type";
  let addStartDate = "#add_start_date";
  let addEndDate = "#add_end_date";
  let editTitle = "#edit_title";
  let editType = "#edit_type";

  hideErrors();

  $(addTitle).keyup(() => {
    checkElement(addTitle, addTitleError);
  });

  $(addType).keyup(() => {
    checkElement(addType, addTypeError);
  });

  $(editTitle).keyup(() => {
    checkElement(editTitle, editTitleError);
  });

  $(editType).keyup(() => {
    checkElement(editType, editTypeError);
  });

  function hideErrors() {
    $(addTitleError).hide();
    $(addTypeError).hide();
    $(editTitleError).hide();
    $(editTypeError).hide();
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
    "date_greater_than_today",
    function (value, element) {
      var currentDate = new Date();
      var selectedDate = new Date(value);
      return currentDate <= selectedDate;
    },
    "You cannot select a shorter or today's date."
  );

  $.validator.addMethod(
    "date_greater_than_start_date",

    function (value, element, params) {
      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
      }

      return (
        (isNaN(value) && isNaN($(params).val())) ||
        Number(value) > Number($(params).val())
      );
    },
    "Date must be after the start date"
  );

  $("#add_new_course").validate({
    rules: {
      add_title: {
        required: true,
        minlength: 5,
      },
      add_type: {
        required: true,
        minlength: 5,
      },

      add_start_date: {
        date_greater_than_today: add_start_date,
      },
      add_end_date: {
        date_greater_than_start_date: add_start_date,
      },
    },
  });

  $("#edit_course").validate({
    rules: {
      edit_title: {
        required: true,
        minlength: 5,
      },
      edit_type: {
        required: true,
        minlength: 5,
      },
      edit_start_date: {
        date_greater_than_today: edit_start_date,
      },
      edit_end_date: {
        date_greater_than_start_date: edit_start_date,
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

  $("#add_course_button").click(function () {
    if ($("#add_new_course").valid()) {
      let courseTitle = $(addTitle).val();
      let courseType = $(addType).val();
      let startDate = $(addStartDate).val();
      let endDate = $(addEndDate).val();

      $("#courses-table tbody").append(`<tr class='table-primary'>
                        <td class='align-middle'>${courseTitle}</td>
                        <td class='align-middle'>${courseType}</td>
                        <td class='align-middle'>${startDate}</td>
                        <td class='align-middle'>${endDate}</td>
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
