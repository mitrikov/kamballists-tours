<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function get(Request $req) {
        return response()->json(City::where('_id', '!=', '0')->get(), 200);

        $postsPerPage = 20;
        $result = City::where('_id', '!=', '0');

        return response()->json($result->paginate($postsPerPage), 200);
    }

    public function getById($id) {
        $result = City::find($id);

        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result, 200);
        }
    }
}
