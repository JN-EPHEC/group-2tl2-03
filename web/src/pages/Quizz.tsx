import { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";

const Quizz = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuizzes();
      if (Array.isArray(data)) {
        setQuestions(data);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (choice: string) => {
    //empêche un 2eme choix
    if (selectedAnswer) return; 

    const correct = questions[currentIndex].correct_answer;
    setSelectedAnswer(choice);
    setIsCorrect(choice === correct);

    // On attend 1.5 seconde avant de passer à la suite pour laisser voir le résultat
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        alert("Quizz terminé ! Bravo.");
      }
    }, 1500);
  };

  if (questions.length === 0) return <p>Chargement du quiz...</p>;

  const currentQ = questions[currentIndex];

  // Fonction pour définir la couleur du bouton
  const getButtonStyle = (optionLetter: string) => {
    const baseStyle = {
      padding: "15px",
      margin: "5px",
      cursor: "pointer",
      border: "2px solid #444",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "0.3s"
    };

    if (selectedAnswer === optionLetter) {
      return {
        ...baseStyle,
        backgroundColor: isCorrect ? "#2ecc71" : "#e74c3c", 
        color: "white",
        borderColor: isCorrect ? "#27ae60" : "#c0392b"
      };
    }

    return baseStyle;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" }}>
      <h2>Question {currentIndex + 1} / {questions.length}</h2>
      
      <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "25px", color: "#333" }}>{currentQ.question}</h3>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button style={getButtonStyle("A")} onClick={() => handleAnswer("A")}>{currentQ.option_a}</button>
          <button style={getButtonStyle("B")} onClick={() => handleAnswer("B")}>{currentQ.option_b}</button>
          <button style={getButtonStyle("C")} onClick={() => handleAnswer("C")}>{currentQ.option_c}</button>
          <button style={getButtonStyle("D")} onClick={() => handleAnswer("D")}>{currentQ.option_d}</button>
        </div>
      </div>

      {selectedAnswer !== null && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: isCorrect ? "#27ae60" : "#c0392b" }}>
          {isCorrect ? "✅ Bonne réponse !" : `❌ Mauvaise réponse... La bonne était : ${currentQ[`option_${currentQ.correct_answer.toLowerCase()}`]}`}
        </p>
      )}
    </div>
  );
};

export default Quizz;