<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
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
            'title' => 'required|max:255',
            'summary' => 'required',
            'year' => 'required|date',
            'poster' => 'mimes:jpg,bmp,png',
            'genre_id' => 'required',
            'cast_ids' => 'array',
            'cast_ids.*' => 'uuid|exists:casts,id'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'inputan title wajib di isi',
            'title.max' => 'inputan title melebihi batas',
            'summary.required' => 'inputan summary wajib di isi',
            'year.required' => 'inputan year wajib di isi',
            'year.date' => 'inputan year wajib berformat date',
            'poster.mimes' => 'inputan poster hanya boleh berformat jpg, bmp, dan png',
            'genre.required' => 'inputan genre wajib di isi'
        ];
    }
}
