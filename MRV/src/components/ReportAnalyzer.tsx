'use client';

import { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

type Activity = {
  action: string;
  timestamp: Date;
};

export default function Component() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<'deficiency' | 'normal' | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      addActivity('File uploaded');
    }
  };

  const analyzeReport = () => {
    setAnalyzing(true);
    addActivity('Report analysis started');
    setTimeout(() => {
      setAnalyzing(false);
      setResult('deficiency');
      addActivity('Report analysis completed');
    }, 2000);
  };

  const addActivity = (action: string) => {
    setActivities((prev) => [...prev, { action, timestamp: new Date() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-300 flex flex-col items-center transition duration-500 ease-in-out p-4">
      <nav className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">Medical Report Vizualizer</h1>
          <div className="space-x-4">
            <button className="text-white hover:text-blue-200 transition-all">Home</button>
            <button className="text-white hover:text-blue-200 transition-all">Reports</button>
            <button className="text-white hover:text-blue-200 transition-all">Language</button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        {/* Upload Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Upload and Analyze Medical Report</h2>
          {!file && (
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center h-64 bg-gray-50 border-4 border-dashed border-indigo-200 rounded-3xl hover:bg-indigo-50 transition-all">
              <Upload className="w-12 h-12 text-indigo-500" />
              <p className="mt-3 text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">Accepted formats: PDF, PNG, JPG, GIF</p>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.gif" />
            </label>
          )}
          {file && !analyzing && !result && (
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-700">{file.name}</p>
              <button onClick={analyzeReport} className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105">
                Analyze Report
              </button>
            </div>
          )}
          {analyzing && (
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-indigo-400 animate-spin" />
              <p className="text-lg font-semibold text-indigo-600 mb-4">Analyzing your report...</p>
              <div className="w-full max-w-sm mx-auto bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse" style={{ width: '33%' }} />
              </div>
            </div>
          )}

          {/*API Goes here*/}
          {result === 'deficiency' && (
            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold text-red-600 mb-4 animate-bounce">Report Analysis: Iron Deficiency Detected</h3>
              <p className="mb-4 text-gray-600">Iron is essential for producing hemoglobin, which helps carry oxygen in your blood. A deficiency may cause fatigue, weakness, and more.</p>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Recommendations:</h4>
              <ul className="list-disc list-inside text-left space-y-2 text-gray-700">
                <li>Increase intake of iron-rich foods (red meat, spinach, beans)</li>
                <li>Consider iron supplements (consult a doctor first)</li>
                <li>Pair iron-rich foods with vitamin C for better absorption</li>
                <li>Avoid coffee/tea with meals, as they can inhibit iron absorption</li>
              </ul>
              <p className="mt-4 text-xs text-gray-400">Note: This is a simulated result. Consult a healthcare professional for accurate advice.</p>
              <h1 className='"text-xl font-semibold text-red-600 mb-4 animate-bounce"'>This is a Prototype Design, Functionalities and Design elements are yet to be added</h1>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                setFile(null);
                setResult(null);
                addActivity('New report requested');
              }}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Upload New Report
            </button>
            {result && (
              <button onClick={() => addActivity('Full analysis downloaded')} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all transform hover:scale-105">
                Download Full Analysis
              </button>
            )}
          </div>
        </div>

        {/* Activity Log Card */}
        <div className="w-full lg:w-80 bg-white rounded-3xl shadow-lg p-8 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Activity Log</h2>
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <li key={index} className="flex justify-between text-sm text-gray-600">
                  <span>{activity.timestamp.toLocaleTimeString()}</span>
                  <span>{activity.action}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400 text-center">No activities yet.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
