var count = 20;
var marks = 0;

function printFn(){
    var ans= localStorage.getItem("qa" + (cur_question-1));
    // console.log("suk " +ans );
    var buttonvalue=document.getElementById("all_questions");
    
    var fmdata=new FormData(buttonvalue);
    let each;
    for(each of fmdata)
    {
        localStorage.setItem("yourans" + (cur_question-1),each[1]);
        console.log("suk " +each);
        if(each[1]==ans)
        {
            marks=marks+1;
            console.log("sukm " +marks );
            localStorage.setItem("marks", marks)
        }
        localStorage.setItem("marks", marks)
    }
    nextQuestion();
}

function check(){
	Slider.Stop();
    document.getElementById("all_questions").style.visibility = "visible";
	document.getElementById("table1").style.visibility = "visible";
    document.getElementById("table2").style.visibility = "visible";
    var rolnumber =  localStorage.getItem("rollno");
    var count = localStorage.getItem("marks");
    var str='<p>Roll No:</p>' + rolnumber
    str+='<p>Score: </p>' + count

    document.getElementById("all_questions").innerHTML = str;
    var tablestr = "<thead><tr><th scope='col'>Questions</th><th scope='col'>Correct Options</th><th scope='col'>Selected Option</th></tr></thead>";  
            
	for(i=0;i<10;i++){
		var q_no = i + 1;
        var Myanswers =  localStorage.getItem("yourans" + i);
        
        var Correct_Answers = localStorage.getItem("qa" + i);

        tablestr += "<tr>"+
						"<td>" + q_no + "</td>" +
						"<td >" + Correct_Answers + "</td>" + 
						"<td id = 'ans1'>" + Myanswers  + "</td>" +	
					"</tr>";					
	}
	document.getElementById("table1").innerHTML = tablestr;
}
    
    // let myForm = document.getElementById('all_questions');
    // let formData = new FormData(myForm);

    // document.querySelector('all_questions')
    // console.log("suk" + myForm.value);
    

	// var correct = 0;
    // var len=all_questions.length;
	// var length = parseInt(localStorage.getItem("len"));

	// for(var i = 0; i<length;i++){

	// 	var answerno = "options" + i;
	// 	var questionno = "question" + i;
    //     console.log("suk" + questionno);
		
	// 	var ans = localStorage.getItem(answerno);
				
	// 	var givenans=data(questionno);
	// 	localStorage.setItem("givenans"+i,givenans)
	// 	if(ans==givenans){
	// 		correct++;
	// 	}
		
	// }

var all_questions=null;
var cur_question=0;
function getData()
{
    // document.getElementById("question").style.visibility = "visible";
    var xhttp= new XMLHttpRequest();
    xhttp.open("GET","https://raw.githubusercontent.com/ChandaSukesh/QuizAjax/main/jq.json",true);

    xhttp.onreadystatechange=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            all_questions=JSON.parse(this.responseText);
            Slider.Start();
            nextQuestion();
        }
        document.getElementById("question").style.visibility = "hidden";
        
    };
    xhttp.send();
    // document.getElementById("question").style.visibility = "visible";
    // var button = document.getElementById('question');
    // button.style.display = ''
    // document.getElementById("question").style.visibility = "visible"; 
}

function nextQuestion()
{
    // console.log(all_questions);
    question=all_questions[cur_question];
    console.log(all_questions)
    var qa=question.answer
    // console.log(qa);
    localStorage.setItem("qa"+cur_question,qa)
    var question_div='<div class="question">'+ '<div>Q' +(cur_question+0) + ' '+question.question+'</div>';
    question.options.forEach((options,ind)=>
    {
        // id="Q'+(cur_question+1)+'"
        question_div=question_div +'<input   type="radio" value="'+options+'" name ="'+(cur_question)+'"/>' +options+'<br/>';

    });
    question_div=question_div+'</div>';
    question_div=question_div + '<div > <button  class="nextbtnstyle" onclick="printFn();">Next</button></div>';
    document.querySelector("#all_questions").innerHTML=question_div;
    cur_question++;   
}

function store() {
    var givenrollno = document.getElementById("rollno").value;
    localStorage.setItem("rollno", givenrollno);

    var givencourse = document.getElementById("course").value;
    localStorage.setItem("course", givencourse);

    var form = document.getElementById('login');
    form.style.display = 'none';
    document.getElementById("question").style.visibility = "visible";

}

var Slider= {
    slider: null,
    Start: function() {
        this.slider = setInterval(function() {
			document.getElementById('count').innerHTML= "Time Left: " + count;
			count--;
			if (count === 0){
				check()
				clearInterval(this.slider);
				document.getElementById('count').innerHTML='Finshed';
			}
        }, 1000);
    },
    Stop: function() {
        window.clearTimeout(this.slider);
		document.getElementById('count').innerHTML='Done';
    }
};
