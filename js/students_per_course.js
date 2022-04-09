$(document).ready(function () {
  //Students_per_ course_errors
  let addCourseError = "#add_course_error";
  let addStudentError = "#add_student_error";
  let editCourseError = "#edit_course_error";
  let editStudentError = "#edit_student_error";

  //Students_per_course attributes
  let addCourse = "#add_course";
  let addStudent = "#add_student";
  let editCourse = "#edit_course";
  let editStudent = "#edit_student";

  hideErrors();

  $(addCourse).keyup(() => {
    checkElement(addCourse, addCourseError);
  });
  $(addStudent).keyup(() => {
    checkElement(addStudent, addStudentError);
  });

  $(editCourse).keyup(() => {
    checkElement(editCourse, editCourseError);
  });
  $(editStudent).keyup(() => {
    checkElement(editStudent, editStudentError);
  });

  function hideErrors() {
    $(addCourseError).hide();
    $(addStudentError).hide();
    $(editCourseError).hide();
    $(editStudentError).hide();
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

  $("#add_new_student_per_course").validate({
    rules: {
      add_course: {
        required: true,
        minlength: 5,
      },
      add_student: {
        required: true,
        minlength: 7,
      },
    },
  });

  $("#edit_student_per_course").validate({
    rules: {
      edit_course: {
        required: true,
        minlength: 5,
      },
      edit_student: {
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

  $("#add_student_per_course_button").click(function () {
    if ($("#add_new_student_per_course").valid()) {
      let course = $(addCourse).val();
      let student = $(addStudent).val();

      $("#students-per-course-table tbody").append(`<tr class='table-primary'>
                            <td class='align-middle'>${course}</td>
                            <td class='align-middle'>${student}</td>
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
