<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\Rule;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';
    protected $auth_guard = 'admin';
    protected $domain;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->middleware('guest')->except('logout');
        $this->domain = explode('.', $request->getHost())[0];
    }

    protected function validateLogin(Request $request)
    {
        switch (config()->get('auth.defaults.guard')) {
            case 'asim':
                $check = [
                    $this->username() => [
                        'required',
                        Rule::exists('users')->where(function ($query) {
                            $query->where('user_type', 3);
                            $query->where('status', 1);
                        }),
                    ],
                    // 'required|email|exists:users,email',
                    'password' => 'required|string'
                ];
                break;
            default:
                $check = [
                    $this->username() => [
                        'required',
                        Rule::exists('users')->where(function ($query) {
                            $query->where('user_type', 1)->orWhere('user_type', 3);
                            $query->where('status', 1);
                        }),
                    ],
                    //$this->username() => 'required|email|exists:users,email',
                    'password' => 'required|string'
                ];
                break;
        }

        $this->validate($request, $check);
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();

        $curID = $request->session()->getId();

        $request->session()->forget($curID);
        // $request->session()->flush();
        $request->session()->regenerate();

        return $request->ajax() ? ['redirect' => $this->redirectPath()] : redirect('/');
    }

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);
        switch (config()->get('auth.defaults.guard')) {
            case 'asim':
                $this->redirectTo = "/asim/a/home";
                break;
            default:
                $this->redirectTo = "/";
                break;
        }
        // dd($this->authenticated($request, $this->guard()->user()));
        return $this->authenticated($request, $this->guard()->user()) ?: ['redirect' => $this->redirectTo];
    }

    protected function guard()
    {
        return Auth::guard(config()->get('auth.defaults.guard'));
    }

    public function showLoginForm(Request $request)
    {
        switch (config()->get('auth.defaults.guard')) {
            case 'asim':
                $view = view('auth.asim');
                break;
            default:
                $view = view('auth.login');
                break;
        }

        return $view;
    }
}
