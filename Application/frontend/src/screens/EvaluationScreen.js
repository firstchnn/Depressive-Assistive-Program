import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

function calculateScore(questions, selectedAnswers) {
  return Object.values(selectedAnswers).reduce((acc, selectedAnswerId) => {
    const answer = questions
      .flatMap(q => q.answers)
      .find(a => a.id === selectedAnswerId);
    if (answer) {
      acc += answer.score;
    }
    return acc;
  }, 0);
}

function EvaluationScreen({navigation, route}) {
  // const { score } = route.params;
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const [resultVisible, setResultVisible] = useState(false)
  const handleResult = () => {
    setResultVisible(!resultVisible)
  }
  

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0); // Initialize the current question index to 0
  const [totalScore, setTotalScore] = useState(0);
  const questions = [
    // questions data
    {
      id: 1,
      question: 'What is your favorite color?',
      answers: [
        {id: 1, text: 'Red', score: 0},
        {id: 2, text: 'Blue', score: 1},
        {id: 3, text: 'Green', score: 2},
      ],
    },
    {
      id: 2,
      question: 'What is your favorite animal?',
      answers: [
        {id: 1, text: 'Dog', score: 0},
        {id: 2, text: 'Cat', score: 1},
        {id: 3, text: 'Fish', score: 2},
      ],
    },
    {
      id: 3,
      question: 'What is your favorite animal?',
      answers: [
        {id: 1, text: 'Kangaroo', score: 0},
        {id: 2, text: 'Frog', score: 1},
        {id: 3, text: 'Owl', score: 2},
      ],
    },
    {
      id: 4,
      question: 'What is your favorite animal?',
      answers: [
        {id: 1, text: 'UwU', score: 0},
        {id: 2, text: ':)', score: 1},
        {id: 3, text: 'O_o', score: 2},
      ],
    },
    {
      id: 5,
      question: 'lazy stuff',
      answers: [
        {id: 1, text: 'UwU', score: 0},
      ],
    },
  ];

  const handleAnswerSelect = async(questionId, answerId) => {
    await setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answerId,
    }));
    await console.log(questionIndex)
    if (questionIndex === questions.length - 1 && answerId) {
      setTotalScore(calculateScore(questions, selectedAnswers));
      handleResult();
    } else {
      setQuestionIndex(prevState => prevState + 1);
    }
  };

  const handleBack = () => {
    // Move to the previous question
    setQuestionIndex(prevState => prevState - 1);
  };
  const handleBackPress = async () => {
    await togglePopup();
    await handleResult();
    await setQuestionIndex(0);
    await setSelectedAnswers({});
    await setTotalScore(0);
    // await navigation.navigate('EvalutionScreen');
  };

  const currentQuestion = questions[questionIndex];

  // const totalScore = Object.values(selectedAnswers).reduce(
  //   (acc, selectedAnswerId) => {
  //     const answer = currentQuestion.answers.find(
  //       a => a.id === selectedAnswerId,
  //     );
  //     if (answer) {
  //       acc += answer.score;
  //     }
  //     return acc;
  //   },
  //   0,
  // );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>This is Evaluation Screen</Text>
      <TouchableOpacity style={styles.buttonStart} onPress={togglePopup}>
        <Text>Start</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        {!resultVisible && (
          <View key={currentQuestion.id}>
            <Text>{currentQuestion.question}</Text>
            {currentQuestion.answers.map(answer => (
              <TouchableOpacity
              style = {styles.buttonAnswer}
                key={answer.id}
                onPress={() =>
                  handleAnswerSelect(currentQuestion.id, answer.id)
                }>
                <Text>{answer.text}</Text>
              </TouchableOpacity>
            ))}
            {questionIndex > 0 && (
              <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
                <Text>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {resultVisible && (
          <View style={styles.container}>
          <Text style={styles.header}>Quiz Score</Text>
          <Text style={styles.score}>Your score: {totalScore}</Text> 
          <TouchableOpacity style={styles.buttonHome} onPress={handleBackPress}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAnswer: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 6,
    paddingBottom:10
  },
  buttonBack: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: '6%',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonStart: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingBottom:10
  },
  buttonHome: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingTop:10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EvaluationScreen;
