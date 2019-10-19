function startQuiz() {
    $("#start").on('click', function(event){
      renderQuestion();
    });
}
function updateQuestionAndScore() {
  const scoreHtml = $(`
    <ul>
      <li>STORE.currentQuesiton/STORE.questions.length</li>
      <li>STORE.score/STORE.questions.length</li>
    </ul>`)
    $(".question-score").html(scoreHtml);
}
function updateOptions() {
  let optionsHtml = `
    <`
}
function renderQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
    <div class="row question">
      <form class="js-question-form" id="js-questions">
        <fieldset>
          <div class="row question">
            <div class="col">
              <legengd>${question.question}</legend>
            </div>
          </div>
          
          <div class="options row">
            <div class="col">
              <div class="js-options"></div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button type="submit" id="answer">Submit</button>
              <button type="button" id="next-question">Next >></button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>`);
  $("main").html(questionHtml);
  updateOptions();
  $("#next-quesiton").hide();
}
function displayResults() {}
function handleQuestions() {}
function handleSelectOption() {}
function restartQuiz() {}
function handleQuizApp() {}