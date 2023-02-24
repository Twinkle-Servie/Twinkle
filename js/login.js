function login() {

    var id = document.querySelector('#id');
    var pw = document.querySelector('#pw');

    if(id.value =="" || pw.value == "") {
        alert("로그인 불가능")
    }
    else {
        location.href = "mypost.html"
    }


    
}