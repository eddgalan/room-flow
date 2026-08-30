<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoomTypeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50', Rule::unique('room_types', 'name')],
            'description' => ['required', 'string', 'max:50'],
            'capacity' => ['required', 'integer', 'min:1'],
            'enabled' => ['sometimes', 'boolean'],
        ];
    }
}
