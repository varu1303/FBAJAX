$(document).ready(function(){
  //displayPic going to hold hq////////xhr object returned for dislay pic request
  var displayPic;
  //aboutText going to hold jqxhr object returned for get about request
  var aboutText;
  //
  var accessToken = 'EAACEdEose0cBAGDGWiOogSUlKaVXwoW7AXZB8Us2S5Oe8jUK0QBbeWvmYQjJ0ipZAZCHZCdFG0aKY0RZBFldE8C0ehDZBamKSgMDDvqNZBQaIblkr5hFRsIZCpJIkiAZB0JwUs9KkJIGUxirgSB26HZBDVp8jtoqCtHYOi5egLiowQNAENviKc73nyC1ypJ5LWHi0ZD';
  //function returning 'basic info' as jqXHR object by making request to GRAPH API using getJSON method
  function get_Info(Token){
    return $.getJSON("https://graph.facebook.com/me?fields=hometown,email,about,birthday,education,name,location,work&access_token=" + Token);
  }

//funtion returning display pic in 420px x 420px size as jqXHR object
  function get_Dp(Token){
    return $.getJSON("https://graph.facebook.com/me/picture?width=360&redirect=false&access_token=" + Token);
  }

//funtion returning about data as jqXHR object
  function get_About(Token){
    return $.getJSON("https://graph.facebook.com/me?about&access_token=" + Token);
  }



  //profile will hold the jqXHR object which can use promise methods
  var profile = get_Info(accessToken);
  //for resolved promise
  profile.done(function(info){
  console.log('in profile.done');
  //name
  if(info.name != undefined)
    $("#name").text(info.name);
  else {
    $("#name").text("Starboy");
  }
  //Calculating age
  if(info.birthday != undefined){
    var dob = new Date(info.birthday);
    var today = new Date();
    var old = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    $("#age").text(old);
  }else {
    $("#age").text("who cares");
  }
  console.log('later');
  //hometown name
  if(info.hometown != undefined)
    $("#from").text(info.hometown.name);
  else {
    $("#from").text("Mars");
  }
  //getting college details
  if(info.education != undefined){
    $(info.education).each(function(i, val){
      if (val.type == "College")
        $("#college").text(val.school.name);
    });
  }else {
    $("#college").text("Nowhere");
  }
  //getting current employer's name
  if(info.location != undefined)
    $("#loc").text(info.location.name);
  else {
    $("#loc").text("Earth");
  }
  if(info.work != undefined){
    var ind = info.work.length - 1;
/*    $("#work").text(info.work[ind].employer.name);
Latest work details at [0] */
//  $("#work").text(info.work[ind].employer.name);
    $("#work").text(info.work[0].employer.name);
  }else {
    $("#work").text("MIB");
  }
  //getting email id
  if(info.email !=undefined){
    $("#email").text(info.email);
  }else {
    $("#email").text("starboy@gmars.com");
  }


//on fail below action
  }).fail(function(jqxhr, textStatus, error ){
    var err = textStatus + "- " + error;
    $("#load-fail").append( "<h2> " + err + "</h2>" );
    $("#load-fail").css("display","block");
    $("#loaded-info").css("display","none");
    $("#toFeed").css("display","none");
  });


  //displayPic going to hold hq////////xhr object returned for dislay pic request
    displayPic = get_Dp(accessToken);
    displayPic.done(function(dp){
      console.log("image get done");
    //  console.log(dp.data.url);
    if(dp.data != undefined)
      $(".img-holder").css('background-image', 'url(' + dp.data.url + ')');
    }).fail(function(){
      console.log("image get fail");
      alert('profile picture couldnt be get');
    });
  //aboutText going to hold jqxhr object returned for get about request
    aboutText = get_About(accessToken);
    aboutText.done(function(abText){
      console.log("about get done");
      //console.log(abText.bio);
      //about me section
      if(abText.bio != undefined)
        $("#ab").text(abText.bio);
      $(".container-1").css('display','none');
    }).fail(function(){
      //console.log("about get fail");
      alert('about section couldnt be get');
    });



  //stoping animation once user goes to feed page
  $("#toFeed i").on('click',function(){
    $("#toFeed i").removeClass("anim");
  });

});
