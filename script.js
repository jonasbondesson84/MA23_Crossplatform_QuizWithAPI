const apiURL = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy';

const button = document.getElementById('fetch');

button.addEventListener('click', async e => {

    const data = await fetch(apiURL);
    
    const quizData = await data.json();

    const questions = quizData.results;
    createQuestions(questions);

    
})

const createQuestions = (questions) => {
    const questionContainer = document.getElementById('container');
    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        questionContainer.appendChild(questionElement);
        const answerElement = createAnswers(question);
        questionContainer.appendChild(answerElement);
    });
}

const createQuestionElement = (question) => {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionHeadingElement = document.createElement('h2');
    // questionHeadingElement.className = 'question_heading';
    questionHeadingElement.innerHTML = question.question;

    questionElement.appendChild(questionHeadingElement);

    return questionElement;
}

const createAnswers = (question) => {
    // const answers = [...question.incorrect_answers, question.correct_answer];
    let answers = question.incorrect_answers;
    const randIndex = Math.floor(Math.random() * answers.length +1);
    answers.splice(randIndex, 0, question.correct_answer);
    const answersElement = document.createElement('div');
    answersElement.className = 'answers';

    answers.forEach(answer => {
        const answerElement = createAnswersElements(answer);
        answerElement.className = 'answer';
        answerElement.addEventListener('click', e => {
            if(answer == question.correct_answer) {
                answerElement.classList.add('correct_answer');           
            } else {
                answerElement.classList.add('incorrect_answer');
            }
        })
        answersElement.appendChild(answerElement);
    })
    return answersElement;
}

const createAnswersElements = (answer) => {
    const answerElement = document.createElement('div');
    answerElement.className = 'answer';
    answerElement.innerHTML = answer;
    return answerElement;
}