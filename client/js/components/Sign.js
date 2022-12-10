var IS_SIGN_IN_ENABLED = false;

export const start = (socket) => {
    var signDiv = document.querySelector('#signDiv');
    var signDivUsername = document.querySelector('#signDiv-username');
    var signDivSignIn = document.querySelector('#signDiv-signIn');
    var signDivSignUp = document.querySelector('#signDiv-signUp');
    var signDivPassword = document.querySelector('#signDiv-password');

    if (IS_SIGN_IN_ENABLED) {
        signDivSignIn.onclick = function () {
            socket.emit('signIn', {
                username: signDivUsername.value,
                password: signDivPassword.value
            })
        }
    } else {
        socket.emit('signIn', {});
    }

    signDivSignUp.onclick = function () {
        socket.emit('signUp', {
            username: signDivUsername.value,
            password: signDivPassword.value
        })
    }

    socket.on('signInResponse', function (data) {
        if (data.success) {
            signDiv.style.display = 'none';
            gameDiv.style.display = 'block';
        } else 
            alert('Non vai!');
    });
    
    socket.on('signUpResponse', function (data) {
        if (data.success) {
            alert('Yeah!');
        } else 
            alert('Non vai!');
    });
}
