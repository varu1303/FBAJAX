$(document).ready(function(){
  var counter = 0;
  var accessToken = 'EAACEdEose0cBAFKDilvYeN5SDp2mtoTQ0ZAZC6OicF30lms2npPiaKroArIwQJSuw0SDs9GGEPWnLo0HL39uCsUosMprioFwgwLxmaONr9Ba9wZB1TVfr5mgIMv67WkUc3teZCUcAyzZBCKKb6JpdQoKILaT3CtDyZBMf7mZBnhiWrZAFoBVplhE67kNv2A3gfUZD';
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
          return false;
      }
    });
  }).fail(function(){
      $("#post").css('display','none');
      $("#onClick").css('display','none');
      $("#load-fail").css('display','block');
  }).always(function(){
    $("[id^=x]").addClass("backcolor");
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
