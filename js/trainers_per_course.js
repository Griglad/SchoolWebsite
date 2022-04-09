$(document).ready(function () {
  //Trainers_per_ course_errors
  let addCourseError = "#add_course_error";
  let addTrainerError = "#add_trainer_error";
  let editCourseError = "#edit_course_error";
  let editTrainerError = "#edit_trainer_error";

  //Trainer_per_course attributes
  let addCourse = "#add_course";
  let addTrainer = "#add_trainer";
  let editCourse = "#edit_course";
  let editTrainer = "#edit_trainer";

  hideErrors();

  $(addCourse).keyup(() => {
    checkElement(addCourse, addCourseError);
  });
  $(addTrainer).keyup(() => {
    checkElement(addTrainer, addTrainerError);
  });

  $(editCourse).keyup(() => {
    checkElement(editCourse, editCourseError);
  });
  $(editTrainer).keyup(() => {
    checkElement(editTrainer, editTrainerError);
  });

  function hideErrors() {
    $(addCourseError).hide();
    $(addTrainerError).hide();
    $(editCourseError).hide();
    $(editTrainerError).hide();
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

  $("#add_new_trainer_per_course").validate({
    rules: {
      add_course: {
        required: true,
        minlength: 5,
      },
      add_trainer: {
        required: true,
        minlength: 7,
      },
    },
  });

  $("#edit_trainer_per_course").validate({
    rules: {
      edit_course: {
        required: true,
        minlength: 5,
      },
      edit_trainer: {
        required: true,
        minlength: 7,
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

  $("#add_trainer_per_course_button").click(function () {
    if ($("#add_new_trainer_per_course").valid()) {
      let course = $(addCourse).val();
      let trainer = $(addTrainer).val();

      $("#trainers-per-course-table tbody").append(`<tr class='table-primary'>
                          <td class='align-middle'>${course}</td>
                          <td class='align-middle'>${trainer}</td>
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
