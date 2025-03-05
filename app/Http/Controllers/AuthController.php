<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Method untuk registrasi user baru
     * 
     * @param Request $request - Request dari client yang berisi data user
     * @return \Illuminate\Http\JsonResponse - Response JSON dengan data user dan token
     */
    public function register(Request $request)
    {
        // Validasi input dari request
        // - name: wajib diisi, string, maksimal 255 karakter
        // - email: wajib diisi, format email valid, maksimal 255 karakter, harus unik
        // - password: wajib diisi, minimal 8 karakter, harus dikonfirmasi
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Buat user baru di database
        // - name: nama user dari request
        // - email: email user dari request
        // - password: password yang di-hash menggunakan Hash::make()
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Buat token autentikasi untuk user baru
        // - 'auth_token': nama token
        // - plainTextToken: mendapatkan token dalam bentuk string
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response JSON dengan:
        // - data user yang baru dibuat
        // - token autentikasi
        // - tipe token (Bearer)
        // - status code 201 (Created)
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Method untuk login user
     * 
     * @param Request $request - Request dari client yang berisi kredensial
     * @return \Illuminate\Http\JsonResponse - Response JSON dengan data user dan token
     * @throws ValidationException - Jika kredensial tidak valid
     */
    public function login(Request $request)
    {
        // Validasi input dari request
        // - email: wajib diisi, format email valid
        // - password: wajib diisi
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Cek kredensial login
        // - Auth::attempt: mencoba login dengan email dan password
        // - Jika gagal, throw ValidationException
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Ambil data user berdasarkan email
        // - firstOrFail: ambil user atau throw exception jika tidak ditemukan
        $user = User::where('email', $request->email)->firstOrFail();

        // Buat token autentikasi baru untuk user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response JSON dengan:
        // - pesan sukses
        // - data user
        // - token autentikasi
        // - tipe token (Bearer)
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Method untuk logout user
     * 
     * @param Request $request - Request dari client dengan token
     * @return \Illuminate\Http\JsonResponse - Response JSON dengan pesan sukses
     */
    public function logout(Request $request)
    {
        try {
            // Cek apakah user sudah terautentikasi
            if (!$request->user()) {
                return response()->json([
                    'message' => 'Unauthorized - No valid token found'
                ], 401);
            }

            // Hapus token yang sedang digunakan
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error during logout',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Method untuk mendapatkan data user yang sedang login
     * 
     * @param Request $request - Request dari client dengan token
     * @return \Illuminate\Http\JsonResponse - Response JSON dengan data user
     */
    public function user(Request $request)
    {
        // Return data user yang sedang login dalam format JSON
        // - $request->user(): mendapatkan user dari token
        return response()->json($request->user());
    }
} 