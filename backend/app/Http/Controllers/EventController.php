<?php

namespace App\Http\Controllers;

use App\Http\Errors;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
   public function get(Request $req) {
        $postsPerPage = 100;
        $result = Event::where('_id', '!=', '0');

        $req->page = 30;

        if($req->has('ids')) {
            $ids = explode(',', $req->get('ids'));
            return $this->getByIds($ids);
        }

       return response()->json($result->paginate($postsPerPage, ['*'], 'page', rand(1, 100)), 200);
   }

    public function getById($id) {
        $result = Event::find($id);

        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result, 200);
        }
    }

    public function getByIds(Array $ids) {
        $result = Event::findMany($ids);
        if(is_null($result)) {
            return Errors::notFound();
        } else {
            return response()->json($result, 200);
        }
    }
}
