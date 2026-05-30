import React, { useState, useEffect } from 'react';

const PapersManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Laravel Backend API URL
  const API_URL = 'http://localhost:8000/api/papers'; 

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    grade: '13',
    year: '2026',
    type: 'Model Paper'
  });

  // File State
  const [selectedFile, setSelectedFile] = useState(null);

 
  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPapers(data);
      } else {
        alert(`Backend Error: ${data.message || 'දත්ත ලබාගත නොහැක!'}`);
      }
    } catch (error) {
      console.error("Detailed Fetch Error:", error);
      alert("ප්‍රශ්න පත්‍ර ලබාගැනීමේදී සේවාදායකය (Server) සමඟ සම්බන්ධ විය නොහැක! කරුණාකර Laravel Server එක Run කර ඇත්දැයි පරීක්ෂා කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('කරුණාකර Paper එකේ නම ඇතුළත් කරන්න!');
    if (!selectedFile) return alert('කරුණාකර ප්‍රශ්න පත්‍රයට අදාළ PDF ෆයිල් එක තෝරන්න!');

    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('grade', formData.grade);
      dataToSend.append('year', formData.year);
      dataToSend.append('type', formData.type);
      dataToSend.append('file', selectedFile);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: dataToSend
      });

      const resData = await response.json();

      if (response.ok) {
        setPapers([resData, ...papers]); 
        setFormData({ title: '', grade: '13', year: '2026', type: 'Model Paper' }); 
        setSelectedFile(null);
        document.getElementById('paperFileInput').value = ''; 
        alert('ප්‍රශ්න පත්‍රය සාර්ථකව පද්ධතියට එකතු කරන ලදී!');
      } else {
        // Validation දෝෂ ඇත්නම් ඒවා වෙන්කර පෙන්වීම
        if (resData.errors) {
          const errorMessages = Object.values(resData.errors).flat().join('\n');
          alert(`ඇතුළත් කිරීම් වැරදියි:\n${errorMessages}`);
        } else {
          alert(`දෝෂයක් සිදු විය: ${resData.message || 'Validation හෝ Server දෝෂයකි.'}`);
        }
      }
    } catch (error) {
      console.error("Error uploading paper:", error);
      alert('සේවාදායකයට සම්බන්ධ වීමට නොහැක! (Upload Failed)');
    }
  };

  // Paper එකක් අයින් කිරීම
  const handleDelete = async (id) => {
    if (confirm('මෙම ප්‍රශ්න පත්‍රය පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });

        const resData = await response.json();

        if (response.ok) {
          setPapers(papers.filter(paper => paper.id !== id));
          alert('ප්‍රශ්න පත්‍රය සාර්ථකව ඉවත් කරන ලදී.');
        } else {
          alert(`ඉවත් කිරීමට නොහැකි විය: ${resData.message}`);
        }
      } catch (error) {
        console.error("Error deleting paper:", error);
        alert('සේවාදායකය සමඟ සම්බන්ධ විය නොහැක!');
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* TOP HEADER */}
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
        
        {/* ADD NEW PAPER FORM */}
        <div className="lg:col-span-4 bg-white border border-[#b5cbf0]/30 rounded-2xl shadow-[0_2px_12px_rgba(7,24,53,0.01)] p-6 h-fit sticky top-20">
          <h3 className="font-bold text-[#071835] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
            Add New Paper
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Paper Title / Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="උදා: 2026 O/L Target Paper"
                className="w-full px-3.5 py-2.5 bg-[#fafbfc] border border-gray-200 focus:border-[#5d81bd] focus:bg-white rounded-xl text-xs font-medium outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 block">Upload Paper (PDF Only)</label>
              <input
                id="paperFileInput"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-2 py-2 bg-[#fafbfc] border border-gray-200 rounded-xl text-xs font-medium outline-none transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#5d81bd]/10 file:text-[#5d81bd] hover:file:bg-[#5d81bd]/20"
              />
            </div>

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

        {/* PAPERS LIST TABLE */}
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400 font-sans">
                      දත්ත පූරණය වෙමින් පවතී (Loading...)...
                    </td>
                  </tr>
                ) : papers.length === 0 ? (
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
                        <a href={paper.file_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-red-500 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                          {paper.title}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">Grade {paper.grade}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-400">{paper.year}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(paper.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
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