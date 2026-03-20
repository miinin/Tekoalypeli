import React, { useState } from 'react';
import { Zap, CheckCircle2, XCircle, AlertCircle, CheckSquare, Square, Image as ImageIcon, ArrowUp, ChevronRight } from 'lucide-react';

export const Quiz = ({ categoryId, onFinish }) => {
  const mockQuestions = {
    tech: [
      {
        id: 1,
        type: 'multiple-choice',
        text: "Mitä tekoäly (AI) oikeastaan tarkoittaa?",
        options: [
          "Robottia, jolla on oikeita ihmisen tunteita.",
          "Tietokoneohjelmaa, joka osaa oppia datasta ja tehdä päätöksiä.",
          "Uutta koodauskieltä, jolla tehdään videopelejä."
        ],
        correctAnswer: 1,
        explanation: "Tekoäly on tietokoneohjelma, joka on suunniteltu oppimaan ja ratkaisemaan ongelmia. Sillä ei ole oikeita tunteita.",
        reward: 10
      },
      {
        id: 2,
        type: 'true-false',
        text: "Totta vai tarua: Tekoäly voi itse päättää, mikä on oikein ja väärin.",
        options: ["Totta", "Tarua"],
        correctAnswer: 1,
        explanation: "Tarua. Tekoälyllä ei ole omaa moraalia. Se tekee päätöksiä vain sen datan ja niiden sääntöjen perusteella, joita ihmiset ovat sille antaneet.",
        reward: 10
      },
      {
        id: 3,
        type: 'multiple-select',
        text: "Valitse KAIKKI asiat, joissa nykypäivänä hyödynnetään yleisesti tekoälyä:",
        options: [
          "Hakukoneet (esim. Google)",
          "Tavallinen puinen lyijykynä",
          "Kasvojentunnistus puhelimessa",
          "Paperinen sanakirja"
        ],
        correctAnswer: [0, 2], // Indeksit oikeista vastauksista
        explanation: "Hakukoneet ja kasvojentunnistus käyttävät edistyneitä tekoälymalleja. Kynä ja paperinen kirja ovat fyysisiä esineitä ilman tietotekniikkaa.",
        reward: 20
      },
      {
        id: 4,
        type: 'ordering',
        text: "Laita tekoälyn opettamisen vaiheet loogiseen järjestykseen:",
        options: [
          "Tekoälymallin testaus",
          "Datan kerääminen (esim. kuvia kissoista)",
          "Mallin käyttö sovelluksessa",
          "Tekoälyn kouluttaminen datalla"
        ],
        correctAnswer: [1, 3, 0, 2], // Indeksit oikeassa järjestyksessä
        explanation: "Ensin kerätään data, sitten koulutetaan, sitten testataan että se toimii, ja lopuksi sitä voidaan käyttää!",
        reward: 25
      },
      {
        id: 5,
        type: 'image-recognition',
        text: "Kumpaan tarkoitukseen tämä kyseinen robottikäsi on todennäköisesti ohjelmoitu tekoälyn avulla?",
        imageUrl: "placeholder-robot", // Oikeassa elämässä tähän tulisi URL
        options: [
          "Teollisuuden kokoonpanolinjalle autojen rakentamiseen.",
          "Koirien ulkoiluttamiseen puistossa."
        ],
        correctAnswer: 0,
        explanation: "Robottikäsiä käytetään teollisuudessa tarkkaan toistotyöhön, jota tekoäly ja konenäkö ohjaavat. Koirien ulkoiluttamiseen ne eivät sovi!",
        reward: 15
      }
    ],
    security: [], ethics: [], history: []
  };

  const questions = mockQuestions[categoryId] || [];
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [earnedBytes, setEarnedBytes] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  // Alustetaan state fiksusti riippuen ensimmäisen kysymyksen tyypistä
  const [userAnswer, setUserAnswer] = useState(() => {
    const q = questions[0];
    return (q && (q.type === 'multiple-select' || q.type === 'ordering')) ? [] : null;
  });

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <AlertCircle className="mx-auto text-amber-500 mb-4" size={48} />
          <h2 className="text-3xl font-bebas text-gray-800 mb-4">Kategoria on vielä rakenteilla!</h2>
          <p className="text-gray-600 mb-8 font-roboto">Tähän kategoriaan ei ole vielä lisätty kysymyksiä.</p>
          <button onClick={() => onFinish(0)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
            Palaa aulaan
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  // Käsittelee klikkaukset turvallisesti
  const handleOptionClick = (index) => {
    if (isAnswerSubmitted) return;

    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' || currentQuestion.type === 'image-recognition') {
      setUserAnswer(index);
      submitAnswer(index);
    } 
    else if (currentQuestion.type === 'multiple-select' || currentQuestion.type === 'ordering') {
      setUserAnswer(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        if (safePrev.includes(index)) return safePrev.filter(i => i !== index);
        return [...safePrev, index];
      });
    }
  };

  // Vastausten tarkistuslogiikka
  const submitAnswer = (overrideAnswer = null) => {
    if (isAnswerSubmitted) return;
    
    const answerToCheck = overrideAnswer !== null ? overrideAnswer : userAnswer;
    let correct = false;

    if (currentQuestion.type === 'multiple-select') {
      const safeAnswer = Array.isArray(answerToCheck) ? answerToCheck : [];
      const sortedUser = [...safeAnswer].sort();
      const sortedCorrect = [...currentQuestion.correctAnswer].sort();
      correct = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
    } 
    else if (currentQuestion.type === 'ordering') {
      const safeAnswer = Array.isArray(answerToCheck) ? answerToCheck : [];
      if (safeAnswer.length !== currentQuestion.options.length) return; // Estää tahattoman klikkauksen
      correct = JSON.stringify(safeAnswer) === JSON.stringify(currentQuestion.correctAnswer);
    } 
    else {
      correct = answerToCheck === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    if (correct) {
      setEarnedBytes(prev => prev + currentQuestion.reward);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onFinish(earnedBytes);
    } else {
      const nextIndex = currentQIndex + 1;
      const nextQ = questions[nextIndex];
      setCurrentQIndex(nextIndex);
      
      setUserAnswer((nextQ && (nextQ.type === 'multiple-select' || nextQ.type === 'ordering')) ? [] : null);
      setIsAnswerSubmitted(false);
      setIsCorrect(false);
    }
  };

  // Renderöintifunktio eri kysymystyypeille
  const renderQuestionOptions = () => {
    
    // 1 & 2. YKSITTÄISVALINTA (Monivalinta, Totta/Tarua, Kuva)
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' || currentQuestion.type === 'image-recognition') {
      return (
        <div className="space-y-3">
          {currentQuestion.type === 'image-recognition' && (
            <div className="bg-slate-100 rounded-xl w-full h-48 md:h-64 mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center text-slate-400">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p className="font-bold">Kuva: {currentQuestion.imageUrl}</p>
                <p className="text-sm">Tässä näytetään kuva teollisuusrobotista</p>
              </div>
            </div>
          )}
          {currentQuestion.options.map((option, index) => {
            let buttonStyle = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200";
            let icon = null;

            if (isAnswerSubmitted) {
              if (index === currentQuestion.correctAnswer) {
                buttonStyle = "bg-green-100 border-green-500 text-green-800 font-medium shadow-sm";
                icon = <CheckCircle2 className="text-green-600" size={24} />;
              } else if (index === userAnswer) {
                buttonStyle = "bg-red-50 border-red-300 text-red-700 opacity-70";
                icon = <XCircle className="text-red-500" size={24} />;
              } else {
                buttonStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 ${buttonStyle} ${!isAnswerSubmitted && 'active:scale-[0.98]'}`}
              >
                <span className="text-lg leading-relaxed">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      );
    }

    // 3. MONIVALINTA (Useita oikeita)
    if (currentQuestion.type === 'multiple-select') {
      const safeUserAnswer = Array.isArray(userAnswer) ? userAnswer : [];
      
      return (
        <div className="space-y-4">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = safeUserAnswer.includes(index);
              let boxStyle = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200";
              
              if (isAnswerSubmitted) {
                const isCorrectOption = currentQuestion.correctAnswer.includes(index);
                if (isCorrectOption) {
                  boxStyle = "bg-green-100 border-green-500 text-green-800 font-medium";
                } else if (isSelected && !isCorrectOption) {
                  boxStyle = "bg-red-50 border-red-300 text-red-700 opacity-70";
                } else {
                  boxStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                }
              } else if (isSelected) {
                 boxStyle = "bg-green-50 border-green-500 text-green-800";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${boxStyle}`}
                >
                  {isSelected ? <CheckSquare className="text-green-600 shrink-0" /> : <Square className="text-gray-400 shrink-0" />}
                  <span className="text-lg leading-relaxed">{option}</span>
                  
                  {isAnswerSubmitted && currentQuestion.correctAnswer.includes(index) && <CheckCircle2 className="text-green-600 ml-auto" size={20} />}
                </button>
              );
            })}
          </div>
          {!isAnswerSubmitted && (
            <button onClick={() => submitAnswer()} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-md mt-4">
              Lukitse vastaus
            </button>
          )}
        </div>
      );
    }

    // 4. JÄRJESTÄMINEN
    if (currentQuestion.type === 'ordering') {
      const selectedIndices = Array.isArray(userAnswer) ? userAnswer : [];
      const availableIndices = currentQuestion.options.map((_, i) => i).filter(i => !selectedIndices.includes(i));

      return (
        <div className="space-y-6">
          {/* Pelaajan valitsema järjestys */}
          <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300 min-h-[120px]">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Sinun järjestyksesi:</h4>
            <div className="space-y-2">
              {selectedIndices.map((index, order) => (
                <button 
                  key={`sel-${index}`}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3 bg-white border border-green-300 shadow-sm rounded-lg flex items-center gap-3 ${isAnswerSubmitted ? (currentQuestion.correctAnswer[order] === index ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : 'hover:bg-red-50 hover:border-red-200 cursor-pointer'}`}
                >
                  <div className="bg-green-100 text-green-800 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">{order + 1}</div>
                  <span className="text-gray-800">{currentQuestion.options[index]}</span>
                  {isAnswerSubmitted && currentQuestion.correctAnswer[order] === index && <CheckCircle2 className="text-green-600 ml-auto shrink-0" size={18} />}
                  {isAnswerSubmitted && currentQuestion.correctAnswer[order] !== index && <XCircle className="text-red-500 ml-auto shrink-0" size={18} />}
                </button>
              ))}
              {selectedIndices.length === 0 && <p className="text-gray-400 text-center italic py-4">Klikkaa alla olevia vaihtoehtoja siirtääksesi ne tähän järjestykseen.</p>}
            </div>
          </div>

          {/* Jäljellä olevat vaihtoehdot */}
          {!isAnswerSubmitted && availableIndices.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Vaihtoehdot:</h4>
              <div className="space-y-2">
                {availableIndices.map((index) => (
                  <button 
                    key={`av-${index}`}
                    onClick={() => handleOptionClick(index)}
                    className="w-full text-left p-3 bg-white border border-gray-200 shadow-sm rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className="text-gray-700">{currentQuestion.options[index]}</span>
                    <ArrowUp className="text-gray-400" size={18} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isAnswerSubmitted && selectedIndices.length === currentQuestion.options.length && (
            <button onClick={() => submitAnswer()} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-md mt-4 animate-in fade-in">
              Lukitse järjestys
            </button>
          )}

          {/* Jos järjestys meni väärin, näytetään oikea ratkaisu palautteessa */}
          {isAnswerSubmitted && !isCorrect && (
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3">Oikea järjestys oli:</h4>
              <div className="space-y-2">
                {currentQuestion.correctAnswer.map((index, order) => (
                  <div key={`corr-${index}`} className="flex items-center gap-3 p-2 text-sm text-gray-700 bg-white rounded-lg border border-amber-100">
                    <div className="bg-amber-100 text-amber-800 font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs">{order + 1}</div>
                    <span>{currentQuestion.options[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-roboto">
      {/* Edistymispalkki */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 font-bold mb-2 uppercase tracking-wider">
          <span>Kysymys {currentQIndex + 1} / {questions.length}</span>
          <span className="text-green-600 flex items-center gap-1"><Zap size={16} /> +{earnedBytes} Tavua</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Kysymyskortti */}
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-md">
            {currentQuestion.type === 'multiple-choice' && 'Monivalinta'}
            {currentQuestion.type === 'true-false' && 'Totta vai Tarua'}
            {currentQuestion.type === 'multiple-select' && 'Valitse kaikki oikeat'}
            {currentQuestion.type === 'ordering' && 'Laita järjestykseen'}
            {currentQuestion.type === 'image-recognition' && 'Tunnista kuvasta'}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        {renderQuestionOptions()}
      </div>

      {/* Välitön palaute (Infolaatikko) */}
      {isAnswerSubmitted && (
        <div className={`p-6 rounded-2xl mb-6 shadow-md border-l-8 animate-in fade-in slide-in-from-bottom-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-amber-50 border-amber-500'}`}>
          <div className="flex items-start gap-4">
            <div className="mt-1 shrink-0">
              {isCorrect 
                ? <CheckCircle2 className="text-green-600" size={32} />
                : <AlertCircle className="text-amber-500" size={32} />
              }
            </div>
            <div>
              <h3 className={`text-xl font-bebas tracking-wide mb-2 ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                {isCorrect ? 'Oikein! +'+currentQuestion.reward+' Tavua' : 'Ehkä ensi kerralla!'}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seuraava-painike */}
      {isAnswerSubmitted && (
        <button 
          onClick={handleNext}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-5 px-6 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 text-xl tracking-wide"
        >
          {isLastQuestion ? 'Päätä visailu ja kerää tavut' : 'Seuraava kysymys'} <ChevronRight />
        </button>
      )}
    </div>
  );
};