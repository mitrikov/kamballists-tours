<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;


class SiteUserController extends Controller
{
    public function newUser(Request $request) {
        $user = new User();
        $user->likes = (object) [
          "events" => ['606d1fc0ddf3130018eadbc0'] // TODO: Это костыль! Нужно сделать проверку в Django
        ];
        $user->save();
        return response()->json($user->_id, 200);
    }

    public function likes(Request $request) {
        $result = User::find($request->get('user_id'));
        
        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result->likes, 200);
        }
    }

    public function like(Request $request) {
        $user = User::find($request->user_id);
        $event_id = $request->event_id;
        if(!isset($user->likes)){
            $likes = [
                'events' => [],
                'excursions' => [],
                'hotels' => [],
                'restaurants' => [],
            ];

            $user->likes = $likes;
            $user->save();
        }

        $likes = $user->likes;


        if (!in_array($event_id, $likes['events'])) {
            $likes['events'][] = $event_id;
        }

        $user->likes = $likes;
        $user->save();

        return response()->json($user, 200);
    }
}
