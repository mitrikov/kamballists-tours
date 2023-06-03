<?php

use App\Http\Controllers\SiteUserController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\EventController;
use \App\Http\Controllers\ExcursionController;
use \App\Http\Controllers\HotelController;
use \App\Http\Controllers\PlaceController;
use \App\Http\Controllers\RegionController;
use \App\Http\Controllers\CityController;
use \App\Http\Controllers\RestaurantController;
use \App\Http\Controllers\RouteController;
use \App\Http\Controllers\TourController;
use \App\Http\Controllers\TrackController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('user')->group(function (){
    Route::get('{id}', [SiteUserController::class, 'user']);
    Route::get('/likes', [SiteUserController::class, 'likes']);
});

Route::put("users/{id}", [SiteUserController::class, 'saveUserQuestionnaire']);

Route::get('new-user', [SiteUserController::class, 'newUser']);
Route::get('like', [SiteUserController::class, 'like']);

// Места и события
Route::get('events', [EventController::class, 'get']);
Route::get('events/{id}', [EventController::class, 'getById']);

// Экскурсии
Route::get('excursions', [ExcursionController::class, 'get']);
Route::get('excursions/{id}', [ExcursionController::class, 'getById']);

// Отели
Route::get('hotels', [HotelController::class, 'get']);
Route::get('hotels/{id}', [HotelController::class, 'getById']);



// Рестораны
Route::get('restaurants', [RestaurantController::class, 'get']);
Route::get('restaurants/{id}', [RestaurantController::class, 'getById']);

// Вспомогательные объекты 1

// Описание мест (где имеют место события events)
Route::get('places', [PlaceController::class, 'get']);
Route::get('places/{id}', [PlaceController::class, 'getById']);

// Вспомогательные объекты 2

// Перечень регионов
Route::get('regions', [RegionController::class, 'get']);
Route::get('regions/{id}', [RegionController::class, 'getById']);

// Перечень городов
Route::get('cities', [CityController::class, 'get']);
Route::get('cities/{id}', [CityController::class, 'getById']);


// Вспомогательные объекты 3

// Турпакеты
Route::get('routes', [RouteController::class, 'get']);
Route::get('routes/{id}', [RouteController::class, 'getById']);

// Туры
Route::get('tours', [TourController::class, 'get']);
Route::get('tours/{id}', [TourController::class, 'getById']);

// Маршруты
Route::get('tracks', [TrackController::class, 'get']);
Route::get('tracks/{id}', [TrackController::class, 'getById']);
