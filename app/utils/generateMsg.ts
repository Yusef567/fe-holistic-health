export const generateMsg = (userScore: number, totalQuestions: number) => {
  let message = "";
  let message2 = "";
  if (userScore === totalQuestions) {
    message = "Congratulations! You're a Health Wizard";
    message2 = "You're on fire, keep it up!";
  } else if (userScore >= totalQuestions * 0.9) {
    message = "Spectacular! You're doing fantastic";
    message2 = "You're at the top of your game!";
  } else if (userScore >= totalQuestions * 0.8) {
    message = "Great job! You're a star";
    message2 = "Impressive score, keep challenging yourself!";
  } else if (userScore >= totalQuestions * 0.7) {
    message = "Awesome job! You're on a roll";
    message2 = "keep up the good work!";
  } else if (userScore >= totalQuestions * 0.6) {
    message = "Good work! You're on the right track";
    message2 = "You're on a learning spree, keep it going!";
  } else if (userScore >= totalQuestions * 0.5) {
    message = "Good effort! You're making progress";
    message2 = "Keep learning and growing!";
  } else if (userScore >= totalQuestions * 0.4) {
    message = "You're getting there! Keep practicing";
    message2 = "Learning is a lifelong adventure. Keep going!";
  } else if (userScore >= totalQuestions * 0.3) {
    message = "Everything is under control.";
    message2 = "Not bad, but not top score, maybe give it another shot!";
  } else {
    message = "Learning takes time. Keep practicing and you'll get better!";
    message2 =
      "You're on the right path, but there's room for growth. Try again!";
  }
  return { message, message2 };
};
