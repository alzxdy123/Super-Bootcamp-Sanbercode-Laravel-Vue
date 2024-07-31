<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Book;
use App\Models\Borrow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\BorrowRequest;


class BorrowController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'owner']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrows = Borrow::with('book')->get();
        return response()->json(['data' => $borrows], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    
    
    public function store(BorrowRequest $request)
    {
        $user = auth()->user();
    
        try {
            DB::transaction(function () use ($request, $user) {
                $existingBorrow = Borrow::where('user_id', $request->user_id)
                                        ->where('book_id', $request->book_id)
                                        ->first();
    
                if ($existingBorrow) {
                    throw new \Exception('You cannot borrow the same book more than once || Anda tidak bisa meminjam buku yang sama lebih dari sekali');
                }
    
                $book = Book::findOrFail($request->book_id);
                $book->decrement('stok');
    
                $tanggalPinjam = Carbon::now();
                $tanggalKembali = $tanggalPinjam->copy()->addDays(7);
    
                Borrow::create([
                    'user_id' => $user->id,
                    'book_id' => $request->book_id,
                    'tanggal_pinjam' => $tanggalPinjam,
                    'tanggal_kembali' => $tanggalKembali,
                    'status' => 'P'
                ]);
            });
    
            return response()->json(['message' => 'Borrow book created successfully || Peminjaman buku berhasil'], 201);
    
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Borrow $borrow)
    {
        return response()->json(['data' => $borrow->load('book')], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrow $borrow)
    {
        try {
            DB::transaction(function () use ($request, $borrow) {
                $borrow->update($request->all());
            });
    
            return response()->json(['message' => 'Borrow updated successfully || Peminjaman diperbarui'], 200);
    
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update borrow || Gagal memperbarui peminjaman'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrow $borrow)
    {
        try {
            DB::transaction(function () use ($borrow) {
                $book = $borrow->book;
                $book->increment('stok');
    
                $borrow->delete();
            });
    
            return response()->json(['message' => 'Borrow deleted successfully || Peminjaman dihapus'], 200);
    
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete borrow || Gagal menghapus peminjaman'], 400);
        }
    }
}
