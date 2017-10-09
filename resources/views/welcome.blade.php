<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="{{ mix('css/app.css') . '?t=' . microtime() }}" rel="stylesheet">
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                display:inline-block;
                width:50%;
            }

            .img{
                width: 10%;
                height:auto;
                display:inline-block;
            }
            .title {
                margin: 0;
                padding: 0;
                width: 10%;
                height:auto;
                display:inline-block;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <table class="table table-striped table-bordered table-hover" >
            <thead>
                <tr>
                    <th>avartar</th>
                    <th>Username</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                @foreach($repos['items'] as $repo)
                <tr>
                    <td>
                        <img src="{{$repo['avatar_url']}}" class="img"/>
                    </td>
                    <td>
                        <h4 class="title">{{ $repo['login'] }}</h4>
                    </td>
                    <td>
                        <a class="title">{{ $repo['html_url'] }}</a>
                    </td>
                </tr>
                @endforeach
        </table>
    </body>
</html>
