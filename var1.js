$(document).ready(function(){
  var counter = 0;
  var accessToken = 'EAACEdEose0cBAPHfkX4roey1SdUpkqotbre15dPU7noCDzp5ZA9Yug9HJJpysspmUoFHNug9WVmJh0H6evRghq3RyiZB5f0m92bZB4Kb0J7K7GWwDhJpFZCalAUZAzP4O0WcdBmtWyzgwZARhzWlrZCM4PL4lmkNpz6r76alp7v1zIGgKXDCxTAUamC2MZAH05gZD';
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
      $("#post").append("<div id='x"+x+"'>"+isPost+"<p>Created on "+feed.data[i].created_time.substr(0,10)+"</p><p>Number of likes "+likeCount+"</p><p><a href="+ feed.data[i].permalink_url +" target='_blank'>Post "+ x +"</a></p></div>");
      if(counter%4 == 0){
          console.log("broke at" + i);
          //everything loaded - removing loader
          $(".container-1").css('display','none');
          return false;
      }
    });
  }).fail(function(){
      $("#post").css('display','none');
      $("#onClick").css('display','none');
      $("#load-fail").css('display','block');
  }).always(function(){
    $("[id^=x]").addClass("backcolor");
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
            $("#post").append("<div id='x"+x+"'>"+isPost+"<p>Created on "+feed.data[i].created_time.substr(0,10)+"</p><p>Number of likes "+likeCount+"</p><p><a href="+ feed.data[i].permalink_url +" target='_blank'>Post "+ x +"</a></p></div>");
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
          $("[id^=x]").addClass("backcolor");
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
