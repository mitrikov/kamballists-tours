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
        $user->save();
        return response()->json($user->_id, 200);
    }

    public function user(Request $request, string $id) {
        return response()->json(User::find($id), 200);
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

    public function saveUserQuestionnaire(Request $req, $user_id) {
        $user = User::find($user_id);
        // Валидация на if'aх - самое стабильное, что может быть!

        if($req->filled('traveler_wealth')) {
            $user->traveler_wealth = $req->get('traveler_wealth');
        }

        if($req->filled('traveler_type')) {
            $user->traveler_type = $req->get('traveler_type');
        }

        if($req->filled('interests')) {
            $user->interests = explode(',', $req->get('interests'));
        }

        if($req->filled('cuisines')) {
            $user->cuisines = explode(',', $req->get('cuisines'));
        }

        $user->save();

        return response()->json($user, 200);
    }
}
