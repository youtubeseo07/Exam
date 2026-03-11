let questions = [];

function generate(){

questions = [];

for(let i=1;i<=50;i++){

questions.push({
q:"Sample Question "+i+" ?",
a:[
"Option A",
"Option B",
"Option C",
"Option D"
],
c:Math.floor(Math.random()*4)
});

}

showQuiz();
startTimer();

}

function showQuiz(){

let html="";

questions.forEach((q,i)=>{

html+=`
<div class="question">

<p>${i+1}. ${q.q}</p>

<label><input type="radio" name="q${i}" value="0">${q.a[0]}</label><br>

<label><input type="radio" name="q${i}" value="1">${q.a[1]}</label><br>

<label><input type="radio" name="q${i}" value="2">${q.a[2]}</label><br>

<label><input type="radio" name="q${i}" value="3">${q.a[3]}</label>

</div>
`;

});

document.getElementById("quiz").innerHTML = html;

}

function submitQuiz(){

let score = 0;

questions.forEach((q,i)=>{

let ans = document.querySelector(`input[name="q${i}"]:checked`);

if(ans && ans.value == q.c){
score++;
}

});

document.getElementById("result").innerText =
"Score: "+score+" / "+questions.length;

}

function startTimer(){

let time = 1800;

let timer = setInterval(()=>{

let min = Math.floor(time/60);
let sec = time%60;

document.getElementById("timer").innerText =
"Time: "+min+":"+sec;

time--;

if(time<=0){

clearInterval(timer);
submitQuiz();

}

},1000);

}

function downloadPDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let y = 10;

questions.forEach((q,i)=>{

doc.text((i+1)+". "+q.q,10,y);

y+=10;

q.a.forEach(opt=>{

doc.text("- "+opt,15,y);

y+=8;

});

y+=5;

});

doc.save("mcq_exam.pdf");

}
