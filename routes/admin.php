<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/asim/login');
});

Route::get('logout', 'Auth\LoginController@logout');
Auth::routes();
Route::get('/home', 'AdminController@index')->name('admin.home');
Route::get('/a/{vue_capture?}', 'AdminController@index')->name('admin.home')->where('vue_capture', '[\/\w\.-]*');
Route::resource('a-user', 'UserController');
Route::resource('a-box', 'BoxController');
Route::resource('a-link', 'LinkController');