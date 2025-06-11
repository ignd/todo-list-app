import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'Première tâche', completed: false, createdAt: new Date() }
    ];
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: input,
        completed: false,
        createdAt: new Date()
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 text-red-900 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-red-200">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-6"
        >
          🦁 Mes Taches 🦁
          
        </motion.h1>

        {/* Formulaire */}
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nouvelle tâche..."
              className="flex-1 px-4 py-2 rounded-lg bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              Ajouter
            </button>
          </div>
        </form>

        {/* Filtres */}
        <div className="flex gap-2 mb-4">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === f
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              {f === 'all' && 'Toutes'}
              {f === 'active' && 'Actives'}
              {f === 'completed' && 'Terminées'}
            </button>
          ))}
        </div>

        {/* Liste des tâches */}
        <div className="space-y-2">
          <AnimatePresence>
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4 text-red-400"
              >
                Aucune tâche {filter !== 'all' && filter}
              </motion.div>
            ) : (
              filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    todo.completed ? 'bg-red-50 text-red-400 line-through' : 'bg-red-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 rounded accent-red-500"
                    />
                    <span>{todo.text}</span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Compteur */}
        {todos.length > 0 && (
          <div className="mt-4 text-sm text-red-500 text-center">
            {todos.filter(t => t.completed).length} / {todos.length} tâches terminées
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
