const QuestionCard = ({ question }) => {
  return (
    <div className="flex ">
      <div>
        <p>Title : </p>
        <span>{question.title}</span>
        <p>Description</p>
        <span>{question.description}</span>
      </div>
      <p>{question.difficulty}</p>
      <p>{question.points}</p>
    </div>
  );
};
export default QuestionCard;
// {
//     "constraints": [], "_id": "65d72064cd801a8b61f5ceee",
//         "title": "Sum of Two Numbers", "description": "Find Sum of two Numbers",
//         "testCases": [{ "_id": "65d725772dc7ce99c7dd7d06", "inp": "1 2", "oup": "3" },
//         { "_id": "65d725772dc7ce99c7dd7d07", "inp": "4 5", "oup": "9" },
//         { "_id": "65d725772dc7ce99c7dd7d08", "inp": "7 9", "oup": "16" },
//         { "_id": "65d725772dc7ce99c7dd7d09", "inp": "15 41", "oup": "56" }],
//         "points": 10, "difficulty": "easy", "topics": ["sum", "inputs"]
// }, {
//     "constraints": [], "_id": "65d7209bcd801a8b61f5cef0",
//         "title": "Calculate Factorial",
//         "description": "Write a function to calculate the factorial of a given number.",
//         "testCases": [{ "_id": "65d725772dc7ce99c7dd7d0a", "inp": "5", "oup": "120" },
//         { "_id": "65d725772dc7ce99c7dd7d0b", "inp": "0", "oup": "1" },
//         { "_id": "65d725772dc7ce99c7dd7d0c", "inp": "7", "oup": "5040" },
//         { "_id": "65d725772dc7ce99c7dd7d0d", "inp": "10", "oup": "3628800" }],
//         "points": 15, "difficulty": "Medium", "topics": ["factorial", "recursion", "loops"]
// }

// <div>
//       <p>Title : </p>
//       <p>{question.title}</p>
//       <p>Description</p>
//       <p>{question.description}</p>
//       <p>Sample Testcases</p>
//       <div>
//         <p>Input : {question.testCases[0].input} :</p>
//         <p>Expected Output : {question.testCases[0].output} : </p>
//       </div>
//       <div>
//         <p>Input : {question.testCases[1].input} :</p>
//         <p>Expected Output : {question.testCases[1].output} : </p>
//       </div>
//       <p>{question.description}</p>
//     </div>
