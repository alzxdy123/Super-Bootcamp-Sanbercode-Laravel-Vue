<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
        $roleId = $this->route('role')->id ?? null;

        return [
            'name' => 'required|string|max:255|unique:roles,name,' . $roleId,
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required || Nama kategori harus diisi',
            'name.string' => 'Category name must be a string || Nama kategori harus berupa teks',
            'name.max' => 'Category name may not be greater than 255 characters || Nama kategori tidak boleh lebih dari 255 karakter',
            'name.unique' => 'Category name already exists || Nama kategori sudah ada',
        ];
    }
}
