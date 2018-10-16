
$(document).ready(function(){

    //Function to create new Button.

    function createNewBtns(btName){    
        var newBtn = $("<button>"+btName+"</button>");
        newBtn.addClass("giphyBtn btn btn-light existing");
        (newBtn).attr("data-btn", btName);
        $(".buttons").append(newBtn);
    };
      
    //Object to store all the values
    var Obj = {
        userInput :{},
        displayArr:[],
        urlKey:{},
        value:{},
        queryURL:{}
    };

    // Ajax function
    function getFromWeb(queryURL){
        $.ajax({
            url:queryURL,
            method:'GET'
        }).then(function(response){
            // console.log(response.data);
            // console.log(response.data[0].images.fixed_height.url);
            // console.log(response.da.images.fixed_height.url);
            var arrLength = response.data.length;
            // console.log(response.response.docs.length); // commented
            for (var i=0; i<arrLength; i++){
                var articleDiv = $("<div>");
                // console.log("Animate : " + response.data[i].images.fixed_height.url);
                // console.log("Still Gifs: " + response.data[i].images.fixed_height_still.url);
                var p = $("<p>").text("Rating: " + response.data[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", response.data[i].images.fixed_height_still.url);
                animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", response.data[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                
                animalImage.addClass("gif");
                (articleDiv).append(p);
                (articleDiv).append(animalImage);
                // (articleDiv).append("<p>"+ response.response.docs[i].snippet+ "</p>");
                // (articleDiv).append("<p>"+response.response.docs[i].web_url+"</p>");
                
                // $(".articles").prepend(p);
                // $(".articles").prepend(animalImage);
                $(".articles").append(articleDiv);
                
            };
            

        });
    };
    
    Obj.userInput = $("#giphy").val();

    //Placing buttons already on the page
    Obj.displayArr = ["The Office", "Tom & Jerry", "Funny Cat", "Hurricane", "programming", "cooking"];
    for (var j=0; j<Obj.displayArr.length; j++){
        createNewBtns(Obj.displayArr[j]);
    };

    // To display gifs from existing buttons
    $(".existing").on("click", function(e){
        // alert("exiting clicked");
        e.preventDefault();
        $(".articles").empty();
        Obj.value = $(this).attr("data-btn");
        Obj.queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
            Obj.value + "&api_key=dc6zaTOxFJmzC&limit=10";
        getFromWeb(Obj.queryURL); // Ajax function
        

    });
    // On submit button
    $("#submit").on("click", function(e){
    
        e.preventDefault();
        // alert("hiclicked");
        $(".articles").empty();
        Obj.userInput = $("#giphy").val();
        if (Obj.userInput.length === 0){
            // alert("empty");
            return false;
        }else {
            createNewBtns(Obj.userInput);
            // console.log(Obj.userInput);
            $("#giphy").val("") ;
            // $("button").on("click", function(){
            //     alert("button clicked");
            // })
            $(".giphyBtn").on("click", function(e){
                e.preventDefault();
                // alert("button clicked");
                $(".articles").empty();
                Obj.value = $(this).attr("data-btn");
                // Obj.displayArr.push(Obj.value);
                // console.log(Obj.displayArr);
                Obj.queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
                Obj.value + "&api_key=dc6zaTOxFJmzC&limit=10";  
                getFromWeb(Obj.queryURL);
            });
        }
  

    });

    //Pause and Start the gifs.
    $(document).on('click', '.gif', function(event) {
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            // alert("still");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            // alert("animate");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

    
 