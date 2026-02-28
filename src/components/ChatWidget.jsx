import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('marea_chat_is_open', isOpen);
    }
  }, [isOpen]);
  
  const defaultMessages = [
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Marea Creativa. ¿En qué te puedo ayudar?' }
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
  const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }
  const chatContainerRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('marea_chat_history', JSON.stringify(messages));
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
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
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Error crítico en el endpoint');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: data.reply }
      ]);

      if (data.navigateTo) {
        setTimeout(() => {
          navigate(data.navigateTo);
        }, 1500);
      }

      // Toast de confirmación de Telegram cuando hay lead
      if (data.telegramSent === true) {
        showToast('✅ Datos enviados al equipo correctamente', 'success');
      } else if (data.telegramSent === false) {
        showToast('⚠️ Hubo un problema enviando los datos. Intenta llamarnos directamente.', 'error');
      }

    } catch (error) {
      console.error('Error enviando mensaje:', error);
      // Notificarle al usuario en el chat
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Lo siento, ha ocurrido un error grave de conexión.' }
      ]);
      // Ocultar el chat después de unos segundos porque se rompió
      setTimeout(() => {
        setFatalError(true);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (fatalError) {
    return null; // El chat desaparece de la UI si hay un error no manejable
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Toast de confirmación Telegram */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className={`mb-3 px-4 py-2 rounded-xl text-sm font-medium shadow-lg text-white max-w-[280px] text-center ${
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-[350px] max-w-[calc(100vw-3rem)] max-h-[80vh] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Marea Asistente</h3>
                  <p className="text-xs text-white/80">Respondemos al instante</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto h-[350px] flex flex-col gap-3 bg-gray-50 dark:bg-zinc-950/50 text-sm"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-zinc-800 dark:text-zinc-200 text-gray-800 shadow-sm border border-gray-100 dark:border-zinc-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-gray-500">Escribiendo...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-primary hover:bg-primary/90'} text-white rounded-full p-4 shadow-xl transition-colors flex items-center justify-center`}
        aria-label="Abrir chat de asistencia"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
