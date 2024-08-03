<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    
    public function __construct() {
        $this->middleware(['auth:api', 'owner'])->only('update', 'destroy', 'store');
    }

    public function index(Request $request)
    {
        $books = Book::with('category');

        if($request->input('title')) {
            $books->where('title', 'like', '%'.$request->input('title').'%');
        }

        if($request->input('status')) {
            $books->where('status', $request->input('status'));
        }

        if($request->input('category_id')) {
            $books->where('category_id', $request->input('category_id'));
        }

        $books = $books->get();

        if($books->isEmpty()) {
            return response()->json(['message' => 'Book not found || Buku tidak ditemukan'], 404);
        }

        return response()->json(['data' => $books], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        $coverData = null;

        if($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $coverName = time().'.'.$cover->extension();
            $cover->storeAs('covers', $coverName, 'public');

            $coverData = env('APP_URL').'/storage/covers/'.$coverName;
        }

        if($request->stok > 0) {
             $request['status'] = "A";
        } else {
            $request['status'] = "N";
        }

        $data = $request->all();
        if($coverData) {
            $data['cover'] = $coverData;
        } else {
            $data['cover'] = null;
        }

        $book = Book::create($data);

        return response()->json(['message' => 'Book created || Buku berhasil ditambahkan','data' => $book], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $book = Book::with('category')->find($book->id);

        return response()->json(['data' => $book], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookRequest $request, Book $book)
    {
        $coverData = $book->cover;
    
        if ($request->hasFile('cover')) {
            if ($coverData) {
                Storage::disk('public')->delete('covers/' . basename($coverData));
            }
    
            $cover = $request->file('cover');
            $coverName = time().'.'.$cover->extension();
            $coverPath = $cover->storeAs('covers', $coverName, 'public');
            $coverData = env('APP_URL').'/storage/' . $coverPath;
        }

        if($request->stok > 0) {
            $request['status'] = "A";
       } else {
           $request['status'] = "N";
       }
    
        $data = $request->all();
        $data['cover'] = $coverData;
        
        $book->update($data);
    
        return response()->json(['message' => 'Book updated || Buku berhasil diperbarui', 'data' => $book], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        if ($book->cover) {
            $coverPath = 'covers/' . basename($book->cover);
            if (Storage::disk('public')->exists($coverPath)) {
                Storage::disk('public')->delete($coverPath);
            }
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted || Buku berhasil dihapus'], 200);
    }



}
