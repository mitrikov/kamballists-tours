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
        if(is_null($result->likes)) {
            return response()->json([], 200);
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

    public function buy(Request $request, $userId, $eventId) {
        $user = User::find($request->user_id);
        
        if(!isset($user->transactions)) {
            $user->transactions = []
        }

        $transactions = $user->transactions;
        
        if (!in_array($eventId, $transactions)) {
            array_push($transactions, $eventId);
        }

        $user->transactions = $transactions
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

        if(!isset($user->likes)){
            $user->likes = (object) [
                'events' => [],
                'excursions' => [],
                'hotels' => [],
                'restaurants' => [],
            ];
        }
       
        if(isset($user->traveler_type)) {
            if($user->traveler_type == "popular") {
                array_push($user->likes, ["events" => ["64287f5158b0515ee399ac5e"]]);
            }

            if($user->traveler_type == "advanced") {
                $user->likes['events'] = ["6423d71b3f8bc5de45ad5d0b"];
            }
        }

        if(isset($user->traveler_wealth)) {
            if($user->traveler_type == "econom") {
                $user->likes['events'] = ["642bdbe18e639d06116630b1"];
            }

            if($user->traveler_type == "medium") {
                $user->likes['events'] = ["63f06c43961d4400a353cc71"];
            }

            
            if($user->traveler_type == "vip") {
                $user->likes['events'] = ["64287ab158b0515ee398ca99"];
            }
        }

        $user->save();

        return response()->json($user, 200);
    }

    private static function coldStartTweak($user) {
        if(isset($user->likes) && count($user->likes['events']) != 0) return;

        if(!isset($user->likes)){
            $user->likes = [
                'events' => [],
                'excursions' => [],
                'hotels' => [],
                'restaurants' => [],
            ];
        }
       
        if(isset($user->traveler_type)) {
            if($user->traveler_type == "popular") {

                $user->likes->events = ["64287f5158b0515ee399ac5e"];
            }

            if($user->traveler_type == "advanced") {
                $user->likes->events = ["6423d71b3f8bc5de45ad5d0b"];
            }
        }

        if(isset($user->traveler_wealth)) {
            if($user->traveler_type == "econom") {
                $user->likes->events = ["642bdbe18e639d06116630b1"];
            }

            if($user->traveler_type == "medium") {
                $user->likes->events = ["63f06c43961d4400a353cc71"];
            }

            
            if($user->traveler_type == "vip") {
                $user->likes->events = ["64287ab158b0515ee398ca99"];
            }
        }
    }
}
