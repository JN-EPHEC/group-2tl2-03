import { useEffect, useState } from "react"; 
import { getQuizzes } from "../services/api";

const Quizz = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuizzes();
      if (Array.isArray(data)) {
        setQuestions(data);
      }
    };
    fetchQuestions();
  }, []);

  
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (questions.length === 0) return <p>Chargement du quiz...</p>;

  const currentQ = questions[currentIndex];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎓 Quizz Challenge</h1>
      <p>Question {currentIndex + 1} / {questions.length}</p>
      
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", backgroundColor: "#222" }}>
        <h3>{currentQ.question}</h3>
        <div style={{ display: "grid", gap: "10px" }}>
          <button onClick={() => alert("Choix A")}>{currentQ.option_a}</button>
          <button onClick={() => alert("Choix B")}>{currentQ.option_b}</button>
          <button onClick={() => alert("Choix C")}>{currentQ.option_c}</button>
          <button onClick={() => alert("Choix D")}>{currentQ.option_d}</button>
        </div>

        {/* Bouton pour passer à la suite, utilisant setCurrentIndex */}
        {currentIndex < questions.length - 1 && (
          <button 
            onClick={handleNext}
            style={{ marginTop: "20px", backgroundColor: "#4A90E2", color: "white" }}
          >
            Question suivante
          </button>
        )}
      </div>
    </div>
  );
};

export default Quizz;