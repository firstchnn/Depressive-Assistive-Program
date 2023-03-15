import * as React from 'react';
import {useState} from 'react';
import {Button, View, Text, TouchableOpacity} from 'react-native';

function calculateScore(questions, selectedAnswers) {
  return Object.values(selectedAnswers).reduce((acc, selectedAnswerId) => {
    const answer = questions.flatMap(q => q.answers).find(a => a.id === selectedAnswerId);
    if (answer) {
      acc += answer.score;
    }
    return acc;
  }, 0);
}

function EvaluationScreen({ navigation,route }) {
  
  // const { score } = route.params;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0); // Initialize the current question index to 0
  const questions = [
    // questions data
    {
      id: 1,
      question: "What is your favorite color?",
      answers: [
        { id: 1, text: "Red", score: 0 },
        { id: 2, text: "Blue", score: 1 },
        { id: 3, text: "Green", score: 2 },
      ],
    },
    {
      id: 2,
      question: "What is your favorite animal?",
      answers: [
        { id: 1, text: "Dog", score: 0 },
        { id: 2, text: "Cat", score: 1 },
        { id: 3, text: "Fish", score: 2 },
      ],
    },
    {
      id: 3,
      question: "What is your favorite animal?",
      answers: [
        { id: 1, text: "Kangaroo", score: 0 },
        { id: 2, text: "Frog", score: 1 },
        { id: 3, text: "Owl", score: 2 },
      ],
    },
    {
      id: 4,
      question: "What is your favorite animal?",
      answers: [
        { id: 1, text: "UwU", score: 0 },
        { id: 2, text: ":)", score: 1 },
        { id: 3, text: "O_o", score: 2 },
      ],
    },
  ];

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
  
    if (questionIndex === questions.length - 1 && answerId) {
      navigation.navigate('ScoreScreen', { score: calculateScore(questions, selectedAnswers) });
    } else {
      setQuestionIndex((prevState) => prevState + 1);
    }
  };

  
  // const handleAnswerSelect = (questionId, answerId) => {
  //   setSelectedAnswers((prevState) => ({
  //     ...prevState,
  //     [questionId]: answerId,
  //   }));
  
  //   // Check if this is the last question and an answer is selected for it, then navigate to the ScoreScreen
  //   if (questionIndex === questions.length - 1 && answerId) {
  //     // const lastQuestionScore = questions[questionIndex].answers.find(a => a.id === answerId)?.score || 0;
  //     const lastQuestionScore = questions[questions.length - 1].answers.find(a => a.id === selectedAnswers[questions.length - 1])?.score || 0;
  //     // const totalScore = Object.values(selectedAnswers).reduce((acc, selectedAnswerId) => {
  //     //   const answer = questions.flatMap(q => q.answers).find(a => a.id === selectedAnswerId);
  //     //   if (answer) {
  //     //     acc += answer.score;
  //     //   }
  //     //   return acc;
  //     // }, 0) + lastQuestionScore;
  //     // navigation.navigate('ScoreScreen', { score: totalScore });
  //     navigation.navigate('ScoreScreen', { score: calculateScore(questions, selectedAnswers) });
  //   } else {
  //     // Move to the next question
  //     setQuestionIndex((prevState) => prevState + 1);
  //   }
  // };
  const handleBack = () => {
    // Move to the previous question
    setQuestionIndex((prevState) => prevState - 1);
  };

  const currentQuestion = questions[questionIndex];

  const totalScore = Object.values(selectedAnswers).reduce((acc, selectedAnswerId) => {
    const answer = currentQuestion.answers.find((a) => a.id === selectedAnswerId);
    if (answer) {
      acc += answer.score;
    }
    return acc;
  }, 0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      {currentQuestion && (
        <View key={currentQuestion.id}>
          <Text>{currentQuestion.question}</Text>
          {currentQuestion.answers.map(answer => (
            <TouchableOpacity key={answer.id} onPress={() => handleAnswerSelect(currentQuestion.id, answer.id)}>
              <Text>{answer.text}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        {questionIndex > 0 && (
          <Button title="Back" onPress={handleBack} />
        )}
      </View>

    </View>
  );
}

export default EvaluationScreen;
