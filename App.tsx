
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, Grid, ChevronLeft, ChevronRight, RotateCcw, 
  GraduationCap, Search, Sparkles, Languages, Info
} from 'lucide-react';
import { ALPHABET } from './constants';
import { ViewMode, ArabicLetter } from './types';
import { getLetterNuance } from './services/geminiService';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SEARCH);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Filter letters for Search View
  const filteredAlphabet = useMemo(() => {
    if (!searchTerm) return ALPHABET;
    const term = searchTerm.toLowerCase();
    return ALPHABET.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.trans.toLowerCase().includes(term) ||
      item.char.includes(term)
    );
  }, [searchTerm]);

  const handleNext = () => {
    setIsFlipped(false);
    setAiTip(null);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ALPHABET.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setAiTip(null);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + ALPHABET.length) % ALPHABET.length);
    }, 150);
  };

  const fetchAiTip = async () => {
    setIsLoadingAi(true);
    const letter = ALPHABET[currentIndex];
    const tip = await getLetterNuance(letter.name, letter.trans);
    setAiTip(tip || "Erro ao carregar dica.");
    setIsLoadingAi(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Arabiya</h1>
              <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest">Aprenda o Alfabeto Árabe</p>
            </div>
          </div>
          
          <nav className="flex bg-emerald-800 p-1 rounded-xl overflow-x-auto max-w-full no-scrollbar shadow-inner">
            <button
              onClick={() => setViewMode(ViewMode.SEARCH)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                viewMode === ViewMode.SEARCH ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              <Search size={18} />
              <span className="font-semibold text-sm">Formas</span>
            </button>
            <button
              onClick={() => setViewMode(ViewMode.GRID)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                viewMode === ViewMode.GRID ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              <Grid size={18} />
              <span className="font-semibold text-sm">Tabela</span>
            </button>
            <button
              onClick={() => setViewMode(ViewMode.FLASHCARD)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                viewMode === ViewMode.FLASHCARD ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              <BookOpen size={18} />
              <span className="font-semibold text-sm">Cards</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Search & Detailed Forms View */}
        {viewMode === ViewMode.SEARCH && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">
                  Encontre uma letra pelo nome ou som
                </label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={22} />
                  <input 
                    type="text" 
                    placeholder="Ex: Ba, Jim, q..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                    autoFocus
                  />
                </div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 max-w-sm text-sm text-emerald-800 flex gap-3">
                <Info className="flex-shrink-0" size={20} />
                <p>O árabe é escrito da <b>direita para a esquerda</b> e a maioria das letras muda de forma dependendo da posição.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {filteredAlphabet.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-400 text-lg">Nenhuma letra encontrada com "{searchTerm}".</p>
                </div>
              ) : (
                filteredAlphabet.map((item, index) => (
                  <LetterDetailCard key={index} item={item} />
                ))
              )}
            </div>
          </div>
        )}

        {/* Grid Table View */}
        {viewMode === ViewMode.GRID && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Visão Geral do Abjad</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                O alfabeto árabe contém 28 letras básicas. Explore a sonoridade e o significado de cada uma.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {ALPHABET.map((item, index) => (
                <div key={index} className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 hover:border-emerald-300 group cursor-default">
                  <div className="text-7xl mb-4 font-arabic text-emerald-700 group-hover:scale-125 transition-transform duration-500 ease-out">
                    {item.char}
                  </div>
                  <div className="font-bold text-xl text-slate-800 group-hover:text-emerald-800 transition-colors">{item.name}</div>
                  <div className="text-sm font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1">/{item.trans}/</div>
                  <div className="text-xs text-slate-500 leading-tight mt-3 font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flashcard Learning View */}
        {viewMode === ViewMode.FLASHCARD && (
          <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Treine sua Memória</h2>
              <p className="text-slate-500">Teste seus conhecimentos visualizando a letra e tentando lembrar o nome.</p>
            </div>
            
            <div 
              className="perspective-1000 relative h-[450px] w-full cursor-pointer group" 
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border-4 border-emerald-50 flex flex-col items-center justify-center p-12">
                  <span className="absolute top-8 text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">RECONHEÇA A LETRA</span>
                  <div className="text-[12rem] text-emerald-700 font-arabic leading-none">{ALPHABET[currentIndex].char}</div>
                  <div className="absolute bottom-8 flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                    <Sparkles size={16} />
                    <span>Clique para revelar</span>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-emerald-700 rounded-[2.5rem] shadow-2xl border-4 border-emerald-600 flex flex-col items-center justify-center p-12 text-center text-white">
                  <span className="absolute top-8 text-xs font-bold text-emerald-200 uppercase tracking-[0.3em]">VOCÊ ACERTOU?</span>
                  
                  <h2 className="text-6xl font-black mb-2 tracking-tight">{ALPHABET[currentIndex].name}</h2>
                  <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-emerald-50 font-mono text-2xl mb-8 border border-white/20">
                    /{ALPHABET[currentIndex].trans}/
                  </div>
                  
                  <p className="text-emerald-50/90 text-lg leading-relaxed max-w-sm mb-8">
                    {ALPHABET[currentIndex].desc}
                  </p>

                  <div className="flex gap-4 items-center justify-center">
                    <div className="p-3 bg-white/10 rounded-2xl flex flex-col items-center min-w-[80px]">
                      <span className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Início</span>
                      <span className="text-3xl font-arabic">{ALPHABET[currentIndex].forms.initial}</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl flex flex-col items-center min-w-[80px]">
                      <span className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Meio</span>
                      <span className="text-3xl font-arabic">{ALPHABET[currentIndex].forms.medial}</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl flex flex-col items-center min-w-[80px]">
                      <span className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Fim</span>
                      <span className="text-3xl font-arabic">{ALPHABET[currentIndex].forms.final}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tutor Integration */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Sparkles size={20} className="fill-emerald-700" />
                    <h3 className="font-bold">Dica da IA Tutor</h3>
                  </div>
                  {!aiTip && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); fetchAiTip(); }}
                      disabled={isLoadingAi}
                      className="text-sm font-semibold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                    >
                      {isLoadingAi ? "Pensando..." : "Gerar Explicação"}
                    </button>
                  )}
               </div>
               {aiTip ? (
                 <p className="text-slate-600 leading-relaxed italic animate-in fade-in slide-in-from-left-4 duration-500">
                  "{aiTip}"
                 </p>
               ) : (
                 <p className="text-slate-400 text-sm">Quer saber mais sobre a pronúncia real desta letra? Peça uma dica para o nosso Tutor IA.</p>
               )}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-10">
              <button 
                onClick={handlePrev}
                className="group flex items-center gap-2 pr-6 pl-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm active:scale-95"
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">Anterior</span>
              </button>
              
              <div className="bg-slate-800 text-white px-4 py-1.5 rounded-full font-mono font-bold text-sm shadow-lg">
                {currentIndex + 1} / {ALPHABET.length}
              </div>

              <button 
                onClick={handleNext}
                className="group flex items-center gap-2 pl-6 pr-4 py-3 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-900/20 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <span className="font-bold">Próximo</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

             <div className="mt-12 flex justify-center">
                <button 
                    onClick={() => { setCurrentIndex(0); setIsFlipped(false); setAiTip(null); }}
                    className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                >
                    <RotateCcw size={16} />
                    Reiniciar Prática
                </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <Languages size={20} className="text-emerald-600" />
              <span className="font-bold text-slate-800 text-lg">Arabiya Learning</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Uma jornada imersiva pelo idioma árabe. Desenvolvido para simplificar a alfabetização com tecnologia e design.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Status de Estudo</span>
            <div className="bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full font-bold text-sm border border-emerald-100">
              Bi-t-tawfiq! (Boa Sorte!)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for Search view
const LetterDetailCard: React.FC<{ item: ArabicLetter }> = ({ item }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-200 group hover:shadow-xl transition-all duration-500">
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 bg-slate-50/50">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-black text-slate-900">{item.name}</h3>
            <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full border border-emerald-200">/{item.trans}/</span>
          </div>
          <p className="text-slate-600 max-w-md font-medium text-lg leading-tight">{item.desc}</p>
        </div>
        <div className="text-[8rem] leading-none font-arabic text-emerald-700 group-hover:scale-110 transition-transform duration-700">{item.char}</div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-px bg-slate-200 flex-1"></span>
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">As 4 Variações de Escrita</span>
          <span className="h-px bg-slate-200 flex-1"></span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormBlock title="Final" char={item.forms.final} meta={`...${item.trans}`} />
          <FormBlock title="Medial" char={item.forms.medial} meta={`...${item.trans}...`} />
          <FormBlock title="Inicial" char={item.forms.initial} meta={`${item.trans}...`} />
          <FormBlock title="Isolada" char={item.forms.isolated} meta={item.trans} highlight />
        </div>

        {item.example && (
          <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-2xl font-arabic text-emerald-800">
                {item.example.word}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Exemplo de Palavra</span>
                <span className="text-slate-800 font-bold text-lg">{item.example.meaning}</span>
              </div>
            </div>
            <Languages size={24} className="text-slate-200" />
          </div>
        )}
      </div>
    </div>
  );
};

const FormBlock: React.FC<{ title: string, char: string, meta: string, highlight?: boolean }> = ({ title, char, meta, highlight }) => (
  <div className={`flex flex-col items-center p-6 rounded-3xl transition-all ${highlight ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 scale-105' : 'bg-slate-50 text-slate-800 border border-slate-100 hover:border-emerald-200 hover:bg-white'}`}>
    <span className={`text-[10px] uppercase font-black tracking-widest mb-3 ${highlight ? 'text-emerald-200' : 'text-slate-400'}`}>{title}</span>
    <div className="h-20 flex items-center justify-center text-5xl font-arabic">{char}</div>
    <span className={`text-xs mt-3 font-mono ${highlight ? 'text-emerald-100' : 'text-slate-500 opacity-60'}`}>{meta}</span>
  </div>
);

export default App;
