



$(document).ready(function(){

    var select = document.getElementById("select")
    var submit_btn = document.getElementById("submitbtn")
    var subjects = document.querySelectorAll(".subjectsrad")
    var maindiv = document.getElementById("main-div")
    var maindiv2 = document.getElementById("main-div2")
    var maindiv3 = document.getElementById("main-div3")
    var maindiv4 = document.getElementById("main-div4")
    var viewresultdiv = document.getElementById("resultdiv")
    var answerdiv = document.getElementById("answerdiv")


    var duration = 0
    maindiv2.hidden = true
    maindiv3.hidden = true
    maindiv4.hidden = true
    let sub_selected
    subjects.forEach((subject)=>{
        subject.addEventListener('click' , function(){
            sub_selected = subject.value;
            submit_btn.disabled = false
        })
    })
    submit_btn.disabled = true
    submit_btn.addEventListener('click' , function(){
        duration = Number(select.value)
        console.log(typeof duration)
        console.log(duration)
        maindiv.hidden = true
        maindiv2.hidden = false


//console.log(jsondata[1])
var position = 0
var score = 0
let data = [
    {question: "<p class='question' id='question'>What is Your Name</p>",
    options: {
        A: "<p class='inline'>Gideon Ozuluoha</p>",
        B: "<p class='inline'>Khadeejat Abdulmaleek</p>",
        C: "<p class='inline'>Frankie Jordans</p>",
        D: "<p class='inline'>Ezekiel Lambert</p>"
    },
    img: null,
    answer: "A"},
    {question: "<p class='question' id='question'>What is the Name of The president of United States Of America</p>",
    options: {
        A: "<p class='inline'>Donald Trump</p>",
        B: "<p class='inline'>Barrack Obama</p>",
        C: "<p class='inline'>Frankie White</p>",
        D: "<p class='inline'>Danny Whizbang</p>"
    },
    img: null,
    answer: "A"},
    {question: "<p class='question' id='question'>How Many States Are in Nigeria Nigeria</p>",
    options: {
        A: "<p class='inline'>26</p>",
        B: "<p class='inline'>16</p>",
        C: "<p class='inline'>35</p>",
        D: "<p class='inline'>36</p>"
    },
    img: null,
    answer: "D"},
    {question: "<p class='question' id='question'>Who is the Current President Of Nigeria</p>",
    options: {
        A: "<p class='inline'>Muhammadu Buhari</p>",
        B: "<p class='inline'>Goodluck Ebele Jonathan</p>",
        C: "<p class='inline'>Ibrahim Badamasi Babangida</p>",
        D: "<p class='inline'>Olusegun Obasanjo</p>"
    },
    img: null,
    answer: "A"},
    {question: "<p class='question' id='question'>What is a Noun</p>",
    options: {
        A: "<p class='inline'>An action word</p>",
        B: "<p class='inline'>A name of person, animal, place or things</p>",
        C: "<p class='inline'>A word used to describe myself</p>",
        D: "<p class='inline'>A word used to describe someone that really close to you</p>"
    },
    img: null,
    answer: "B"},
    {question: "<p class='question' id='question'>What is a verb</p>",
    options: {
        A: "<p class='inline'>A name of person, animal, place or things</p>",
        B: "<p class='inline'>An action word</p>",
        C: "<p class='inline'>A word used to describe myself</p>",
        D: "<p class='inline'>A word used to describe someone that really close to you</p>"
    },
    img: null,
    answer: "B"}
]


var qdiv = document.getElementById("questiondiv")
var optionsdiv = document.getElementById("optionsdiv")
var navqstns = document.getElementById("navqstns")
var positiondiv = document.getElementById("positiondiv")
var item = data[position]
var nextbtn = document.getElementById("next")
var prevbtn = document.getElementById("prev")
var infoPanel = document.getElementById("info-panel")
var timebtn = document.getElementById("timebtn")
//timebtn.disabled = true
// handling time countdown
positiondiv.innerHTML = `<button class="btn btn-info p-3" >Question: 1</button>`
const datenow = new Date()
const launchDate = datenow
launchDate.setMinutes(datenow.getMinutes() + duration)
const intvl = setInterval(() => {
    // Get todays date and time (ms)
    const now = new Date().getTime();

    // Distance from now and the launch date (ms)
    const distance = launchDate - now;

    // Time calculation
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //console.log(`hours: ${hours} mins: ${mins} seconds: ${seconds}`)
    timebtn.textContent = `${hours}:${mins}:${seconds}`
    if (hours == 0 && mins== 0 && seconds == 0){
        console.log("time out")
        clearInterval(intvl);
        timebtn.textContent = `Time elapsed`
        resultMarker()
    }
})
// adding nav buttons to the navqstns div in order to redirect to each question based on click
var navbtnshtml = ''
for(i=1; i<=data.length; i++){
    //console.log(i)
    navbtnshtml += `<button class="navqstnsbtn" id=${i}>${i}</button>`
}
navqstns.innerHTML = navbtnshtml

// assigning event listener to all navigation buttons
let navqstnsbtn = document.querySelectorAll(".navqstnsbtn")
navqstnsbtn.forEach((btn)=>{
    btn.addEventListener('click', function(){
        let btn_id = btn.id
        //console.log(btn_id)
        goto(btn_id)
    })
})


nextbtn.addEventListener('click', nextAction)
prevbtn.addEventListener('click', prevAction)
infoPanel.innerHTML = `<button class="btn btn-outline-info" id="submit" type="button">Submit Exam</button><button class="btn btn-info" type="button" id="infobtn">Answered: 0/${data.length}</button>`
qdiv.innerHTML=`<p class="question" id="question">${item.question}</p>`
optionsdiv.innerHTML = `<div id="1"><input class="select" type="radio" value="${item.options.A}" id="A" name="options">
<label for="1">${item.options.A}</label><br></div>
<div id="2"><input class="select" type="radio" value="${item.options.B}" id="B" name="options">
<label for="2">${item.options.B}</label><br></div>
<div id="3"><input class="select" type="radio" value="${item.options.C}" id="C" name="options">
<label for="3">${item.options.C}</label><br></div>
<div id="4"><input class="select" type="radio" value="${item.options.D}" id="D"  name="options">
<label for="3">${item.options.D}</label><br></div>`

//console.log(position)
var submitbtn = document.getElementById("submit")
submitbtn.addEventListener('click', resultMarker)

function countQuestions(){
    q_count = data.length
    return q_count;
}



var checkedObject = {}

function updateEventListener(showAnswer=false){
    console.log('update has been run')
    submitbtn.addEventListener('click', resultMarker)
    let radiobtns = document.querySelectorAll(".select")
    radiobtns.forEach((btn)=>{
        btn.addEventListener('click', function(){
            console.log('radio has been clicked')
            let question_id = (position + 1)
            //console.log(typeof question_id)
            let btn_id = btn.id
            //console.log(btn_id)
            checkedObject[question_id] = btn_id
            console.log(checkedObject)
            infoPanel.innerHTML = `<button class="btn btn-outline-info" id="submit" type="button">Submit Exam</button>
            <button class="btn btn-info" id="infobtn" disabled>Answered: ${Object.keys(checkedObject).length }/${data.length}</button>`
            let submitbtn = document.getElementById("submit")
            submitbtn.addEventListener('click', resultMarker)

            //console.log(checkedObject)
            if(data[question_id-1].answer == btn_id){
                //console.log("correct")
            }
            else{
                //console.log("not correct")
            }
            //console.log(data[question_id-1].answer)
        })
    })
    if(showAnswer == true){
        $("#submit").text("Go Back")
        $("#submit").bind('click', function(){
            location.reload(true)
        })
        //$("#submit").prop("disabled", true)
        //let s = $("input.select")
        //console.log(s)
        $("input.select").each(function(){
            $(this).prop("disabled", true)
        })
    }

}
updateEventListener()

// the function that handles the calculation of scores on submission or timeout
function resultMarker(){
    clearInterval(intvl)
    let answered = Object.keys(checkedObject).length
    let check_keys = Object.keys(checkedObject)
    check_keys.forEach((k)=>{
        let val = checkedObject[k]
        //console.log(val)
        if (data[k-1].answer == val){
            score = score + 1
        }
        else{
            // do nothing
        }

    })
    console.log(score)
    maindiv2.hidden = true
    maindiv3.hidden = false
    viewresultdiv.innerHTML = `<p class="stylep">Exam Completed!!!</p>
    <p class="subjectname"> ${sub_selected}</p>
    <p>You Scored: <b>${score}/${data.length}<b></p>

    <div class="retrydiv">
    <button class="btn btn-sm btn-outline-dark" id="retrybtn"> Retry</button>
    <button class="btn btn-sm  btn-outline-dark" id="correctbtn">View Correction</button>
    <button class="btn btn-sm btn-outline-dark" id="backbtn"> Go Back</button>

    </div>
    `

    let correctbtn = document.getElementById("correctbtn")
    let retrybtn = document.getElementById("retrybtn")
    let gobackbtn = document.getElementById("backbtn")
    //console.log(correctbtn)
    gobackbtn.addEventListener('click', function(){
        location.reload(true)
    })
    retrybtn.addEventListener('click', function(){
        location.reload(true)
    })
    //correctbtn.addEventListener('click', correction)
    correctbtn.addEventListener('click', function(){
        maindiv3.hidden = true
        maindiv2.hidden = false
        goto(1, true)
        navqstnsbtn.forEach((btn)=>{
            btn.addEventListener('click', function(){
                let btn_id = btn.id
                //console.log(btn_id)
                goto(btn_id, true)
                console.log(submitbtn)
            })
        })

        nextbtn.addEventListener('click', nextAction.bind(null, true))
        prevbtn.addEventListener('click', prevAction.bind(null, true))
        //submitbtn.disabled = true

    })

}

function idToAlpha(id){
    if (id=="A"){
        return "one"
    }
    else if(id =="B"){
        return "two"
    }
    else if(id =="C"){
        return "three"
    }
    else if(id == "D"){
        return "four"
    }
    else{
        console.log("no id presented")
    }
}

// a function to view all questions with thier answers displayed with necessary explanations
function correction(){
    console.log('correct just ran')
    maindiv4.hidden = false
    maindiv3.hidden = true
    maindiv2.hidden = false
    $("#main-div").remove()
    $("#main-div2").remove()
    $("#main-div3").remove()
    for(i=0; i< data.length; i++){
        let ans = data[i].answer
        let id_num = idToIndex(ans)
        let id_alpha = idToAlpha(ans)

        $("#answerdiv").append(`<div class="col-12 p-4 mt-4 bg-light">
        <div><p class="question" id="question">${data[i].question}</p></div>
        <div>
            <div id="one" class="ans"><input class="select ans" type="radio" value="${data[i].options.A}" id="A" name="options" disabled>
            <label for="1">${data[i].options.A}</label><br></div>
            <div id="two" class="ans"><input class="select ans" type="radio" value="${data[i].options.B}" id="B" name="options" disabled>
            <label for="2">${data[i].options.B}</label><br></div>
            <div id="three" class="ans"><input class="select ans" type="radio" value="${data[i].options.C}" id="C" name="options" disabled>
            <label for="3">${data[i].options.C}</label><br></div>
            <div id="four" class="ans"><input class="select ans" type="radio" value="${data[i].options.D}" id="D"  name="options" disabled>
            <label for="3">${data[i].options.D}</label><br></div>

        </div>

        </div> `

        )
        //let targ = $(`input#${ans}`)
        //console.log(targ)
        //console.log($(`div.ans#${id_alpha}:eq(${i})`).text())
        $(`div.ans#${id_alpha}:eq(${i})`).css("background-color", "#32CD32")
        //$(`input#${ans}`).css("background-color", "green")
        //$(`div#${idToIndex(i.id)}`).css("background-color", "green")
    }
    console.log(checkedObject)

}

`<p class="question" id="question">${item.question}</p>`
optionsdiv.innerHTML = `<div id="1"><input class="select" type="radio" value="${item.options.A}" id="A" name="options">
<label for="1">${item.options.A}</label><br></div>
<div id="2"><input class="select" type="radio" value="${item.options.B}" id="B" name="options">
<label for="2">${item.options.B}</label><br></div>
<div id="3"><input class="select" type="radio" value="${item.options.C}" id="C" name="options">
<label for="3">${item.options.C}</label><br></div>
<div id="4"><input class="select" type="radio" value="${item.options.D}" id="D"  name="options">
<label for="3">${item.options.D}</label><br></div>`




// a function that converts id i.e alphabet A,B,C,D to integers i.e 1,2,3,4
function idToIndex(id){
    if (id=="A"){
        return 1
    }
    else if(id =="B"){
        return 2
    }
    else if(id =="C"){
        return 3
    }
    else if(id == "D"){
        return 4
    }
    else{
        console.log("no id presented")
    }
}

function saveChecked(index, showAnswer = false){
    console.log("save just ran")
    if(index in checkedObject){
        selectedRadId = checkedObject[index]
        //console.log(selectedRadId)
        //
        let i = document.querySelector(`input[id=${selectedRadId}]`)
        //console.log(checkedObject[index])
        //console.log(data[index-1].answer)

        i.checked = true;


        //console.log(d)
        if(showAnswer == true){
            if (checkedObject[index] == data[index-1].answer){
                $(`div#${idToIndex(i.id)}`).css("background-color", "green")
            }
            else{
                $(`div#${idToIndex(i.id)}`).css("background-color", "red")
            }
            $(`div#${idToIndex(data[index-1].answer)}`).css("background-color", "green")
        }
    }
    if(showAnswer == true){
        $(`div#${idToIndex(data[index-1].answer)}`).css("background-color", "green")
    }


}



function goto(index, showAnswer = false){
    //console.log(`index: ${index}`)


    position = index-1
    let item = data[position]
    qdiv.innerHTML=`<p class="question" id="question">${item.question}</p>`
    positiondiv.innerHTML = `<button class="btn btn-info p-3" >Question: ${index}</button>`
    optionsdiv.innerHTML = `<div id="1"><input class="select" type="radio" value="${item.options.A}" id="A" name="options">
    <label for="1">${item.options.A}</label><br></div>
    <div id="2"><input class="select" type="radio" value="${item.options.B}" id="B" name="options">
    <label for="2">${item.options.B}</label><br></div>
    <div id="3"><input class="select" type="radio" value="${item.options.C}" id="C" name="options">
    <label for="3">${item.options.C}</label><br></div>
    <div id="4"><input class="select" type="radio" value="${item.options.D}" id="D"  name="options">
    <label for="3">${item.options.D}</label><br></div>`
    //console.log(position)
    saveChecked(index, showAnswer)
    updateEventListener(showAnswer)
    if(showAnswer == true){
        console.log("button will be disabled")
        //$("#submit").prop("disabled", true)
        console.log(submitbtn)
    }
}

function nextAction(showAnswer = false){


    let q_count = countQuestions()

    if (position == (q_count - 1)){
        //console.log(q_count)
        position = (q_count - 1)
    }
    else{
        position = position + 1

    }
    goto(position + 1, showAnswer)
    /*
    var item = data[position]
    qdiv.innerHTML=`<p class="question" id="question">${item.question}</p>`
    optionsdiv.innerHTML = `<input class="select" type="radio" value="${item.options.A}" id="A" name="options">
    <label for="1">${item.options.A}</label><br>
    <input class="select" type="radio" value="${item.options.B}" id="B" name="options">
    <label for="2">${item.options.B}</label><br>
    <input class="select" type="radio" value="${item.options.C}" id="C" name="options">
    <label for="3">${item.options.C}</label><br>
    <input class="select" type="radio" value="${item.options.D}" id="D" name="options">
    <label for="3">${item.options.D}</label><br>`
    //console.log(position)
    updateEventListener()
    let index=position + 1
    saveChecked(index)       */
}


function prevAction(showAnswer = false){

    if (position == 0){
        position = 0
    }
    else{
    position = position - 1

    }
    goto(position + 1, showAnswer)
    //console.log(position)
    //updateEventListener()
    //let index=position + 1
    //saveChecked(index)

}


})

})

