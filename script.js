function startQuiz() {
  $("#start").on('click', function (event) {
    renderAQuestion();
  });
}

function updateQuestionAndScore() {
  const scoreHtml = $(`
    <ul>
      <li id="js-answered">Questions Number: ${STORE.currentQuestion}/${STORE.questions.length}</li>
      <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`)
  $(".question-score").html(scoreHtml);
}

function updateOptions() {
  let question = STORE.questions[STORE.currentQuestion];
  let index = 0;
  for (let i = 0; i < question.options.length; i++) {
    if (index % 2 === 0) {
      $('.js-options-one').append(`
      <div class="${i}">
      <input type="radio" name="options" id="option${i+1}" value="${question.options[i]}" tabindex="${i+1}" required>
      <label for="option${i+1}">${question.options[i]}</label> <br>
      <span id="js-r${i+1}"></span>
      </div>`)}
    else {
      $('.js-options-two').append(`
      <div class="${i}">
      <input type="radio" name="options" id="option${i+1}" value="${question.options[i]}" tabindex="${i+1}" required>
      <label for="option${i+1}">${question.options[i]}</label> <br>
      <span id="js-r${i+1}"></span>
      </div>`)};
    index++
  };
  
  
}

function renderAQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
    <div class="js-form-div">
      <form class="js-question-form" id="js-questions">
        <fieldset>
          <div class="options row">
            <div class="col">
              <div class="js-options-one"></div>
            </div>
          </div>
          
          <div class="middle-question">
            <div class="row question">
              <div class="col">
                <legend>${question.question}</legend>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <button type="submit" id="answer">Submit</button>
                <button type="button" id="next-question">Next >></button>
              </div>
            </div>
          </div>

          <div class="options row">
            <div class="col options-two">
              <div class="js-options-two"></div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>`);
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
}

function displayResults() {
  const resultsHtml = $(`
    <div class="row">
      <form class="js-results-form">
        <fieldset>
          <div class="row">
            <div class="col">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button type="button" id="restart-button">Restart Quiz</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>`);
  STORE.currentQuestion = 0;
  STORE.score = 0;
  $("main").html(resultsHtml)
}

function handleQuestions() {
  $('body').on('click', '#next-question', function(event) {
    if (STORE.currentQuestion === STORE.questions.length) {
      displayResults();
    } else {
      renderAQuestion();
    }
  });
}


function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event){
    event.preventDefault();
    let currentQuest = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    //changing from alert to required
    /*if (!selectedOption) {
      alert("Choose an option");
      return;
    }*/
    let id_number = currentQuest.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_number;
    $('span').removeClass("right-answer wrong-answer");
    if (selectedOption === currentQuest.answer) {
      STORE.score++;
      $(`${id}`).append(`&emsp; You got it right &emsp;<br>`);
      $(`${id}`).addClass("right-answer");
    } else {
      $(`${id}`).append(`&ensp; You got it wrong <br> The answer is "${currentQuest.answer}" &ensp;<br>`);
      $(`${id}`).addClass("wrong-answer");
    }
    
    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}

function restartQuiz() {
  $('body').on('click', '#restart-button', function(event) {
    renderAQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleSelectOption();
  restartQuiz();
}
$(handleQuizApp);