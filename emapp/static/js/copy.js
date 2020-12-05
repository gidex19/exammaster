
$(document).ready(function(){


    /* var jsondata = $.getJSON('/english.json/', function(data){
       console.log(data)
       }) */
    console.log("copy.js now in use")
    var select = document.getElementById("select")
    var submit_btn = document.getElementById("submitbtn")
    var subjects = document.querySelectorAll(".subjectsrad")
    var maindiv = document.getElementById("main-div")
    var maindiv2 = document.getElementById("main-div2")
    var maindiv3 = document.getElementById("main-div3")
    var maindiv4 = document.getElementById("main-div4")
    var viewresultdiv = document.getElementById("resultdiv")
    var answerdiv = document.getElementById("answerdiv")
    var input_sub_url = document.getElementById("#sub_url")
    var sub_url = $("#sub_url").attr("data-url")
    var input_static_url = document.getElementById("#static_url")
    var static_url = $("#static_url").attr("data-url")
    var n = "//" + static_url
    console.log(static_url)

    var jsondata = $.getJSON(n, function(data){
       console.log(data)
       })

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
    {question: "<p class='question' id='question'>Which of the following is NOT a characteristic of the parliamentary system of government?</p>",
    options: {
        A: "<p class='inline'>Ministers are usually members of parliament</p>",
        B: "<p class='inline'>The Prime Minister is politically responsible to the parliament</p>",
        C: "<p class='inline'>The Head of State is the powerful organ of government</p>",
        D: "<p class='inline'>The Head of Government may advise the Head of State to dissolve parliament</p>"
    },
    img: null,
    answer: "C",
    img: null,
    explanation: `<p class="small">Defining characteristics of the parliamentary system are the supremacy of the legislative branch within the three functions of government—executive, legislative,
     and judicial—and blurring or merging of the executive and legislative functions</p>`},
     {question: "<p class='question' id='question'>Capitalism is an economic system in which</p>",
    options: {
        A: "<p class='inline'>the economy of the State is centrally planned and controlled</p>",
        B: "<p class='inline'>Private persons are permitted to undertake enterprises</p>",
        C: "<p class='inline'>accumulatation of private property is forbidden</p>",
        D: "<p class='inline'>all big industries and the land are publicly owned for the common good</p>"
    },
    img: null,
    answer: "B",
    img: null,
    explanation: `<p class="small">Capitalism is an economic system in which private individuals or businesses
    own capital goods. The production of goods and services is based on supply and demand in the general market—known as a market
     economy—rather than through central planning—known as a planned economy or command economy</p>`},

     {question: "<p class='question' id='question'> The process of depriving persons of the right of voting is called...</p>",
    options: {
        A: "<p class='inline'>enfranchisement</p>",
        B: "<p class='inline'>Disqualification</p>",
        C: "<p class='inline'>Prohibition</p>",
        D: "<p class='inline'>Disenfranchisement</p>"
    },
    img: null,
    answer: "D",
    img: null,
    explanation: `<p class="small"> Disfranchisement (also called disenfranchisement) or voter disqualification is the revocation of suffrage (the right to vote) of a person or group of people,
     or a practice that has the effect of preventing a person exercising the right to vote.</p>`},

     {question: "<p class='question' id='question'> Bicameralism refers to</p>",
     options: {
         A: "<p class='inline'> a one chamber legislature </p>",
         B: "<p class='inline'> the process of voting in the legislature </p>",
         C: "<p class='inline'> the upper chamber in a legislature </p>",
         D: "<p class='inline'> a two chamber legislature </p>"
     },
     img: null,
     answer: "D",
     img: null,
     explanation: `<p class="small">A bicameral legislature has legislators in two separate assemblies, chambers, or houses. Bicameralism is distinguished from unicameralism, in which all members deliberate and vote as a single group,
      and from some legislatures that have three or more separate assemblies, chambers, or houses</p>`},

      {question: "<p class='question' id='question'> The principle of the separation of powers implies that the three main organs of government work </p>",
      options: {
          A: "<p class='inline'>Separately</p>",
          B: "<p class='inline'> independently but cooperatively</p>",
          C: "<p class='inline'>against one another</p>",
          D: "<p class='inline'>reluctantly and gradually for the executive</p>"
      },
      img: null,
      answer: "B",
      img: null,
      explanation: `<p class="small">The separation of powers is a constitutional principle introduced to ensure that the three major institutions of the state namely; the legislative, the executive and the judiciary are not
      concentrated in any single body whether in functions, personnel or powers</p>`},

      {question: "<p class='question' id='question'>The main function of the judiciary is to</p>",
      options: {
          A: "<p class='inline'>serve as the watchdog of executive</p>",
          B: "<p class='inline'>enact laws</p>",
          C: "<p class='inline'> execute the laws of the land</p>",
          D: "<p class='inline'>interpret the laws</p>"
      },
      img: null,
      answer: "D",
      img: null,
      explanation: `<p class="small"> The main function of the Judiciary is to adjudicate and to interpret Acts of Parliament and the common law. Additionally the Judiciary has the power to issue out
       orders or directives as may be necessary to ensure law, peace and order is maintained. </p>`},

       {question: "<p class='question' id='question'>A totalitarian government is</p>",
    options: {
        A: "<p class='inline'>government that aspires to control every aspect of a citizens life</p>",
        B: "<p class='inline'>a government of the people by the people, and for the people</p>",
        C: "<p class='inline'>a government masses</p>",
        D: "<p class='inline'> a weak government</p>"
    },
    img: null,
    answer: "A",
    img: null,
    explanation: `<p class="small">Totalitarianism is a concept for a form of government or political system that prohibits opposition parties, restricts individual opposition to the state
     and its claims, and exercises an extremely high degree of control over public and private life.</p>`}

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
    correctbtn.addEventListener('click', correction)
    /* correctbtn.addEventListener('click', function(){
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

    }) */

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
console.log('correct just ran now')
    maindiv4.hidden = false
    maindiv3.hidden = true
    maindiv2.hidden = false
    $("#main-div").remove()
    $("#main-div2").remove()
    $("#main-div3").remove()
    for(i=0; i< data.length; i++){
        let current_index = i + 1
        let ans = data[i].answer
        let id_num = idToIndex(ans)
        let id_alpha = idToAlpha(ans)

        $("#answerdiv").append(`<div class="col-12 p-4 mt-4 bg-light">
        <div class="bg-white p-3" ><p class="question" id="question">${data[i].question}</p></div>
        <div>
            <div id="one" class="ans"><input class="select ans" type="radio" value="${data[i].options.A}" id="A" name="options">
            <label for="1">${data[i].options.A}</label><br></div>
            <div id="two" class="ans"><input class="select ans" type="radio" value="${data[i].options.B}" id="B" name="options">
            <label for="2">${data[i].options.B}</label><br></div>
            <div id="three" class="ans"><input class="select ans" type="radio" value="${data[i].options.C}" id="C" name="options">
            <label for="3">${data[i].options.C}</label><br></div>
            <div id="four" class="ans"><input class="select ans" type="radio" value="${data[i].options.D}" id="D"  name="options">
            <label for="3">${data[i].options.D}</label><br></div>
            <div>
            <a href="#collapseExp-${i}" class="btn btn-sm btn-outline-info mt-3" data-toggle="collapse">Explanations</a>
            </div>
            <div class="collapse mt-2" id="collapseExp-${i}">
                    <div class="card card-body">
                        <p class="small">
                            ${data[i].explanation}
                        </p>
                    </div>
                </div>

        </div>

        </div> `

        )
        //let targ = $(`input#${ans}`)
        //console.log(targ)
        //console.log($(`div.ans#${id_alpha}:eq(${i})`).text())
        $(`div.ans#${id_alpha}:eq(${i})`).css("background-color", "#32CD32")
        if(current_index in checkedObject){
            // id_choosen is the id of the radio button selected
            // this id which is an alphabet is then converted to a spelt id using idToAlpha
            // and then the div with the id is coloured red to prove
            let id_chosen = checkedObject[current_index]
            let id_alpha_chosen = idToAlpha(id_chosen)
            if(id_chosen == ans){
                $(`div.ans#${id_alpha_chosen}:eq(${i})`).css("background-color", "#32CD32")
                }
            else{
                $(`div.ans#${id_alpha_chosen}:eq(${i})`).css("background-color", "#ffcccb")
            }

        }
    }
    /*$("#answerdiv").append(`<div class="col-12 p-4 mt-4 bg-light text-center">
    <div><p class="small text-capitalize">Subscribe to be able to attempt CBT and view corrections for a wider range of questions</p></div>
    <div><a href="${sub_url}" class="btn btn-sm btn-outline-dark">Subscribe Now</a></div>
    </div>`)
    */


    console.log(checkedObject)
    console.log("done")

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

