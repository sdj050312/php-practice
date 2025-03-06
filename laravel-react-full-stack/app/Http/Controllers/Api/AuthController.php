<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\Signup;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signUp(Signup $request) {
        $data = $request->validate();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    //
    public function login(LoginRequest $request)
    {
        $credentials = $request->validate();
        if(!Auth::attempt($credentials)){
            return response([
                'message' =>'Provided email address or password is incorrect'
            ]);
        }
        $user = Auth::user();
        $token = $user-> createToken('main') ->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {

        $user = $request->user();
        $user -> currentAccessToken()->delete();

        return response('', 204);
        
    }

}
