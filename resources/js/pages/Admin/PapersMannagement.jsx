import React, { useState } from 'react';

const PapersManagement = () => {
  // දැනට තියෙන Dummy Data (පස්සේ Database එකෙන් ගන්න පුළුවන්)
  const [papers, setPapers] = useState([
    { id: 1, title: '2025 A/L ICT Model Paper', grade: '13', year: '2025', type: 'Model Paper' },
    { id: 2, title: 'Grade 11 ICT 1st Term Evaluation', grade: '11', year: '2026', type: 'Term Paper' },
    { id: 3, title: 'Logic Gates & Flowcharts Revision Paper', grade: '12', year: '2025', type: 'Revision' },
  ]);

  // Form එකේ දත්ත තියාගන්න State එක
  const [formData, setFormData] = useState({
    title: '',
    grade: '13',
    year: '2026',
    type: 'Model Paper'
  });

  // Input වෙනස් වෙද්දී State එක update කරන්න
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // නව Paper එකක් එකතු කිරීම (Submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('කරුණාකර Paper එකේ නම ඇතුළත් කරන්න!');

    const newPaper = {
      id: Date.now(), // දැනට තාවකාලික ID එකක්
      title: formData.title,
      grade: formData.grade,
      year: formData.year,
      type: formData.type
    };

    setPapers([newPaper, ...papers]); // අලුත් එක උඩටම එකතු කරනවා
    setFormData({ title: '', grade: '13', year: '2026', type: 'Model Paper' }); // Form එක reset කරනවා
  };

  // Paper එකක් අයින් කිරීම (Delete)
  const handleDelete = (id) => {
    if (confirm('මෙම ප්‍රශ්න පත්‍රය පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද?')) {
      setPapers(papers.filter(paper => paper.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-[#b5cbf0]/30 shadow-[0_2px_12px_rgba(7,24,53,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase text-[#071835]">Manage Exam Papers</h2>
          <p className="text-xs text-gray-500 mt-1">පද්ධතියට නව ප්‍රශ්න පත්‍ර එකතු කිරීම සහ කළමනාකරණය.</p>
        </div>
        <span className="text-[10px] font-mono text-[#5d81bd] bg-[#5d81bd]/10 px-3 py-1.5 rounded-lg font-bold w-fit">
          TOTAL PAPERS: {papers.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= 2. ADD NEW PAPER FORM ================= */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 h-fit sticky top-20">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Add New Paper
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Paper Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Paper Title / Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="उदा: 2026 A/L Target Paper"
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

              {/* Year */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 block">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>

            {/* Paper Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Paper Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-semibold outline-none transition-all"
              >
                <option value="Model Paper">Model Paper (ආදර්ශ ප්‍රශ්න පත්‍ර)</option>
                <option value="Term Paper">Term Paper (වාර විභාග ප්‍රශ්න පත්‍ර)</option>
                <option value="Past Paper">Past Paper (පසුගිය විභාග ප්‍රශ්න පත්‍ර)</option>
                <option value="Revision">Revision Paper (පුනරීක්ෂණ ප්‍රශ්න පත්‍ර)</option>
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
              Save & Upload Paper
            </button>
          </form>
        </div>

        {/* ================= 3. PAPERS LIST TABLE ================= */}
        <div className="lg:col-span-8 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Uploaded Papers List
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-[10px] uppercase tracking-wider bg-gray-50/70 rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Type</th>
                  <th className="py-3 px-4">Paper Title</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4 rounded-r-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#071835]/90">
                {papers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400 font-sans">
                      තවමත් කිසිදු ප්‍රශ්න පත්‍රයක් ඇතුළත් කර නොමැත.
                    </td>
                  </tr>
                ) : (
                  papers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-[#fafbfc] transition-colors group">
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          paper.type === 'Past Paper' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          paper.type === 'Model Paper' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                          'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {paper.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-gray-700 max-w-[220px] truncate group-hover:text-[#5d81bd] transition-colors">
                        {paper.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">Grade {paper.grade}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-400">{paper.year}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(paper.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                          title="Delete Paper"
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

export default PapersManagement;