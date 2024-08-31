<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




// Route::get('/menus', [MenuController::class, 'index']);
// Route::get('/menus/{id}', [MenuController::class, 'show']);
// Route::post('/menus', [MenuController::class, 'store']);
// Route::put('/menus/{id}', [MenuController::class, 'update']);
// Route::delete('/menus/{id}', [MenuController::class, 'destroy']);





Route::apiResource('menus', MenuController::class);
Route::apiResource('menu-items', MenuItemController::class);
