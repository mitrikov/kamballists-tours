<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function get(Request $req) {
        $postsPerPage = 20;
        $result = Place::where('_id', '!=', '0');

        return response()->json($result->paginate($postsPerPage), 200);
    }

    public function getById($id) {
        $result = Place::find($id);

        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result, 200);
        }
    }
}
