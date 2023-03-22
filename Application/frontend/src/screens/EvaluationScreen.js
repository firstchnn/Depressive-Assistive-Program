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
      question: 'เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 2,
      question: 'ไม่สบายใจ ซึมเศร้า หรือท้อแท้',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 3,
      question: ' หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 4,
      question: 'เหนื่อยง่าย หรือไม่ค่อยมีแรง',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 5,
      question: 'เบื่ออาหาร หรือกินมากเกินไป',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 6,
      question: 'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 7,
      question: 'สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานท่ีต้องใช้ความตั้งใจ',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 8,
      question: ' พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 9,
      question: 'คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 10,
      question: 'lazy stuff',
      answers: [
        {id: 1, text: 'ยืนยัน', score: 0},
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
      <Text style={styles.EvaluateText}>
        แบบทดสอบ PHQ-9
      </Text>
      <TouchableOpacity style={styles.buttonStart} onPress={togglePopup}>
        <Text>Start</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        {!resultVisible && (
          <View key={currentQuestion.id}>
            <Text style={styles.textQuestion}>{currentQuestion.question}</Text>
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
          <Text style={styles.header}>Results</Text>
          <Text style={styles.score}>Your score on the PHQ-9 Depression test was: {totalScore}</Text> 
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
  textQuestion:{
    marginVertical:20,
    marginLeft:15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAnswer: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginBottom: 6,
    // paddingBottom:10,
    marginHorizontal:18,
    borderRadius:8,
  },
  buttonBack: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginTop: 16,
    // paddingBottom:10,
    marginHorizontal:18,
    borderRadius:8,
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
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal:12,
    textAlign:'center',
  },
  textStart:{

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
  EvaluateText:{
    paddingHorizontal:30,
    paddingBottom:15,
    textAlign:'center'
  }
});

export default EvaluationScreen;
