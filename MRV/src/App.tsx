import { useState } from 'react';
import './App.css'; // Import your main CSS file
import ReportAnalyzer from './components/ReportAnalyzer'; // Import your new component

function App() {
  return (
    <div>
         <ReportAnalyzer /> {/* Render your new component */}
    </div>
  );
}

export default App;
