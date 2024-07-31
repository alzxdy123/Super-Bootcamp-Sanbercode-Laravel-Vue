<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BorrowRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Ganti dengan logika otorisasi jika diperlukan
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $user = auth()->user();

        return [
            'tanggal_pinjam' => 'date',
            'tanggal_kembali' => 'date',
            'status' => 'nullable|string',
            'book_id' => 'nullable|exists:books,id',
            'user_id' => 'exists:users,id|unique:borrows,book_id,NULL,id,user_id,' .  $user->id,
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'tanggal_pinjam.required' => 'The borrow date is required || Tanggal pinjam harus diisi',
            'tanggal_pinjam.date' => 'The borrow date must be a valid date || Tanggal pinjam harus berupa tanggal yang valid',
            'tanggal_kembali.required' => 'The return date is required || Tanggal kembali harus diisi',
            'tanggal_kembali.date' => 'The return date must be a valid date || Tanggal kembali harus berupa tanggal yang valid',
            'status.string' => 'The status must be a string || Status harus berupa string',
            'book_id.exists' => 'The book with the given ID does not exist || Buku dengan ID tersebut tidak ditemukan',
            'book_id.unique' => 'You cannot borrow the same book more than once || Anda tidak bisa meminjam buku yang sama lebih dari sekali',
            'user_id.required' => 'The user ID is required || ID pengguna harus diisi',
            'user_id.exists' => 'The user with the given ID does not exist || Pengguna dengan ID tersebut tidak ditemukan',
        ];
    }
}
