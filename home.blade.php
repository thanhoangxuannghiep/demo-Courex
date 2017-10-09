@extends('layouts.user')

@section('content')
<div class="row">
    <ul class="col-md-12 listLinkTop">
        @foreach ($link as $item)
            <li>
                <span><img src="/images/link/logo/{{$item->logo}}" /></span>
                <a class="showLink" href="{{$item->url}}">{{$item->name}}</a>
            </li>
        @endforeach
        <li>
            <i class="fa fa-plus-square addNewLink" aria-hidden="true" style="font-size:3.5em"></i>
        </li>
    </ul>
    <div class="col-md-9 listLinkMain">
        @foreach ($main as $item)
        <div class="detailList">
            <!-- <a href="/box/{{$item->id}}"><h2 class="boxHeader">{{$item->name}}</h2></a> -->
            <h2 class="boxHeader">{{$item->name}}</h2>
            @foreach ($item->links as $link)
                <div class="col-md-2">
                    <a class="showLink" href="{{$link->url}}">{{$link->name}}</a>
                </div>
            @endforeach
        </div>
        @endforeach
    </div>
    <div class="col-md-3 listLinkLeft">
        @foreach ($left as $item)
            <ul class="detailLeft">
                <!-- <a href="/box/{{$item->id}}"><h2 class="boxHeader">{{$item->name}}</h2></a> -->
                <h2 class="boxHeader">{{$item->name}}</h2>
                @foreach ($item->links as $link)
                    <li class="col-md-12">
                        <a class="showLink" href="{{$link->url}}">{{$link->name}}</a>
                    </li>
                @endforeach
            </ul>
        @endforeach
    </div>
</div>
@endsection