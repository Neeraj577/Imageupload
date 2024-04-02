function myValidation() {
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirm_password = document.getElementById('confirm_password');
    var message = document.getElementById("message");
    var erro_message = "";
    console.log("You clicked on submit.");
    var passwordCheck = false;
    var usernameCheck = false;

    var re_alphanum = /^[a-z0-9]+$/;
    if (
        ("a" > username[0] || username[0] > "z") &&
        ("A" > username[0] || username[0] > "Z")
    ) {
        erro_message += "Username must start with a-z or A-Z. <br>";
    } else if (username.length < 3 || !re_alphanum.test(username)) {
        error_message += "Username must have 3 or more alphanumeric char";
    } else {
        usernameCheck = true;
    }
    var re_num = /[0-9]/;
    var re_uppercase = /[A-Z]/;
    var re_specialchar = /[/*-+!@#$^&*]/;
    if (password.length < 8) {
        console.log("I am in length test");
        error_message += "Password must be 8 or more characters.<br>";
    }
    // check at least one number
    else if (!re_num.test(password)) {
        console.log("I am in at leat one number test");
        error_message += "Password must contain at least one number.<br>";
    }
    // check at least one Uppercase letter
    else if (!re_uppercase.test(password)) {
        error_message += "Password must contain at least one Uppercase Letter.";
    }
    // check at least one special char
    else if (!re_specialchar.test(password)) {
        error_message +=
            "Password must contain one special character.(/*-+!@#$^&*).<br>";
    }
    // check both password fields are equal or not
    else if (password !== confirm_password) {
        error_message += "Both Passwords must be same!";
    } else {
        passwordCheck = true;
    }

    if (passwordCheck && usernameCheck) {
        // successfull form submission
        document.getElementById("myForm").submit();
    } else {
        //show error message
        message.innerHTML = error_message;
        message.style.color = "red";
    }
}


function setFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
        }, 50);
    }, 4000);
}
let flashElement = document.getElementById('flash-message');
if (flashElement) {
    setFlashMessageFadeOut();
}