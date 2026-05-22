import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/Components/Navbar';

const Quizzes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // URL එකෙන් grade එක ගන්නවා (කිසිවක් නැත්නම් default '6-9' ගන්නවා)
  const currentGrade = searchParams.get('grade') || '6-9';

  // --- SAMPLE QUIZ DATA (ඔයාගේ Database එකෙන් එන දේවල් මෙතනට දාන්න පුළුවන්) ---
  const quizzesData = {
    "6-9": [
      { id: 101, title: "Introduction to Computers", questions: 10, time: "15 mins", level: "Beginner" },
      { id: 102, title: "Input & Output Devices", questions: 15, time: "20 mins", level: "Beginner" },
      { id: 103, title: "Basic File Management", questions: 12, time: "15 mins", level: "Intermediate" },
    ],
    "ol": [
      { id: 201, title: "Data Representation (Binary/Hex)", questions: 20, time: "30 mins", level: "O/L Target" },
      { id: 202, title: "Logic Gates & Truth Tables", questions: 15, time: "25 mins", level: "O/L Target" },
      { id: 203, title: "Operating Systems Foundations", questions: 20, time: "30 mins", level: "O/L Booster" },
    ],
    "al": [
      { id: 301, title: "Python Programming & Control Structures", questions: 25, time: "40 mins", level: "A/L Core" },
      { id: 302, title: "Database Management Systems (DBMS/SQL)", questions: 20, time: "35 mins", level: "A/L Core" },
      { id: 303, title: "Computer Networking & IP Addressing", questions: 30, time: "45 mins", level: "Advanced" },
    ]
  };

  // Active ශ්‍රේණිය අනුව වෙනස් වන Styles
  const gradeConfig = {
    "6-9": { title: "Grade 6 - 9 (Foundation)", color: "text-blue-600 border-blue-200 bg-blue-50" },
    "ol": { title: "Grade 10 - 11 (O/L)", color: "text-indigo-600 border-indigo-200 bg-indigo-50" },
    "al": { title: "Grade 12 - 13 (A/L)", color: "text-purple-600 border-purple-200 bg-purple-50" }
  };

  // Grade එක වෙනස් කරන හසුරුවන්නා
  const handleGradeChange = (slug) => {
    setSearchParams({ grade: slug });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#071835] selection:bg-[#b5cbf0] selection:text-[#010813] antialiased">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="space-y-2 border-b border-[#b5cbf0]/30 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#071835] text-[#b5cbf0] text-[10px] font-mono font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5d81bd] animate-pulse" />
            LMS TESTING HUB
          </div>
          <h1 className="text-3xl font-black text-[#071835] tracking-tight uppercase">
            ICT ZONE <span className="text-[#5d81bd] font-mono">[QUIZZES]</span>
          </h1>
          <p className="text-xs text-[#071835]/60 max-w-xl">
            ඔබේ ශ්‍රේණිය තෝරා විෂය නිර්දේශයට අනුකූලව සකස් කරන ලද බහුවරණ ප්‍රශ්න පත්‍ර (MCQ Quizzes) සඳහා මුහුණ දී ඔබේ දැනුම උරගා බලන්න.
          </p>
        </div>

        {/* ================= GRADE SELECTION TABS (CONTROLLER) ================= */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleGradeChange('6-9')}
            className={`px-5 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              currentGrade === '6-9'
                ? 'bg-[#071835] text-white border-[#071835] shadow-sm'
                : 'bg-white text-[#071835]/70 border-[#b5cbf0]/50 hover:border-[#5d81bd]'
            }`}
          >
            Grades 6 - 9
          </button>
          
          <button
            onClick={() => handleGradeChange('ol')}
            className={`px-5 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              currentGrade === 'ol'
                ? 'bg-[#071835] text-white border-[#071835] shadow-sm'
                : 'bg-white text-[#071835]/70 border-[#b5cbf0]/50 hover:border-[#5d81bd]'
            }`}
          >
            Grades 10 - 11 (O/L)
          </button>

          <button
            onClick={() => handleGradeChange('al')}
            className={`px-5 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              currentGrade === 'al'
                ? 'bg-[#071835] text-white border-[#071835] shadow-sm'
                : 'bg-white text-[#071835]/70 border-[#b5cbf0]/50 hover:border-[#5d81bd]'
            }`}
          >
            Grades 12 - 13 (A/L)
          </button>
        </div>

        {/* ================= QUIZZES CONTAINER UI ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#5d81bd] uppercase block">
              // ACTIVE SECTION:
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-md ${gradeConfig[currentGrade]?.color || 'bg-gray-50'}`}>
              {gradeConfig[currentGrade]?.title}
            </span>
          </div>

          {/* Grid Layout for Quizzes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzesData[currentGrade] && quizzesData[currentGrade].length > 0 ? (
              quizzesData[currentGrade].map((quiz) => (
                <div 
                  key={quiz.id}
                  className="group bg-gradient-to-b from-[#b5cbf0]/05 to-transparent border border-[#b5cbf0]/30 hover:border-[#5d81bd]/50 p-6 rounded-2xl flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-[#5d81bd] font-bold tracking-tight">
                        ID: #{quiz.id}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#071835]/05 text-[#071835]/70 uppercase tracking-wider">
                        {quiz.level}
                      </span>
                    </div>
                    
                    <h3 className="font-extrabold text-base text-[#071835] group-hover:text-[#5d81bd] transition-colors duration-200 leading-snug">
                      {quiz.title}
                    </h3>

                    {/* Small Meta Specs */}
                    <div className="flex items-center gap-4 pt-1 text-[#071835]/60 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#5d81bd]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{quiz.questions} Questions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#5d81bd]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{quiz.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Start Exam Action Button */}
                  <button 
                    onClick={() => alert(`Starting Quiz #${quiz.id}: ${quiz.title}`)}
                    className="w-full py-2 bg-white hover:bg-[#071835] border border-[#071835] text-[#071835] hover:text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-[0.98]"
                  >
                    Start Quiz
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[#071835]/50 text-xs font-mono">
                No active quizzes found for this grade context.
              </div>
            )}
          </div>
        </div>

        {/* ================= FOOTER ANNOUNCEMENT ================= */}
        <div className="bg-[#071835] p-6 rounded-2xl text-center space-y-2">
          <h3 className="text-xs font-mono font-bold text-[#b5cbf0] uppercase tracking-widest">// REALTIME EVALUATION SYSTEM</h3>
          <p className="text-white/70 text-[11px] max-w-xl mx-auto leading-relaxed">
            සියලුම ප්‍රශ්න පත්‍ර අවසානයේ ලකුණු සහ නිවැරදි පිළිතුරු විග්‍රහය (Review Panel) සජීවීව බලාගත හැක.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Quizzes;