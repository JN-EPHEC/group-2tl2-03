import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Profile } from './components/Profile';

function App() {
  return (
    <Router>
      <nav style={{ 
        padding: '20px', 
        backgroundColor: '#282c34', 
        color: 'white',
        display: 'flex',
        gap: '20px'
      }}>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Mon Profil</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Par défaut, on redirige vers le login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Si l'utilisateur tape n'importe quoi, on le renvoie au login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;