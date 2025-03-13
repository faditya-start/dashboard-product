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
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku_prefix')->nullable()->after('sku');
            $table->string('sku_suffix')->nullable()->after('sku_prefix');
            $table->string('custom_sku')->nullable()->after('sku_suffix');
            $table->boolean('use_custom_sku')->default(false)->after('custom_sku');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['sku_prefix', 'sku_suffix', 'custom_sku', 'use_custom_sku']);
        });
    }
};
