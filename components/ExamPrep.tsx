"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState<StudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<"flashcards" | "quiz" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
    setError(null);
  };

  const generateContent = async (mode: "flashcards" | "quiz") => {
    if (!file) return;
    setSessionMode(mode);
    setShowResults(false);
    setCorrectCount(0);
    setIsLoading(true);
    setSessionData([]);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const headers: HeadersInit = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`/api/exam-prep/${mode}/generate`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = data.detail || data.message || `Request failed (${res.status})`;
        setError(message);
        return;
      }

      setSessionData(Array.isArray(data) ? data : data.items ?? data.results ?? []);
      setCurrentIndex(0);
      setIsRevealed(false);
      setSelectedOption(null);
      setShowResults(false);
      setCorrectCount(0);
    } catch (err) {
      console.error("Generation failed", err);
      setError((err as Error).message || "Generation failed");
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
          {sessionData.length > 0 && !showResults && (
            <div className="flex justify-between items-center mb-12">
              {sessionMode && (
                <h1 className="text-2xl font-semibold text-teal-900">
                  {sessionMode === "flashcards" ? "Flashcards" : "Quiz"}
                </h1>
              )}
              {!sessionMode && <div />}
              <div className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full">
                CARD {currentIndex + 1} / {sessionData.length}
              </div>
            </div>
          )}

          {showResults && sessionMode === "quiz" ? (
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-16 min-h-[450px] flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Quiz complete</h2>
              <p className="text-5xl font-bold text-teal-600 mb-8">
                {correctCount} / {sessionData.length}
              </p>
              <p className="text-slate-500 text-lg mb-10">
                You got {correctCount} out of {sessionData.length} questions correct.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowResults(false);
                  setCurrentIndex(0);
                  setCorrectCount(0);
                  setIsRevealed(false);
                  setSelectedOption(null);
                }}
                className="px-8 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 animate-pulse">
              <div className="mb-4 h-12 w-12 rounded-full border-4 border-sky-300 border-t-transparent animate-spin" />
              <p className="text-slate-400 font-medium">Generating your session...</p>
            </div>
          ) : currentItem && !showResults ? (
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
                      type="button"
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
                      type="button"
                      key={opt}
                      onClick={() => !selectedOption && setSelectedOption(opt)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all font-medium ${
                        selectedOption === opt 
                          ? (opt === currentItem.correct_answer ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-red-500 bg-red-50 text-red-700')
                          : (selectedOption && opt === currentItem.correct_answer ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 hover:border-slate-300 text-slate-600')
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {(isRevealed || selectedOption) && (
                <button
                  type="button"
                  onClick={() => {
                    const isQuiz = currentItem.type === "quiz";
                    const isCorrect = isQuiz && selectedOption === currentItem.correct_answer;
                    if (isCorrect) setCorrectCount((c) => c + 1);
                    const isLast = currentIndex + 1 >= sessionData.length;
                    if (isLast && sessionMode === "quiz") {
                      setShowResults(true);
                    } else {
                      setCurrentIndex((prev) => (prev + 1) % sessionData.length);
                    }
                    setIsRevealed(false);
                    setSelectedOption(null);
                  }}
                  className="mt-12 text-slate-400 font-bold flex items-center gap-1 hover:text-slate-600"
                >
                  <span>{sessionMode === "quiz" && currentIndex === sessionData.length - 1 ? "See results" : "Next Item"}</span>
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

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}
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