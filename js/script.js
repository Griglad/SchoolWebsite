$(document).ready(function () {
  //Courses
  let addCourseTitleError = "#add-course-title-error";
  let addTypeError = "#add-type-error";

  let editCourseTitleError = "#edit-course-title-error";
  let editTypeError = "#edit-type-error";

  let addCourseTitle = "#addCourseTitle";
  let addType = "#addType";

  let editCourseTitle = "#editCourseTitle";
  let editType = "#editType";
  //Trainers
  let addFirstNameError = "#add-first-name-error";
  let addLastNameError = "#add-last-name-error";
  let addSubjectError = "#add-subject-error";

  let editFirstNameError = "#edit-first-name-error";
  let editLastNameError = "#edit-last-name-error";
  let editSubjectError = "#edit-subject-error";

  let addFirstName = "#addFirstName";
  let addLastName = "#addLastName";
  let addSubject = "#addSubject";

  let editFirstName = "#editFirstName";
  let editLastName = "#editLastName";
  let editSubject = "#editSubject";

  //Students
  let addDateOfBirth = "#addDateOfBirth";
  let addTuitionFees = "#addTuitionFees";
  let editDateOfBirth = "#editDateOfBirth";

  //Assignments
  let addAssignTitleError = "#add-assign-title-error";
  let addDescrError = "#add-description-error";
  let addAssignTitle = "#addAssignTitle";
  let addDescription = "#addDescription";


  let editAssignTitleError = "#edit-assign-title-error";
  let editDescrError = "#edit-description-error";
  let editAssignTitle = "#editAssignTitle";
  let editDescription = "#editDescription";



  hideErrors();

  $(addCourseTitle).keyup(() => {
    checkElement(addCourseTitle, addCourseTitleError);
  });

  $(addType).keyup(() => {
    checkElement(addType, addTypeError);
  });

  $(editCourseTitle).keyup(() => {
    checkElement(editCourseTitle, editCourseTitleError);
  });

  $(editType).keyup(() => {
    checkElement(editType, editTypeError);
  });

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
    $(addCourseTitleError).hide();
    $(addTypeError).hide();
    $(editCourseTitleError).hide();
    $(editTypeError).hide();
    $(editFirstNameError).hide();
    $(editLastNameError).hide();
    $(editSubjectError).hide();
    $(addAssignTitleError).hide();
    $(addDescrError).hide();
    $(editAssignTitleError).hide();
    $(editDescrError).hide();
    
  }

  function checkElement(column, error) {
    let pattern = /^[A-Za-z]+$/;
    let col = $(column).val();
    let bool_flag = pattern.test(col);
    if (bool_flag) {
      $(error).hide();
      $(column).val(function () {
        return this.value.toUpperCase();
      });
    } else {
      $(error).show().html("Should contain only characters!");
    }
  }

  $.validator.addMethod(
    "date_equals_or_greater_than_today",
    function (value, element) {
      var currentDate = new Date();
      var selectedDate = new Date(value);
      return currentDate <= selectedDate;
    },
    "You cannot select a shorter or today's date."
  );

  $("#add_new_course").validate({
    rules: {
      addCourseTitle: {
        required: true,
        minlength: 5,
      },
      addType: {
        required: true,
        minlength: 5,
      },

      addStartDate: {
        date_equals_or_greater_than_today: "#addStartDate",
      },
      addEndDate: {
        date_equals_or_greater_than_today: "#addEndDate",
      },
      editStartDate: {
        date_equals_or_greater_than_today: "#editStartDate",
      },
      editEndDate: {
        date_equals_or_greater_than_today: "#editEndDate",
      },
    },
  });

  $("#add_new_trainer").validate({
    rules: {
      addFirstName: {
        required: true,
        minlength: 3,
      },
      addLastName: {
        required: true,
        minlength: 5,
      },
      addSubject: {
        required: true,
        minlength: 5,
      },
    },
  });

  $("#edit_course").validate({
    rules: {
      editCourseTitle: {
        required: true,
        minlength: 5,
      },
      editType: {
        required: true,
        minlength: 5,
      },
      editStartDate: {
        date_equals_or_greater_than_today: "#editStartDate",
      },
      editEndDate: {
        date_equals_or_greater_than_today: "#editEndDate",
      },
    },
  });

  $("#edit_trainers").validate({
    rules: {
      editFirstName: {
        required: true,
        minlength: 3,
      },
      editLastName: {
        required: true,
        minlength: 5,
      },
      editSubject: {
        required: true,
        minlength: 5,
      },
    },
  });

  $.validator.addMethod(
    "check_for_valid_date",

    function (value, element) {
      let today = new Date();
      let minDate = Date.parse("01/01/2010");
      let maxDate = Date.parse("01/01/2015");
      let DOB = Date.parse(value);
      if (DOB <= today && DOB >= minDate && DOB <= maxDate) {
        return true;
      }
      return false;
    },
    `Not a valid Date please select a date from 2010 to 2015 `
  );

  $("#add_new_student").validate({
    rules: {
      addFirstName: {
        required: true,
        minlength: 3,
      },
      addLastName: {
        required: true,
        minlength: 4,
      },
      addDateOfBirth: {
        check_for_valid_date: addDateOfBirth,
      },
    },
  });

  $("#edit_students").validate({
    rules: {
      editFirstName: {
        required: true,
        minlength: 3,
      },
      editLastName: {
        required: true,
        minlength: 5,
      },
      editSubject: {
        required: true,
        minlength: 5,
      },
      editDateOfBirth: {
        check_for_valid_date: editDateOfBirth,
      },
    },
  });

  function clearModal() {
    $(".modal").on("hidden.bs.modal", function () {
      $(this).find("form")[0].reset();
    });
  }

  $(".close").click(function () {
    hideErrors();
    clearModal();
  });

  function addInCoursesTable() {
    if ($("#add_new_course").valid()) {
      let courseTitle = $("#addCourseTitle").val();
      let courseType = $("#addType").val();
      let startDate = $("#addStartDate").val();
      let endDate = $("#addEndDate").val();

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

      $("#add").modal("hide");

      function clearModal() {
        $(".modal").on("hidden.bs.modal", function () {
          $(this).find("form")[0].reset();
        });
      }
    }
  }

  function addInTrainersTable() {
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

      $("#add").modal("hide");

      $(".modal").on("hidden.bs.modal", function () {
        $(this).find("form")[0].reset();
      });
    }
  }

  function addInStudentsTable() {
    if ($("#add_new_student").valid()) {
      let firstName = $(addFirstName).val();
      let lastName = $(addLastName).val();
      let datebirth = $(addDateOfBirth).val();
      let tuitionFees = $(addTuitionFees).val();

      console.warn(datebirth, tuitionFees);

      $("#students-table tbody").append(`<tr class='table-primary'>
                          <td class='align-middle'>${firstName}</td>
                          <td class='align-middle'>${lastName}</td>
                          <td class='align-middle'>${datebirth}</td>     
                          <td class='align-middle'>${tuitionFees}</td>    
                          <td>
                          <button type="button" class="btn
                                  btn-outline-primary btn-sm" data-toggle="modal" data-target="#edit">
                              Edit
                          </button>
                          </td>
                          </tr>`);

      $("#add").modal("hide");

      $(".modal").on("hidden.bs.modal", function () {
        $(this).find("form")[0].reset();
      });
    }
  }

  $("#save-courses-button").click(function () {
    addInCoursesTable();
  });

  $("#save-trainers-button").click(function () {
    console.warn("Button was pressed");
    addInTrainersTable();
  });
  $("#save-students-button").click(function () {
    console.warn("Button was pressed");
    addInStudentsTable();
  });

  /*
  $("#courses-table").click(function () {
    let $row = $("#courses-table").find("tr");
    console.log($row.length);

    $row.find("td").each(function (index, el) {
      console.log(el);
    });
  });
 */
});
