<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TodoController extends Controller {
   public function index() {
      $todos = Todo::all(); // Ambil semua tugas
      return Inertia::render('TodoList', ['todos' => $todos]);
   }

   public function store(Request $request) {
         $request->validate([   
            'task' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000', // Validasi deskripsi
         ]);

         Todo::create($request->only(['task', 'description'])); // Simpan task dan description
         return redirect()->back();
   }

   public function update(Request $request, Todo $todo) {
         $request->validate([
            'task' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000', // Validasi deskripsi
         ]);

         $todo->update($request->only(['task', 'description'])); // Update task dan description
         return redirect()->back();
   }


   public function destroy($id)  {
      $todo = Todo::findOrFail($id);
      $todo->delete();

      return response()->json(['message' => 'Todo deleted successfully']);
   }

}
