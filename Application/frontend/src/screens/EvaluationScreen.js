import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  // ProgressBarAndroid,
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
  const [resultVisible, setResultVisible] = useState(false);
  const handleResult = () => {
    setResultVisible(!resultVisible);
  };

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
      question:
        'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 7,
      question:
        'สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานท่ีต้องใช้ความตั้งใจ',
      answers: [
        {id: 1, text: 'ไม่เลย', score: 0},
        {id: 2, text: 'มีบางวันหรือไม่บ่อย', score: 1},
        {id: 3, text: 'มีค่อนข้างบ่อย', score: 2},
        {id: 4, text: 'มีเกือบทุกวัน', score: 3},
      ],
    },
    {
      id: 8,
      question:
        ' พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย',
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
      question:
        'แบบทดสอบ PHQ-9 นี้ เป็นเพียงการประเมินระดับภาวะซึมเศร้าในขั้นต้นเท่านั้น',
      answers: [{id: 1, text: 'รับทราบ', score: 0}],
    },
  ];

  const handleAnswerSelect = async (questionId, answerId) => {
    await setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answerId,
    }));
    await console.log(questionIndex);
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
  const handleClose = async () => {
    await togglePopup();
    // await handleResult();
    await setQuestionIndex(0);
    await setSelectedAnswers({});
    await setTotalScore(0);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccd2ff',
        // borderWidth:3,
      }}>
      {/* <View > */}
      <Image
        style={styles.SurveyPic}
        resizeMode="contain"
        source={require('../asset/Survey.png')}></Image>
      {/* </View> */}
      <Text style={styles.EvaluateText}>แบบทดสอบ PHQ-9</Text>
      <TouchableOpacity style={styles.buttonStart} onPress={togglePopup}>
        <Text style={styles.textStart}>เริ่มแบบทดสอบ</Text>
      </TouchableOpacity>
      <Modal visible={popupVisible} animationType="slide">
        {!resultVisible && (
          <View key={currentQuestion.id}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.IndexNumber}>
                {currentQuestion.id}/{questions.length}
              </Text>
              {/* <Text style={styles.ExitButton} onPress={() => handleClose()}>
                x
              </Text> */}
              <TouchableOpacity onPress={() => handleClose()}>
              <Image
            style={styles.ExitButton}
            source={require('../asset/Close.png')}></Image>
              </TouchableOpacity>
            </View>
            <Text style={styles.textQuestion}>{currentQuestion.question}</Text>
            {currentQuestion.answers.map(answer => (
              <TouchableOpacity
                style={styles.buttonAnswer}
                key={answer.id}
                onPress={() =>
                  handleAnswerSelect(currentQuestion.id, answer.id)
                }>
                <Text style={{fontFamily:'Kanit-Regular',}}>{answer.text}</Text>
              </TouchableOpacity>
            ))}
            {questionIndex > 0 && (
              <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
                <Text style={{color: 'white',fontFamily:'Kanit-Regular'}}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {resultVisible && (
          <View style={styles.container}>
            <Text style={styles.header}>Results</Text>
            {/* <Text style={styles.score}>
              Your score on the PHQ-9 Depression test was: {totalScore}
            </Text> */}
            {totalScore >= 0 && totalScore <= 4 && (
              <Text style={styles.score}>
                Your score on the PHQ-9 Depression test was: {totalScore} 
                Normal
              </Text>
            )}
            {totalScore >= 5 && totalScore <= 9 && (
              <Text style={styles.score}>
                Your score on the PHQ-9 Depression test was: {totalScore} Mild{'\n'}
                มีความผิดปกติ แต่ยังไม่มีภาวะซึมเศร้า
              </Text>
            )}
            {totalScore >= 10 && totalScore <= 14 && (
              <Text style={styles.score}>
                Your score on the PHQ-9 Depression test was: {totalScore}{' '}Moderate {'\n'}
                มีภาวะซึมเศร้าเล็กน้อย
              </Text>
            )}
            {totalScore >= 15 && totalScore <= 19 && (
              <Text style={styles.score}>
                Your score on the PHQ-9 Depression test was: {totalScore}{' '}
                Morderate to severe {'\n'}
                มีภาวะซึมเศร้าปานกลาง
              </Text>
            )}
            {totalScore >= 20 && (
              <Text style={styles.score}>
                Your score on the PHQ-9 Depression test was: {totalScore} 
                Severe {'\n'}
                มีภาวะซึมเศร้ารุนแรง
              </Text>
            )}
            <TouchableOpacity
              style={styles.buttonHome}
              onPress={handleBackPress}>
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textQuestion: {
    marginVertical: 20,
    marginLeft: 18,
    fontFamily:'Kanit-Regular',
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
    marginHorizontal: 18,
    borderRadius: 8,
  },
  buttonBack: {
    alignItems: 'center',
    backgroundColor: '#2986cc',
    padding: 20,
    marginTop: 16,
    // paddingBottom:10,
    marginHorizontal: 18,
    borderRadius: 8,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  
  SurveyPic: {
    // max-width: 100%,
    // display:'flex',
    Width: '50%',
    height: '50%',
    // borderWidth:1,
    alignContent: 'center',
  },

  header: {
    fontSize: 24,
    fontFamily:'Kanit-Bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 12,
    textAlign: 'center',
    fontFamily:'Kanit-Regular',
  },
  textStart: {
    color: 'white',
    // fontWeight: 'bold',
    letterSpacing: 1.1,
    fontFamily:'Kanit-Bold',
    alignSelf:'center',
  },
  buttonStart: {
    backgroundColor: '#008CBA',
    width:160,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingBottom: 10,
  },
  buttonHome: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily:'Kanit-Bold',
  },
  EvaluateText: {
    paddingHorizontal: 30,
    paddingBottom: 15,
    textAlign: 'center',
    fontFamily:'Kanit-Bold'
  },
  IndexNumber: {
    marginLeft: 15,
    paddingBottom: 0,
    paddingTop: 20,
    textAlign: 'left',
    fontFamily:'Kanit-Regular'
  },
  ExitButton: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    marginRight: 20,
    resizeMode:'contain',
    marginTop:20,
  }
});

export default EvaluationScreen;
