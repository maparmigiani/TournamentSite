/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 13th 2022
 * @CourseName Web Application Development SEC005
 */

// IIFE -- Immediate Invoked Function Execution
(function () {

    function Start() {
        console.log("App Started...");

        let dangerButtons = document.querySelectorAll('.btn-danger')

        for (button of dangerButtons)
        {
            button.addEventListener('click', (event) => {
                if (!confirm("Continue to process?"))
                {
                    event.preventDefault();
                    //window.location.assign()
                }
            });
        }

        $("#searchInputField").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#businessContactsTable tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
    }

    window.addEventListener("load", Start);
})();

    // Show Alert and Redirect to Home Page After Pressing OK
    function ShowAlert() {
        if (confirm("Message sent. Thanks for contacting me. I will reply you soon.") == true) {
            window.location.href = "/";
        }
    }

    // Enable the user to show or hide the password
    function ShowHidePassword() {
        var x = document.getElementById("passwordTextField");
        var show_eye = document.getElementById("show_eye");
        var hide_eye = document.getElementById("hide_eye");
        
        if (x.type === "password") {
          x.type = "text";
          show_eye.classList.remove("d-none");
          hide_eye.classList.add("d-none");
          //show_eye.style.display = "none";
          //hide_eye.style.display = "block";
        } else {
          x.type = "password";
          show_eye.classList.add("d-none");
          hide_eye.classList.remove("d-none");
          //show_eye.style.display = "block";
          //hide_eye.style.display = "none";
        }
      }