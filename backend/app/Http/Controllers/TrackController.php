<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function get(Request $req) {
        $postsPerPage = 20;
        $result = Track::where('_id', '!=', '0');
//       $events = Event::findMany();

        return response()->json($result->paginate($postsPerPage), 200);
    }

    public function getById($id) {
        $result = Track::find($id);

        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result, 200);
        }
    }
}
