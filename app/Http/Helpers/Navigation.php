<?php


    function isActiveRoute($route, $output = 'active')
    {
        if (strpos(Route::getCurrentRoute()->getName(), $route) !== false) {
            return $output;
        }
    }
