import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleDetail from './component/article/Article';
import Home from './component/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
