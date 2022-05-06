var ListOfParrot = document.querySelector('#ListOfParrot');

var API = 'http://localhost:3000/comments'; 


function start(){
    getComments(renderComments);
    handleSubmitform();
}

start();

function createComment(data, callback){
    var options={
        method:'POST',
        headers:{
            'Content-Type': 'appication/json'
        },
        body: JSON.stringify(data)
    };
    fetch(API, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function getComments(callback){
    fetch('http://localhost:3000/comments')
        .then (respone => respone.json())
        .then (callback);
}




function renderComments(comments){
    var ListOfParrot = document.querySelector('#ListOfParrot');
    var htmls=comments.map(function(comment){
        return `
        <li> 
            <h4>
                ${comment.body}
            </h4>
            <p>${comment.postId}</p>
            <button onclick="deleteComment(${comment.body})">Delete</button>
        </li>
        `  
    });
    ListOfParrot.innerHTML=htmls.join('');
}

function  deleteComment(body){
    var options={
        method:'DELETE',
        headers:{
            'Content-Type': 'appication/json'
        },
    };
    fetch(API + '/' + body , options)
        .then(function(response){
            response.json();
        })
        .then(function(){

        });
}


function handleSubmitform(){
    var submitbton=document.querySelector('#Submit');

    submitbton.onclick=function(){
        var body = document.querySelector('input[name="nameofvet"]').value;
        var commentData={
            body: body,
        }

        createComment(commentData, function(){
            getComments(renderComments);
        });
    }
}