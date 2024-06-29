<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'comment' => ['required', 'string', 'max:255'],
            'post_id' => ['required', 'exists:posts,id'],
        ];
    }

    public function messages()
    {
        return [
            'comment.required' => 'Inputan comment harus diisi',
            'comment.string' => 'Inputan comment harus berupa string',
            'comment.max' => 'Inputan comment maksimal 255 karakter',
            'post_id.required' => 'Post ID harus diisi',
            'post_id.exists' => 'Post ID tidak ditemukan',
        ];
    }
}
