<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CastRequest extends FormRequest
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
            'name' => 'required',
            'age' => 'required',
            'bio' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'Username is required || Username harus diisi',
            'username.unique' => 'Username already exists || Username sudah ada',
            'email.required' => 'Email is required || Email harus diisi',
            'email.unique' => 'Email already exists || Email sudah ada',
            'password.required' => 'Password is required || Kata sandi harus diisi',
            'password.min' => 'Password must be at least 6 characters || Kata sandi harus minimal 6 karakter',
            'password_confirmation.required' => 'Password confirmation is required || Konfirmasi kata sandi harus diisi',
            'password_confirmation.same' => 'Password and password confirmation must match || Kata sandi dan konfirmasi kata sandi harus sama',
        ];
    }
}
