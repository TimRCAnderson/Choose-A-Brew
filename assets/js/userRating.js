var userRating;
var userComment = "";

$.fn.rating = function (method, options) {
    method = method || 'create';
    var settings = $.extend({
        limit: 5,
        value: 0,
        glyph: "glyphicon glyphicon-thumbs-up",
        coloroff: "gray",
        coloron: "gold",
        size: "1.3em",
        cursor: "pointer",
        onClick: function () {
        },
        endofarray: "idontmatter"
    }, options);
    var style = "";
    style = style + "font-size:" + settings.size + "; ";
    style = style + "color:" + settings.coloroff + "; ";
    style = style + "cursor:" + settings.cursor + "; ";


    if (method == 'create') {
        this.each(function () {
            attr = $(this).attr('data-rating');
            if (attr === undefined || attr === false) {
                $(this).attr('data-rating', settings.value);
            }
        });


        for (var i = 0; i < settings.limit; i++) {
            this.append('<span data-value="' + (i + 1) + '" class="ratingicon glyphicon ' + settings.glyph + '" style="' + style + '" aria-hidden="true"></span>');
        }

        $('.ratingicon').mouseover(function () {
            var thumbValue = $(this).data('value');
            var ratingIcons = $('.ratingicon');
            for (var i = 0; i < thumbValue; i++) {
                $(ratingIcons[i]).css('color', settings.coloron);
            }
        }).mouseout(function () {
            var currentRate = $(this).parent().attr('data-rating');
            var ratingIcons = $('.ratingicon');
            for (var i = ratingIcons.length; i >= currentRate; i--) {
                $(ratingIcons[i]).css('color', settings.coloroff);
            }
        });

            //paint
            this.each(function () {
                paint($(this));
            });

        }
        if (method == 'set') {
            this.attr('data-rating', options);
            this.each(function () {
                paint($(this));
            });
        }
        if (method == 'get') {
            return this.attr('data-rating');
        }
        //register the click events
        this.find("span.ratingicon").click(function () {
            userRating = $(this).attr('data-value');
            $(this).parent().attr('data-rating', userRating);
            paint($(this).parent());
            settings.onClick.call($(this).parent());
            console.log (userRating);

        });

        function paint(div) {
            userRating = parseInt(div.attr('data-rating'));
            div.find("input").val(userRating);	
            div.find("span.ratingicon").each(function () {	

                var rating = parseInt($(this).parent().attr('data-rating'));
                var value = parseInt($(this).attr('data-value'));
                if (value > userRating) {
                    $(this).css('color', settings.coloroff);
                }
                else {
                    $(this).css('color', settings.coloron);
                }
            })
        }
    };

    $("#add-user").on("click", function(event) {
        event.preventDefault();
        ratePush = userRating;
        userComment = $("#user-comment").val().trim();


        if(currentBrewery != "" && currentBrewery != undefined &&currentBeer != "" && currentBeer != undefined)
        {
            database.ref().child(currentBrewery).child(currentBeer).push({
                userRating: ratePush,
                rateComment: userComment
            });

            $("#user-comment").val("");
            $("#icon-beer").rating("set", 0);
        }

    });



// return false;


// database.push().chlild("BrewID").child(BeerID) ({
//     userRating:rating,
//     userCommnet: comment

// });



// $(document).ready(function() {

//      $("#add-train").on("click", function() {
//         name = $('#name-input').val().trim();
//         destination = $('#destination-input').val().trim();
//         firstTrainTime = $('#first-train-time-input').val().trim();
//         frequency = $('#frequency-input').val().trim();
//           firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
//           currentTime = moment();
//           diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//           tRemainder = diffTime % frequency;
//           minutesTillTrain = frequency - tRemainder;
//           nextTrain = moment().add(minutesTillTrain, "minutes");
//           nextTrainFormatted = moment(nextTrain).format("hh:mm");

//         // Code for the push
//         keyHolder = dataRef.push({
//             name: name,
//             destination: destination,
//             firstTrainTime: firstTrainTime,  
//             frequency: frequency,
//                nextTrainFormatted: nextTrainFormatted,
//                minutesTillTrain: minutesTillTrain
//           });

//           $('#name-input').val('');
//           $('#destination-input').val('');
//           $('#first-train-time-input').val('');
//           $('#frequency-input').val('');

//           return false;
//      });

//           dataRef.on("child_added", function(childSnapshot) {


//    $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
//      "<td class='col-xs-3'>" + childSnapshot.val().name +
//      "</td>" +
//      "<td class='col-xs-2'>" + childSnapshot.val().destination +
//      "</td>" +
//      "<td class='col-xs-2'>" + childSnapshot.val().frequency +
//      "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
//                "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
//                "</td>" +
//                "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
//                "</tr>");
// // Handle the errors
// }, function(errorObject){
//     console.log("Errors handled: " + errorObject.code)
// });

//           $("body").on("click", ".remove-train", function(){
//                $(this).closest ('tr').remove();
//                getKey = $(this).parent().parent().attr('id');
//                dataRef.child(getKey).remove();
//           });

// }); 





