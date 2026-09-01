<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('room_rates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('description', 250)->nullable();
            $table->integer('duration');
            $table->string('duration_unit', 20);
            $table->boolean('enabled')->default(true);
            $table->boolean('allow_multiple')->default(false);
            $table->boolean('uses_checkin_schedule')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_rates');
    }
};
