<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'summary' => 'required',
            'stok' => 'required|numeric',
            'status' => 'nullable',
            'author' => 'nullable',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required || Judul harus diisi',
            'summary.required' => 'Summary is required || Ringkasan harus diisi',
            'stok.required' => 'Stok is required || Stok harus diisi',
            'stok.numeric' => 'Stok must be a number || Stok harus berupa angka',
            'cover.image' => 'Cover must be an image || Cover harus berupa gambar',
            'cover.mimes' => 'Cover must be a file of type: jpeg, png, jpg, gif, svg. || Cover harus berupa file bertipe: jpeg, png, jpg, gif, svg',
            'cover.max' => 'Cover must not be greater than 2MB. || Cover harus kurang dari 2MB',
            'category_id.required' => 'Category is required',
            'category_id.exists' => 'Category not found || Kategori tidak ditemukan',
        ];
    }
}
