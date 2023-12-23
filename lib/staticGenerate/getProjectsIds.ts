export async function getAllQuizzesId() {
  const quizzes = await fetch(
    "https://quizz-app-alexmihai288.vercel.app/api/getProjectsIds",
    {
      method: "GET",
    }
  );

  const jsonQuizzes = await quizzes.json();

  return jsonQuizzes;
}
