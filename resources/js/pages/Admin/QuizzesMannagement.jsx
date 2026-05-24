import React, { useState } from 'react';

const QuizzesMannagement = () => {
  // දැනට තියෙන Dummy Data (පස්සේ Database එකෙන් ගන්න පුළුවන්)
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Logic Gates & Boolean Algebra MCQ', grade: '12', questions: '20', duration: '30 mins' },
    { id: 2, title: 'Grade 11 Internet & Email Quick Quiz', grade: '11', questions: '15', duration: '20 mins' },
    { id: 3, title: 'Operating Systems Revision Quiz', grade: '13', questions: '25', duration: '40 mins' },
  ]);

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    grade: '12',
    questions: '',
    duration: '20'
  });

  // Input වෙනස් වෙද්දී State එක update කිරීම
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // නව Quiz එකක් එකතු කිරීම
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('කරුණාකර Quiz එකේ නම ඇතුළත් කරන්න!');
    if (!formData.questions.trim()) return alert('කරුණාකර ප්‍රශ්න ගණන ඇතුළත් කරන්න!');

    const newQuiz = {
      id: Date.now(),
      title: formData.title,
      grade: formData.grade,
      questions: formData.questions,
      duration: `${formData.duration} mins`
    };

    setQuizzes([newQuiz, ...quizzes]); // ලැයිස්තුවේ උඩටම එකතු කරනවා
    setFormData({ title: '', grade: '12', questions: '', duration: '20' }); // Form එක reset කිරීම
  };

  // Quiz එකක් Delete කිරීම
  const handleDelete = (id) => {
    if (confirm('මෙම ක්විස් තරඟය (Quiz) පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද?')) {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-[0_2px_12px_rgba(7,24,53,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase text-[#071835]">Manage Quizzes</h2>
          <p className="text-xs text-gray-500 mt-1">සිසුන්ගේ දැනුම මිනුම සඳහා නව ඔන්ලයින් MCQ ක්විස් තරඟ ඇතුළත් කිරීම සහ කළමනාකරණය.</p>
        </div>
        <span className="text-[10px] font-mono text-[#5d81bd] bg-[#5d81bd]/10 px-3 py-1.5 rounded-lg font-bold w-fit">
          TOTAL QUIZZES: {quizzes.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= 2. ADD NEW QUIZ FORM ================= */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 h-fit sticky top-20">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Create New Quiz
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quiz Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Quiz Topic / Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="उदा: Python Basic Programming MCQ"
                className="w-full px-3.5 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Target Grade */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
                >
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                  <option value="13">Grade 13</option>
                </select>
              </div>

              {/* Total Questions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">No. of Questions</label>
                <input
                  type="number"
                  name="questions"
                  value={formData.questions}
                  onChange={handleInputChange}
                  placeholder="e.g. 10, 20"
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Duration (Time Limit) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Time Limit (Minutes)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
              >
                <option value="10">10 Minutes</option>
                <option value="20">20 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#071835] hover:bg-[#5d81bd] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create & Activate Quiz
            </button>
          </form>
        </div>

        {/* ================= 3. QUIZZES LIST TABLE ================= */}
        <div className="lg:col-span-8 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Active Quizzes List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-[10px] uppercase tracking-wider bg-gray-50/70 rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Status</th>
                  <th className="py-3 px-4">Quiz Topic</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Q. Count</th>
                  <th className="py-3 px-4">Time Limit</th>
                  <th className="py-3 px-4 rounded-r-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#071835]/90">
                {quizzes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400 font-sans">
                      තවමත් කිසිදු ක්විස් එකක් ඇතුළත් කර නොමැත.
                    </td>
                  </tr>
                ) : (
                  quizzes.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-[#fafbfc] transition-colors group">
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 font-mono text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-gray-700 max-w-[180px] truncate group-hover:text-[#5d81bd] transition-colors">
                        {quiz.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">Grade {quiz.grade}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-600">{quiz.questions} Qs</td>
                      <td className="py-3.5 px-4 text-gray-400 font-sans text-[11px]">{quiz.duration}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                          title="Delete Quiz"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 12h5.5M12 5.25c1.135 0 2.098-.845 2.192-1.976a48.567 48.567 0 0 0-4.384 0C10.155 4.405 11.118 5.25 12 5.25ZM2.25 5.75h19.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default QuizzesMannagement;