$(document).ready(function () {
  //Assignment_per_student_per_course errors
  let addTitleError = "#add_title_error";
  let addCourseError = "#add_course_error";
  let addStudentError = "#add_student_error";
  let editTitleError = "#edit_title_error";
  let editCourseError = "#edit_course_error";
  let editStudentError = "#edit_student_error";

  //Assignment_per_student_per_course attributes
  let addTitle = "#add_title";
  let addCourse = "#add_course";
  let addStudent = "#add_student";
  let editTitle = "#edit_title";
  let editCourse = "#edit_course";
  let editStudent = "#edit_student";

  hideErrors();

  $(addTitle).keyup(() => {
    checkElement(addTitle, addTitleError);
  });
  $(addCourse).keyup(() => {
    checkElement(addCourse, addCourseError);
  });
  $(addStudent).keyup(() => {
    checkElement(addStudent, addStudentError);
  });
  $(editTitle).keyup(() => {
    checkElement(editTitle, editTitleError);
  });
  $(editCourse).keyup(() => {
    checkElement(editCourse, editCourseError);
  });
  $(editStudent).keyup(() => {
    checkElement(editStudent, editStudentError);
  });

  function hideErrors() {
    $(addTitleError).hide();
    $(addCourseError).hide();
    $(addStudentError).hide();
    $(editTitleError).hide();
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

  $("#add_assignment_per_student_per_course").validate({
    rules: {
      add_title: {
        required: true,
        minlength: 5,
      },
      add_course: {
        required: true,
        minlength: 4,
      },
      add_student: {
        required: true,
        minlength: 8,
      },
    },
  });

  $("#edit_assignment_per_student_per_course").validate({
    rules: {
      edit_title: {
        required: true,
        minlength: 5,
      },
      edit_course: {
        required: true,
        minlength: 4,
      },
      edit_student: {
        required: true,
        minlength: 8,
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

  $("#add_assignment_per_student_per_course_button").click(function () {
    if ($("#add_assignment_per_student_per_course").valid()) {
      let title = $(addTitle).val();
      let course = $(addCourse).val();
      let student = $(addStudent).val();

      $("#assignments-per-student-per-course-table tbody")
        .append(`<tr class='table-primary'>
                                <td class='align_middle'>${title}</td>
                                <td class='align_middle'>${course}</td>
                                <td class='align_middle'>${student}</td>     
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
