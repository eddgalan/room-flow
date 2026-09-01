<?php

namespace App\Http\Requests;

use App\Models\Rooms\RoomRate;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoomRateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roomRate = $this->route('rate');
        $roomRateId = $roomRate instanceof RoomRate ? $roomRate->id : null;

        return [
            'name' => ['required', 'string', 'max:50', Rule::unique('room_rates', 'name')->ignore($roomRateId)],
            'description' => ['nullable', 'string', 'max:250'],
            'duration' => ['integer', 'min:0'],
            'duration_unit' => ['required_with:duration', 'string', 'max:50'],
            'enabled' => ['sometimes', 'boolean'],
            'allow_multiple' => ['sometimes', 'boolean'],
            'uses_checkin_schedule' => ['sometimes', 'boolean'],
        ];
    }
}
