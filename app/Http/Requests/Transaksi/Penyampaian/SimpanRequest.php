<?php

namespace App\Http\Requests\Transaksi\Penyampaian;

use Illuminate\Foundation\Http\FormRequest;

class SimpanRequest extends FormRequest
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
               'id' => 'required|string',
               'type' => 'required|in:ya,tidak',
               'value' => 'required|string',
          ];
     }
}
