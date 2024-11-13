import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface TodoForm {
   task: string;
   description: string;
   [key: string]: string | undefined;
}

interface Todo {
   id: number;
   task: string;
   description: string;
   completed: boolean;
}

interface TodoListProps {
   todos: Todo[];
   onDelete: (id: number) => void;
   onToggleComplete: (id: number) => void;
}


const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggleComplete }) => {
   const [form, setForm] = useState<TodoForm>({
      task: '',
      description: '',
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
         ...prevForm,
         [name]: value,
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      Inertia.post('/todos', form as Record<string, any>);
      setForm({ task: '', description: '' });
   };

   return (
      <div className="mt-4">
         <div className="overflow-x-auto mx-auto w-10/12">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-md table-fixed">
               <thead>
                  <tr>
                     <th className="w-1/4 px-4 py-2 border-b">Task</th>
                     <th className="w-1/4 px-4 py-2 border-b">Description</th>
                     <th className="w-1/6 px-4 py-2 border-b">Status</th>
                     <th className="w-1/6 px-4 py-2 border-b">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {todos.length === 0 ? (
                     <tr>
                        <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                           No todos available
                        </td>
                     </tr>
                  ) : (
                     todos.map((todo) => (
                        <tr key={todo.id} className={`border-b ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                           <td className="px-4 py-2">{todo.task}</td>
                           <td className="px-4 py-2">{todo.description}</td>
                           <td className="px-4 py-2">
                              <span
                                 className={`px-3 py-1 rounded-full ${
                                    todo.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                 }`}
                              >
                                 {todo.completed ? 'Completed' : 'Pending'}
                              </span>
                           </td>
                           <td className="px-4 py-2 space-x-2 flex justify-center">
                              <button
                                 onClick={() => onToggleComplete(todo.id)}
                                 className={`px-4 py-2 rounded-md text-white ${
                                    todo.completed ? 'bg-red-500' : 'bg-blue-500'
                                 }`}
                              >
                                 {todo.completed ? 'Undo' : 'Mark as Done'}
                              </button>
                              <button
                                 onClick={() => onDelete(todo.id)}
                                 className="px-4 py-2 bg-red-500 text-white rounded-md"
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>

         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
               <label className="block text-gray-700 font-semibold mb-2">Task:</label>
               <input
                  type="text"
                  name="task"
                  value={form.task}
                  onChange={handleChange}
                  required
                  placeholder="Task"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <div>
               <label className="block text-gray-700 font-semibold mb-2">Description:</label>
               <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
               Add Todo
            </button>
         </form>
      </div>
   );
};

export default TodoList;
