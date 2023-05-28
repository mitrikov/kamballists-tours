<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class SiteUserController extends Controller
{
    public function newUser(Request $request) {
        $user = new User();
        $user->save();
        return response()->json($user->_id, 200);

    }

    public function like(Request $request) {
        return response()->json([$request], 200);
        //$result = Event::find($id);
        //
        //if(is_null($result)) {
        //    return Errors::notFound();
        //} else {
        //    return response()->json($result, 200);
        //}
    }
}
