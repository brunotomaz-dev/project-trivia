export const QUESTIONS_API = 'QUESTIONS_API';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

const questionsAPI = () => ({ type: QUESTIONS_API });

const getQuestions = (json) => ({
  type: GET_QUESTIONS,
  questions: json.results,
  responseCode: json.response_code,
});

export const requestQuestions = (URL) => async (dispatch) => {
  dispatch(questionsAPI());
  const fetchURL = await fetch(URL);
  const jsonURL = await fetchURL.json();
  console.log(jsonURL);
  dispatch(getQuestions(jsonURL));
};
