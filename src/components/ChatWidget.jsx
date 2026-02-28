import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from 'astro:transitions/client';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('marea_chat_is_open');
      return saved === 'true';
    }
    return false;
  });

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('marea_chat_is_open', isOpen);
    }
  }, [isOpen]);
  
  const defaultMessages = [
    { 
      role: 'assistant', 
      content: '¡Hola! Soy tu asistente IA de Marea Creativa. Estoy aquí para guiarte por la web, mostrarte nuestro trabajo o agendar una llamada contigo. ¿Por dónde empezamos?',
      isInitial: true 
    }
  ];

  const actionChips = [
    { label: '🚀 Servicios', query: 'Muéstrame los servicios que ofrecéis en Marea Creativa' },
    { label: '✨ Proyectos', query: 'Quiero ver algunos de vuestros proyectos destacados' },
    { label: '📞 ¿Te llamamos?', query: 'Me gustaría que me llamaseis para hablar de mi proyecto' }
  ];

  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('marea_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return defaultMessages;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fatalError, setFatalError] = useState(false);
  const [toast, setToast] = useState(null);
  const toastCount = useRef(0);
  const chatContainerRef = useRef(null);

  const handleChipClick = (query) => {
    if (isLoading) return;
    processMessage(query);
  };

  const processMessage = async (text) => {
    const userMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.map(m => ({ role: m.role, content: m.content })), userMessage],
        }),
      });

      if (!response.ok) throw new Error('Error crítico en el endpoint');
      const data = await response.json();
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: data.reply }
      ]);

      if (data.navigateTo) {
        setTimeout(() => navigate(data.navigateTo), 1500);
      }

      if (data.telegramSent === true) {
        showToast('✅ Datos enviados correctamente', 'success');
      } else if (data.telegramSent === false) {
        showToast('⚠️ Hubo un problema enviando los datos.', 'error');
      }

    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Lo siento, ha ocurrido un error de conexión. ¿Podrías intentarlo de nuevo?' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    processMessage(input);
  };

  const showToast = (message, type = 'success') => {
    toastCount.current += 1;
    setToast({ message, type, id: toastCount.current });
    setTimeout(() => setToast(null), 4000);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('marea_chat_history', JSON.stringify(messages));
    }
  }, [messages, isOpen]);

  if (fatalError) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end max-w-[calc(100vw-3rem)]">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(15px)' }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="backdrop-blur-3xl bg-zinc-950/95 border-2 border-primary/60 shadow-[0_0_50px_rgba(14,68,249,0.3)] w-full sm:w-[400px] flex flex-col rounded-[2.5rem] overflow-hidden mb-6"
          >
            {/* Minimalist Premium Header */}
            <div className="px-6 pt-6 pb-2 flex justify-between items-center bg-gradient-to-b from-white/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(14,68,249,0.3)]">
                    <span className="text-[12px] font-black tracking-tight text-white uppercase">
                      IA
                    </span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-950 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/90">Marea Assistant AI</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-primary drop-shadow-[0_0_3px_rgba(14,68,249,0.5)]">Activo - Beta Test</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content Area - Optimized for Assistant Role */}
            <div className="px-6 py-5 min-h-[100px] max-h-[400px] overflow-y-auto scroll-smooth [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex gap-1.5">
                      <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(14,68,249,0.4)]" />
                      <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(14,68,249,0.4)]" />
                      <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(14,68,249,0.4)]" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={messages.length}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Solo mostramos la última respuesta si no es el mensaje inicial, o el mensaje inicial si es el primero */}
                    {messages.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <div className={`p-5 rounded-[2rem] text-[15.5px] font-medium leading-[1.6] transition-all duration-700 ${
                          messages[messages.length - 1].role === 'user'
                          ? 'bg-gradient-to-br from-primary via-primary-700 to-indigo-900 text-white rounded-br-none ml-auto max-w-[90%] shadow-xl shadow-primary/20 border border-white/10'
                          : 'bg-white/5 backdrop-blur-md text-zinc-100 rounded-tl-none border border-white/10 shadow-inner'
                        }`}>
                          {messages[messages.length - 1].content}
                        </div>

                        {/* Chips interactivos solo si el último mensaje es del asistente y es el inicial */}
                        {messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].isInitial && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {actionChips.map((chip, i) => (
                              <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                onClick={() => handleChipClick(chip.query)}
                                className="px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-zinc-300 hover:text-white rounded-full text-[12px] font-semibold transition-all duration-300"
                              >
                                {chip.label}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Input Area */}
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="relative flex items-center group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="¿En qué puedo ayudarte?"
                  className="w-full relative z-10 bg-white/5 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-primary/40 text-[16px] transition-all placeholder:text-zinc-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 z-20 w-11 h-11 flex items-center justify-center bg-gradient-to-tr from-primary to-indigo-600 text-white rounded-full disabled:opacity-20 transition-all hover:scale-110 active:scale-90 shadow-lg shadow-primary/30"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - The "Heart" of the UI */}
      <div className="relative">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-primary/30 rounded-full animate-pulse-slow"
              style={{ filter: 'blur(10px)' }}
            />
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-500 text-white border-2 shadow-[0_0_40px_rgba(14,68,249,0.5)] ${
            isOpen 
            ? 'bg-zinc-900 border-primary/70 rotate-180 shadow-none' 
            : 'bg-zinc-950 border-primary shadow-primary/30'
          }`}
          aria-label="Toggle Asistente"
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare size={34} className="text-primary fill-primary/10 drop-shadow-[0_0_10px_rgba(14,68,249,0.5)]" />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-tighter text-white drop-shadow-md pb-0.5">
                IA
              </span>
            </div>
          )}
          {/* Subtle Glow Overlay */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* Improved Toast */}
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xl backdrop-blur-md ${
              toast.type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
