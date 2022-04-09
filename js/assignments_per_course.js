$(document).ready(function () {
  //Assignment_per_course errors
  let addTitleError = "#add_title_error";
  let addCourseError = "#add_course_error";
  let editTitleError = "#edit_title_error";
  let editCourseError = "#edit_course_error";


  //Assignment_per_course attributes
  let addTitle = "#add_title";
  let addCourse = "#add_course";
  let addSubDateTime = "#add_sub_date_time";
  let editTitle = "#edit_title";
  let editCourse = "#edit_course";

  hideErrors();

  $(addTitle).keyup(() => {
    checkElement(addTitle, addTitleError);
  });
  $(addCourse).keyup(() => {
    checkElement(addCourse, addCourseError);
  });
  $(editTitle).keyup(() => {
    checkElement(editTitle, editTitleError);
  });
  $(editCourse).keyup(() => {
    checkElement(editCourse, editCourseError);
  });

  function hideErrors() {
    $(addTitleError).hide();
    $(addCourseError).hide();
    $(editTitleError).hide();
    $(editCourseError).hide();
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

  $.validator.addMethod(
    "date_greater_than_today",
    function (value, element) {
      var currentDate = new Date();
      var selectedDate = new Date(value);
      return currentDate <= selectedDate;
    },
    "You cannot select a shorter or today's date."
  );

  $("#add_new_assignment_per_course").validate({
    rules: {
      add_title: {
        required: true,
        minlength: 5,
      },
      add_course: {
        required: true,
        minlength: 4,
      },
      add_sub_date_time: {
        date_greater_than_today: "#add_sub_date_time",
      },
    },
  });

  $("#edit_assignment_per_course").validate({
    rules: {
      edit_title: {
        required: true,
        minlength: 5,
      },
      edit_course: {
        required: true,
        minlength: 4,
      },
      edit_sub_date_time: {
        date_greater_than_today: "#edit_sub_date_time",
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

  $("#add_assignment_per_course_button").click(function () {
    if ($("#add_new_assignment_per_course").valid()) {
      let title = $(addTitle).val();
      let course = $(addCourse).val();
      let subDateTime = $(addSubDateTime).val();

      $("#assignments-per-course-table tbody")
        .append(`<tr class='table-primary'>
                              <td class='align_middle'>${title}</td>
                              <td class='align_middle'>${course}</td>
                              <td class='align_middle'>${subDateTime}</td>     
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
