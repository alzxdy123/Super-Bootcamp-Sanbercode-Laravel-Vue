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

    public function index()
    {
        $books = Book::with('category')->get();

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

    public function search(Request $request) {
        $books = Book::where('title', 'like', '%' . $request->keyword . '%')->get();
        return response()->json(['data' => $books], 200);
    }

    public function filter(Request $request) {
        $books = Book::where('category_id', $request->category_id)->get();
        return response()->json(['data' => $books], 200);
    }

    public function home()
    {
        $latestBooks = Book::orderBy('created_at', 'desc')->take(10)->get();

        return response()->json(['data' => $latestBooks], 200);
    }

}
