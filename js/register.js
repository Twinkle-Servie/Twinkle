function check_pw() {
    var pw = document.querySelector("#pw").value;
    var check_pw = document.querySelector("pwd_check").value;

    if(pw!=check_pw){
        document.getElementById('pw_check_msg').innerHTML= "비밀번호가 다릅니다.";

    }else {
        document.getElementById("pw.check_msg").innerHTML="";

    }
    if(check_pw=="") {
        document.getElementById("pw.check_msg").innerHTML = "";
    }

}

function checked() {
//폼 제출시 마지막 유효성 테스트

var pw = document.querySelector("pw");
var check_pw = document.querySelector("pwd_check");

if (pw.value != check_pw.value) {
    alert("비밀번호가 일치하지 않습니다. 확인해주 세요.");
    return false;
}

else{
    return true;
}

}
