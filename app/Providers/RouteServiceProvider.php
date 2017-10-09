<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->domain = config("params.SESSION_DOMAIN");

        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapAdminRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::group(['domain' => $this->domain, 'middleware'=>['web']], function () {
            Route::middleware(['web'])
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
            Route::group(['namespace' => $this->namespace], base_path('routes/auth.php'));
            // Route::namespace($this->namespace)
            //     ->group(base_path('routes/auth.php'));
        });
    }

    /**
     * Define the "admin" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapAdminRoutes()
    {
        // echo base_path('routes/admin.php');
        $domain = env('ADMIN_B', 'asim').'.'.$this->domain;
        Route::group(['prefix' => env('ADMIN_B', 'asim'), 'middleware' => ['asim', 'web']], function () {
            Route::group(['middleware' => 'asim'], function () {
                Route::middleware('auth:asim')
                ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));
            });
        //     // echo $this->namespace;
            Route::group(['namespace' => $this->namespace], base_path('routes/auth.php'));
            // Route::namespace($this->namespace)
            //     ->group(base_path('routes/auth.php'));
        });
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
}
