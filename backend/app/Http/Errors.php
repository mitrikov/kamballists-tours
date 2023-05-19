<?php

namespace App\Http;

class Errors {
    public static function notFound() {
        return response()->json(['error' => true, 'message' => 'Not found'], 404);
    }
}
