$(document).ready(function(){
  var counter = 0;
  var accessToken = 'EAACEdEose0cBAGRZBXlQu4UPbE2fa7bfZAqk53zFQpFHAZBZCELREUZCMkXfE8jwMUTuoqettE6HlzneTm9Y8tjoDW9XM8dp3TookOqvu6ohs8lQbnwy4v1xDIb7zur6hSHje0FEbkh4LeKMEdGyqGK6zTZBoUpZCxeUbX7mNLBL8tx9MBZABQ7qHQknAunBhF0ZD';
  //function returning 'posts' as jqXHR object by making request to GRAPH API using getJSON method
  function get_Feed(Token){
    return $.getJSON("https://graph.facebook.com/me/posts?fields=id,message,permalink_url,picture,link,name,likes{pic,username,name,link},comments{id,from{id, name, picture},message},created_time,full_picture,place&access_token=" + Token);
  }

  var userFeed = get_Feed(accessToken);

  userFeed.done(function(feed){
    console.log('feed fetched');
    $(feed.data).each(function(i, post){
      counter = i+1;
      console.log("looping" + i);
      var x = i+1;
      var isPost = get_Post(feed,i);
      var likeCount;
      if (feed.data[i].likes == undefined)
       likeCount=0;
       else
        likeCount = feed.data[i].likes.data.length;
      $("#post").append("<div id='inner"+x+"'class='post-in'></div>");
      $("#inner"+x).append("<div id='xx"+x+"'><a href="+ feed.data[i].permalink_url +" target='_blank'>"+isPost+"</a></div>");
      $("#inner"+x).append("<div id='xy"+x+"'><p class='formar'>Created on "+feed.data[i].created_time.substr(0,10)+"</p><p>Number of likes : "+likeCount+"</p><p><a href="+ feed.data[i].permalink_url +" target='_blank'><i class='fa fa-facebook' aria-hidden='true'></i></a</p></div>");
      if(counter%4 == 0){
          console.log("broke at" + i);
          return false;
      }
    });
  }).fail(function(){
      $("#post").css('display','none');
      $("#onClick").css('display','none');
      $("#load-fail").css('display','block');
  }).always(function(){
    $("[id^=xx]").addClass("backcolor");
    $("[id^=xy]").addClass("backcolor-1");
    //everything loaded - removing loader
    $(".container-1").css('display','none');
  });

  $("#onClick").on('click',function(){
    userFeed.done(function(feed){
      console.log('again fetching');
        for(var i=counter; i<counter+4 && i<feed.data.length ; i++){
            console.log("looping" + i);
            var x = i+1;
            var isPost = get_Post(feed,i);
            var likeCount;
            if (feed.data[i].likes == undefined)
              likeCount=0;
            else
              likeCount = feed.data[i].likes.data.length;
              $("#post").append("<div id='inner"+x+"'class='post-in'></div>");
              $("#inner"+x).append("<div id='xx"+x+"'><a href="+ feed.data[i].permalink_url +" target='_blank'>"+isPost+"</a></div>");
              $("#inner"+x).append("<div id='xy"+x+"'><p class='formar'>Created on "+feed.data[i].created_time.substr(0,10)+"</p><p>Number of likes : "+likeCount+"</p><p><a href="+ feed.data[i].permalink_url +" target='_blank'><i class='fa fa-facebook' aria-hidden='true'></i></a</p></div>");
          }
          if (i>=feed.data.length){
            $("#onClick").css('display','none');
            $("#goTop").css('display','block');
          }
          counter += 4;
        }).fail(function(){
            $("#post").css('display','none');
            $("#onClick").css('display','none');
            $("#load-fail").css('display','block');
        }).always(function(){
          $("[id^=xx]").addClass("backcolor");
          $("[id^=xy]").addClass("backcolor-1");
        });
      });


     function get_Post(feed,i){
       var isPost="";
       if (feed.data[i].message != undefined)
         isPost += "<p> " + feed.data[i].message + "</p>";
       if (feed.data[i].full_picture != undefined)
         isPost += "<p><img src='" + feed.data[i].full_picture + "'>";
       if (feed.data[i].place != undefined){
           if (feed.data[i].place.name != undefined)
           isPost += "<p>" + feed.data[i].place.name + "</p>";}
       if(isPost == "")
        isPost = "<hr>";
        return isPost;
     }



});
