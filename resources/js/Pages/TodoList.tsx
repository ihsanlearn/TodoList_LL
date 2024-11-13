import React, { useState } from 'react';
import TodoList from '../Components/TodoList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Todo {
   id: number;
   task: string;
   description: string;
   completed: boolean;
}

interface IndexProps {
   todos: Todo[];
}

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content')!;

const Index: React.FC<IndexProps> = ({ todos }) => {
   const [todoList, setTodoList] = useState<Todo[]>(todos);

   const handleDelete = async (id: number) => {
      try {
         // Mengirim request ke backend Laravel untuk menghapus todo
         await axios.delete(`/todos/${id}`);
   
         // Setelah berhasil dihapus, update state todoList
         setTodoList(todoList.filter((todo) => todo.id !== id));
      } catch (error) {
         console.error('Error deleting todo:', error);
      }
   };

   const handleToggleComplete = (id: number) => {
      setTodoList(
         todoList.map((todo) =>
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   };

   return (
      <AuthenticatedLayout
         header={
         <h2 className="text-xl font-semibold leading-tight text-gray-800">
            TodoList
         </h2>
         }
      >
         <Head title="TodoList" />
         <TodoList
            todos={todoList}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
         />
      </AuthenticatedLayout>
   );
};

export default Index;
