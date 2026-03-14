"use client";

import React, { useState } from "react";
import { apiUrl } from "@/lib/api";

// 1. Define Types
interface Flashcard {
  type: 'flashcard';
  question: string;
  answer: string;
}

interface Quiz {
  type: 'quiz';
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

type StudyItem = Flashcard | Quiz;

export default function StudyLab() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState<StudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const generateContent = async (mode: 'flashcards' | 'quiz') => {
    if (!file) return;
    setIsLoading(true);
    setSessionData([]);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(apiUrl(`/${mode}/generate`), {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: StudyItem[] = await res.json();
      setSessionData(data);
      setCurrentIndex(0);
      setIsRevealed(false);
      setSelectedOption(null);
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentItem = sessionData[currentIndex];

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <div className="bg-sky-500 px-2 py-1.5 rounded-lg text-white text-xs tracking-wide">
                AI
              </div>
              <span>Flashcard Lab</span>
            </div>
            {sessionData.length > 0 && (
              <div className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full">
                CARD {currentIndex + 1} / {sessionData.length}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 animate-pulse">
              <div className="mb-4 h-12 w-12 rounded-full border-4 border-sky-300 border-t-transparent animate-spin" />
              <p className="text-slate-400 font-medium">Generating your session...</p>
            </div>
          ) : currentItem ? (
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-16 min-h-[450px] flex flex-col items-center justify-center text-center relative">
              <span className="absolute top-10 text-[10px] tracking-[0.2em] font-black text-slate-300 uppercase">
                {currentItem.type}
              </span>
              
              <h2 className="text-3xl font-semibold text-slate-800 mb-10 leading-snug max-w-2xl">
                {currentItem.question}
              </h2>

              {/* Flashcard Logic */}
              {currentItem.type === 'flashcard' && (
                <div className="w-full flex flex-col items-center">
                  {isRevealed ? (
                    <div className="bg-emerald-50 text-emerald-700 p-8 rounded-2xl border border-emerald-100 font-medium text-xl w-full">
                      {currentItem.answer}
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsRevealed(true)}
                      className="bg-[#134e4a] text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Reveal Answer
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* Quiz Logic */}
              {currentItem.type === 'quiz' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                  {currentItem.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => !selectedOption && setSelectedOption(opt)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all font-medium ${
                        selectedOption === opt 
                          ? (opt === currentItem.correct_answer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700')
                          : (selectedOption && opt === currentItem.correct_answer ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-300 text-slate-600')
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {(isRevealed || selectedOption) && (
                <button 
                  onClick={() => {
                    setCurrentIndex(prev => (prev + 1) % sessionData.length);
                    setIsRevealed(false);
                    setSelectedOption(null);
                  }}
                  className="mt-12 text-slate-400 font-bold flex items-center gap-1 hover:text-slate-600"
                >
                  <span>Next Item</span>
                </button>
              )}
            </div>
          ) : (
             <div className="h-96 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px]">
                <p className="text-slate-400">Upload slides to begin your session</p>
             </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-white border-l border-slate-100 p-10">
        <h3 className="font-bold text-slate-900 mb-6 text-lg">Generate New Deck</h3>
        
        <label className="group cursor-pointer block border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-slate-50 hover:border-sky-300 transition-all">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-100">
            <span className="text-slate-400 group-hover:text-sky-500 text-xl font-semibold">
              ↑
            </span>
          </div>
          <p className="text-sm font-bold text-slate-700">{file ? file.name : "Upload Lecture Slides"}</p>
          <p className="text-xs text-slate-400 mt-2">PDF, PPTX or Image up to 50MB</p>
        </label>

        <div className="flex flex-col gap-3 mt-8">
          <button 
            disabled={!file || isLoading}
            onClick={() => generateContent('flashcards')}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm disabled:opacity-30 hover:bg-slate-800 transition-colors"
          >
            Generate Flashcards
          </button>
          <button 
            disabled={!file || isLoading}
            onClick={() => generateContent('quiz')}
            className="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-bold text-sm disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  );
}