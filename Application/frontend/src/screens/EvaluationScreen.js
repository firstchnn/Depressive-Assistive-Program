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
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 2,
      question: 'ไม่สบายใจ ซึมเศร้า หรือท้อแท้',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 3,
      question: ' หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 4,
      question: 'เหนื่อยง่าย หรือไม่ค่อยมีแรง',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 5,
      question: 'เบื่ออาหาร หรือกินมากเกินไป',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 6,
      question:
        'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้\nตัวเอง หรือครอบครัวผิดหวัง',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 7,
      question:
        'สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงาน\nที่ต้องใช้ความตั้งใจ',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 8,
      question:
        ' พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่าย\nจนท่านอยู่ไม่นิ่งเหมือนเคย',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 9,
      question: 'คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี',
      answers: [
        {
          id: 1,
          text: 'ไม่เลย',
          score: 0,
          Image: require('../asset/SmileFace.png'),
          color: '#d9ead3',
        },
        {
          id: 2,
          text: 'มีบางวันหรือไม่บ่อย',
          score: 1,
          Image: require('../asset/NormalFace.png'),
          color: '#fff2cc',
        },
        {
          id: 3,
          text: 'มีค่อนข้างบ่อย',
          score: 2,
          Image: require('../asset/SadFace.png'),
          color: '#fce5cd',
        },
        {
          id: 4,
          text: 'มีเกือบทุกวัน',
          score: 3,
          Image: require('../asset/CryFace.png'),
          color: '#ea9999',
        },
      ],
    },
    {
      id: 10,
      question:
        'แบบทดสอบ PHQ-9 นี้ เป็นเพียงการประเมิน\nระดับภาวะซึมเศร้าในขั้นต้นเท่านั้น \n คำวินิจฉัยจากทางแพทย์ถือเป็นที่สุด',
      answers: [
        {
          id: 1,
          text: 'รับทราบ',
          score: 0,
          Image: require('../asset/Agree.png'),
          color: '#d0e0e3',
        },
      ],
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
            <View
              style={{
                borderWidth: 2,
                width: '90%',
                alignSelf: 'center',
                marginVertical: 16,
                borderRadius: 8,
                padding: 8,
              }}>
              <Text style={styles.textQuestion}>
                {currentQuestion.question}
              </Text>
            </View>

            {currentQuestion.answers.map(answer => (
              <TouchableOpacity
                style={[styles.buttonAnswer, {backgroundColor: answer.color}]}
                key={answer.id}
                onPress={() =>
                  handleAnswerSelect(currentQuestion.id, answer.id)
                }>
                <View style={styles.answerSet}>
                  <Image
                    source={answer.Image}
                    style={{width: 50, height: 50}}></Image>
                  <Text style={{fontFamily: 'Kanit-Regular',color:'black',}}>
                    {answer.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {questionIndex > 0 && (
              <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
                <Text style={{color: 'white', fontFamily: 'Kanit-Regular'}}>
                  Back
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {resultVisible && (
          <View style={styles.container}>
            <Text style={styles.header}>Results</Text>
            {/* <Text style={styles.score}>
              ผลการทดสอบ PHQ-9 ของคุณwas: {totalScore}
            </Text> */}
            {totalScore >= 0 && totalScore <= 4 && (
              <Text style={styles.score}>
                ผลการทดสอบ PHQ-9 ของคุณ
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 36,
                    color: 'black',
                  }}>
                  {'\n'} {totalScore} {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  Normal
                </Text>
              </Text>
            )}
            {totalScore >= 5 && totalScore <= 9 && (
              <Text style={styles.score}>
                ผลการทดสอบ PHQ-9 ของคุณ
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 36,
                    color: 'black',
                  }}>
                  {'\n'} {totalScore} {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  Mild
                </Text>
                {'\n'}
                มีความผิดปกติเล็กน้อย อาจมีภาวะซึมเศร้า
              </Text>
            )}
            {totalScore >= 10 && totalScore <= 14 && (
              <Text style={styles.score}>
                ผลการทดสอบ PHQ-9 ของคุณ
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 36,
                    color: 'black',
                  }}>
                  {'\n'} {totalScore} {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  Moderate{' '}
                </Text>
                {'\n'}
                มีภาวะซึมเศร้าเล็กน้อย
              </Text>
            )}
            {totalScore >= 15 && totalScore <= 19 && (
              <Text style={styles.score}>
                ผลการทดสอบ PHQ-9 ของคุณ
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 36,
                    color: 'black',
                  }}>
                  {'\n'} {totalScore} {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  Morderate to severe{' '}
                </Text>
                {'\n'}
                มีภาวะซึมเศร้าปานกลาง
              </Text>
            )}
            {totalScore >= 20 && (
              <Text style={styles.score}>
                ผลการทดสอบ PHQ-9 ของคุณ
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 36,
                    color: 'black',
                  }}>
                  {'\n'} {totalScore} {'\n'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Kanit-Bold',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  Severe {'\n'}
                </Text>
                มีภาวะซึมเศร้ารุนแรง
              </Text>
            )}
            <TouchableOpacity
              style={styles.buttonHome}
              onPress={handleBackPress}>
              <Text style={styles.buttonText}>ย้อนกลับ</Text>
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
    marginLeft: 0,
    fontFamily: 'Kanit-Regular',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'black',
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
    elevation: 2,
  },
  buttonBack: {
    elevation: 2,
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
  answerSet: {
    flexDirection: 'column',
    alignItems: 'center',
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
    fontFamily: 'Kanit-Bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 12,
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    color: 'black',
  },
  textStart: {
    color: 'white',
    // fontWeight: 'bold',
    letterSpacing: 1.1,
    fontFamily: 'Kanit-Bold',
    alignSelf: 'center',
    color: 'white',
  },
  buttonStart: {
    backgroundColor: '#008CBA',
    width: 160,
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
    color: 'white',
    // fontFamily:'Kanit-Bold',
  },
  EvaluateText: {
    paddingHorizontal: 30,
    paddingBottom: 15,
    textAlign: 'center',
    fontFamily: 'Kanit-Bold',
    color: 'black',
  },
  IndexNumber: {
    marginLeft: 15,
    paddingBottom: 0,
    paddingTop: 20,
    textAlign: 'left',
    fontFamily: 'Kanit-Regular',
    color: 'black',
  },
  ExitButton: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    marginRight: 20,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default EvaluationScreen;
