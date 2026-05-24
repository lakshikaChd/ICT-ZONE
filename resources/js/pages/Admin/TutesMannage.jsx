import React, { useState } from 'react';

const TutesMannage = () => {
  // දැනට තියෙන Dummy Data (පස්සේ Database එකට සම්බන්ධ කරන්න පුළුවන්)
  const [tutes, setTutes] = useState([
    { id: 1, title: 'Introduction to Python Programming Theory', grade: '11', lesson: '05', status: 'Active' },
    { id: 2, title: 'HTML & CSS Complete Web Designing Guide', grade: '10', lesson: '03', status: 'Active' },
    { id: 3, title: 'Database Management Systems (DBMS) & SQL', grade: '13', lesson: '08', status: 'Draft' },
  ]);

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    grade: '11',
    lesson: '',
    status: 'Active'
  });

  // Input වෙනස් වෙද්දී State එක update කිරීම
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // නව Tute එකක් එකතු කිරීම
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('කරුණාකර Tute එකේ නම ඇතුළත් කරන්න!');
    if (!formData.lesson.trim()) return alert('කරුණාකර පාඩමේ අංකය (Lesson No) ඇතුළත් කරන්න!');

    const newTute = {
      id: Date.now(),
      title: formData.title,
      grade: formData.grade,
      lesson: formData.lesson.padStart(2, '0'), // 5 දැම්මොත් 05 විදිහට පෙන්වන්න
      status: formData.status
    };

    setTutes([newTute, ...tutes]); // ලැයිස්තුවේ උඩටම එකතු කරනවා
    setFormData({ title: '', grade: '11', lesson: '', status: 'Active' }); // Form එක reset කිරීම
  };

  // Tute එකක් Delete කිරීම
  const handleDelete = (id) => {
    if (confirm('මෙම නිබන්ධනය (Tute) පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද?')) {
      setTutes(tutes.filter(tute => tute.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-[0_2px_12px_rgba(7,24,53,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase text-[#071835]">Manage Tutes</h2>
          <p className="text-xs text-gray-500 mt-1">සිසුන් සඳහා නව නිබන්ධන (Lecture Notes) ඇතුළත් කිරීම සහ කළමනාකරණය.</p>
        </div>
        <span className="text-[10px] font-mono text-[#5d81bd] bg-[#5d81bd]/10 px-3 py-1.5 rounded-lg font-bold w-fit">
          TOTAL TUTES: {tutes.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= 2. ADD NEW TUTE FORM ================= */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 h-fit sticky top-20">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Create New Tute
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tute Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Tute Title / Topic</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="उदा: Data Communication Lecture Note"
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

              {/* Lesson Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Lesson No</label>
                <input
                  type="number"
                  name="lesson"
                  value={formData.lesson}
                  onChange={handleInputChange}
                  placeholder="e.g. 1, 2, 3"
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Status (Visibility) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Visibility Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
              >
                <option value="Active">Active (සිසුන්ට පෙනේ)</option>
                <option value="Draft">Draft (සුරැක තිබේ - සඟවන්න)</option>
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
              Save & Publish Tute
            </button>
          </form>
        </div>

        {/* ================= 3. TUTES LIST TABLE ================= */}
        <div className="lg:col-span-8 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Uploaded Tutes List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-[10px] uppercase tracking-wider bg-gray-50/70 rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Lesson</th>
                  <th className="py-3 px-4">Tute Title</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#071835]/90">
                {tutes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400 font-sans">
                      තවමත් කිසිදු නිබන්ධනයක් ඇතුළත් කර නොමැත.
                    </td>
                  </tr>
                ) : (
                  tutes.map((tute) => (
                    <tr key={tute.id} className="hover:bg-[#fafbfc] transition-colors group">
                      <td className="py-3.5 px-4 font-mono text-[#5d81bd] font-bold">
                        #{tute.lesson}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-gray-700 max-w-[220px] truncate group-hover:text-[#5d81bd] transition-colors">
                        {tute.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">Grade {tute.grade}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          tute.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                          {tute.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(tute.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                          title="Delete Tute"
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

export default TutesMannage;