<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            Log::info('Login attempt', ['email' => $request->email]);

            if (Auth::attempt($credentials, $request->boolean('remember'))) {
                $request->session()->regenerate();
                Log::info('Login successful', ['user' => Auth::user()->email]);
                
                return redirect()->intended('/dashboard');
            }

            Log::warning('Login failed - invalid credentials', ['email' => $request->email]);
            throw ValidationException::withMessages([
                'email' => trans('auth.failed')
            ]);

        } catch (ValidationException $e) {
            Log::warning('Login failed - validation error', [
                'email' => $request->email,
                'errors' => $e->errors()
            ]);
            
            return back()->withErrors($e->errors());
            
        } catch (\Exception $e) {
            Log::error('Login failed - unexpected error', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);
            
            return back()->withErrors([
                'email' => 'An unexpected error occurred during login.'
            ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }
} 