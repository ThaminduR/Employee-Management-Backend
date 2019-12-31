let password;

let passwordCommenter = function (){

    let divi = document.querySelector("#password");
    divi.addEventListener("input",function(text){
        password = text.target.value;
        if(text.target.value.length<8){
            document.querySelector("#password-comment1").innerHTML="";
            document.querySelector("#password-comment2").innerHTML="";
            const comment = document.createElement('p');
            comment.textContent="Weak Password";
            document.querySelector("#password-comment1").appendChild(comment);
            
        }
        else{
            document.querySelector("#password-comment1").innerHTML="";
            document.querySelector("#password-comment2").innerHTML="";
            const comment = document.createElement('p');
            comment.textContent="Strong Password";
            document.querySelector("#password-comment2").appendChild(comment);
            
        }
        
    })
}

let passwordConfirmChecker = function (){

    let condivi = document.querySelector("#con-password");
    condivi.addEventListener("change",function(text){
        let conpassword = text.target.value;
        if(conpassword != password){
            document.querySelector("#con-password-comment").innerHTML="";
            const comment = document.createElement('p');
            comment.textContent="Passwords do not match";
            document.querySelector("#con-password-comment").appendChild(comment);
            
        }
        else{
            document.querySelector("#con-password-comment").innerHTML="";

        }
        
    })
}

passwordCommenter();
passwordConfirmChecker();