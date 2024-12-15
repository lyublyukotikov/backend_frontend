import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from '../src/Pages/Home/AuthPage/AuthPage';
import SuccessPage from '../src/components/elements/SuccessPage'; // Импортируйте SuccessPage
import { StoreProvider } from '../store/AuthStore/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} /> {/* Отображение страницы авторизации по корневому пути */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
