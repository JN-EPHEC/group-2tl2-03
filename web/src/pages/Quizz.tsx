import { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";

const Quizz = () => {
  // --- ÉTATS (STATES) ---
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // --- TIMERS ---
  const [quizStartTime] = useState(Date.now()); // Pour le temps total
  const [questionStartTime, setQuestionStartTime] = useState(Date.now()); // Pour le bonus par question

  // --- CHARGEMENT ---
  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuizzes();
      if (Array.isArray(data)) {
        setQuestions(data);
        setQuestionStartTime(Date.now()); // On lance le chrono dès que les données arrivent
      }
    };
    fetchQuestions();
  }, []);

  // --- ENVOI DU SCORE ---
  const sendScoreToBackend = async (finalScore: number, totalTime: number) => {
    const token = localStorage.getItem("token");
    try {
      await fetch("https://www.l2-5.ephec-ti.be/api/quizz/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          points: finalScore, 
          time_taken: totalTime 
        })
      });
      console.log("Score envoyé !");
    } catch (error) {
      console.error("Erreur lors de l'envoi du score :", error);
    }
  };

  // --- GESTION DU CLIC ---
  const handleAnswer = (choice: string) => {
    if (selectedAnswer) return; // Empêche le double clic

    const endTime = Date.now();
    const secondsElapsed = Math.floor((endTime - questionStartTime) / 1000);
    
    const correct = questions[currentIndex].correct_answer;
    const isCurrentlyCorrect = choice === correct;

    setSelectedAnswer(choice);
    setIsCorrect(isCurrentlyCorrect);

    let pointsGained = 0;
    if (isCurrentlyCorrect) {
      // Formule : 1000 pts de base + Bonus (1000 - 100 pts par seconde)
      const basePoints = 1000;
      const speedBonus = Math.max(0, 1000 - (secondsElapsed * 100));
      pointsGained = basePoints + speedBonus;
      setScore((prev) => prev + pointsGained);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setQuestionStartTime(Date.now()); // Reset du chrono 
      } else {
        // FIN DU JEU
        const finalTotalScore = isCurrentlyCorrect ? score + pointsGained : score;
        const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
        setIsFinished(true);
        sendScoreToBackend(finalTotalScore, totalTime);
      }
    }, 1500);
  };

  // --- STYLES DES BOUTONS ---
  const getButtonStyle = (optionLetter: string) => {
    const baseStyle = {
      padding: "15px",
      margin: "8px",
      cursor: "pointer",
      border: "2px solid #444",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      backgroundColor: "white",
      color: "#333"
    };

    if (selectedAnswer === optionLetter) {
      return {
        ...baseStyle,
        backgroundColor: isCorrect ? "#2ecc71" : "#e74c3c", 
        color: "white",
        borderColor: isCorrect ? "#27ae60" : "#c0392b",
        transform: "scale(1.02)"
      };
    }
    return baseStyle;
  };

  // --- RENDU : ÉCRAN DE FIN ---
  if (isFinished) {
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
    return (
      <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", fontFamily: "Arial" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>🏁 FINI !</h1>
        <div style={{ backgroundColor: "#f9f9f9", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Ton score final :</p>
          <h2 style={{ fontSize: "4rem", color: "#4A90E2", margin: "10px 0" }}>{score.toLocaleString()}</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>⏱ Temps total : <strong>{totalTime}s</strong></p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: "12px 30px", fontSize: "1rem", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // --- RENDU : CHARGEMENT ---
  if (questions.length === 0) return <div style={{ textAlign: "center", marginTop: "100px" }}>Chargement du quizz...</div>;

  const currentQ = questions[currentIndex];

  // --- RENDU : JEU ---
  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "1.1rem", color: "#666" }}>Question {currentIndex + 1} / {questions.length}</span>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4A90E2" }}>🏆 {score.toLocaleString()} PTS</span>
      </div>
      
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "20px", border: "1px solid #eee", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: "1.6rem", marginBottom: "30px", color: "#222" }}>{currentQ.question}</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <button style={getButtonStyle("A")} onClick={() => handleAnswer("A")}>{currentQ.option_a}</button>
          <button style={getButtonStyle("B")} onClick={() => handleAnswer("B")}>{currentQ.option_b}</button>
          <button style={getButtonStyle("C")} onClick={() => handleAnswer("C")}>{currentQ.option_c}</button>
          <button style={getButtonStyle("D")} onClick={() => handleAnswer("D")}>{currentQ.option_d}</button>
        </div>
      </div>

      {selectedAnswer !== null && (
        <div style={{ marginTop: "25px", padding: "15px", borderRadius: "10px", backgroundColor: isCorrect ? "#e8f8f0" : "#fdf2f2" }}>
          <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: isCorrect ? "#27ae60" : "#c0392b" }}>
            {isCorrect ? "✨ Excellent !" : `❌ Oups ! La bonne réponse était : ${currentQ[`option_${currentQ.correct_answer.toLowerCase()}`]}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quizz;