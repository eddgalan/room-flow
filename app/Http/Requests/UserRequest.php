<?php

namespace App\Http\Requests;

use App\Authorization\Resources\UserResources;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can(UserResources::CREATE) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:30'],
            'lastname' => ['required', 'string', 'max:50'],
            'username' => ['required', 'string', 'max:50', 'unique:users,username'],
            'email' => ['required', 'email', 'max:50', 'unique:users,email'],
            'phone_number' => ['nullable', 'string', 'min:10', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
