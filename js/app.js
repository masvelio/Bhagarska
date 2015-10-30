/**
 * Created by MarcinM on 21-Oct-15.
 */
$(function(){

    var Application = function(){

        function scrollPage(){
            var links = $(".header-nav a, .main-nav a, .last-logo a, .hamburger-menu a");

            links.click(function(){
                $("html, body").animate({
                    scrollTop: $($(this).attr("href")).offset().top
                }, 1000, 'swing');
                return false;
            });
        }


        function stickyMenu() {
            var menuBar = $("#navigation");
            var lastPositionTop = 0;

            $(window).scroll(function(event) {

                if (menuBar.hasClass("sticky") === false &&
                    $(this).scrollTop() > menuBar.offset().top) {

                    lastPositionTop = menuBar.offset().top;
                    menuBar.addClass("sticky");
                    menuBar.css("opacity", ".5");
                }

                if (menuBar.hasClass("sticky") &&
                    $(this).scrollTop() < lastPositionTop) {

                    menuBar.removeClass("sticky");
                    menuBar.css("opacity", "1");
                }
            });
        }


        function clickHamburgerBtn(){

            var hamburgerBtn = $(".c-hamburger");

            hamburgerBtn.on("click", function(e){
                e.preventDefault();
                (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
                $(".hamburger-menu").toggle();
            });
            $(".hamburger-menu a").on("click", function(e){
                e.preventDefault();
                hamburgerBtn.hasClass("is-active") === true ? hamburgerBtn.removeClass("is-active") : hamburgerBtn.addClass("is-active");
                $(".hamburger-menu").toggle();
            });
        }


        function learnMore (){
            var learnMoreBtn = $(".btn-learnMore");

            learnMoreBtn.on("click", function(){
                alert("Probably the new page or subpage is triggered here!");
                return false
            });
        }



        function clickAndChange() {
            var arrowRight = $(".arrow-right");
            var arrowLeft = $(".arrow-left");

            $(".team-content > div").css("opacity", ".2");
            $(".team-content > div:nth-child(2)").css("opacity", "1");

            $(".skills-container > div").hide();
            $(".skills-container > div:nth-child(2)").show();

            arrowRight.click(function(){
                var firstTeamMember = $(".team-content > div:first-child");
                firstTeamMember.parent().append(firstTeamMember);
                firstTeamMember.prev().css("opacity", "1").css("transform", "scale(1)");
                firstTeamMember.prev().prev().css("opacity", ".2").css("transform", "scale(.8)");

                var firstTeamMemberSkillset = $(".skills-container > div:first-child");
                console.log(firstTeamMemberSkillset);
                firstTeamMemberSkillset.parent().append(firstTeamMemberSkillset);
                firstTeamMemberSkillset.prev().prev().hide();
                firstTeamMemberSkillset.hide();
                firstTeamMemberSkillset.prev().show();
            });

            arrowLeft.click(function(){
               var lastTeamMember = $(".team-content > div:last-child");
                lastTeamMember.parent().prepend(lastTeamMember);
                lastTeamMember.next().css("opacity", "1").css("transform", "scale(1)");
                lastTeamMember.next().next().css("opacity", ".2").css("transform", "scale(.8)");

                var lastTeamMemberSkillset = $(".skills-container > div:last-child");
                lastTeamMemberSkillset.parent().prepend(lastTeamMemberSkillset);
                lastTeamMemberSkillset.next().next().hide();
                lastTeamMemberSkillset.hide();
                lastTeamMemberSkillset.next().show();
            });
        }

        function intervalSlider(){
            var currentPosition = 0;
            var slideWidth = 700;
            var slides = $('.testimonials-slide');
            var numberOfSlides = slides.length;
            var slideShowInterval;
            var speed = 3000;

            slideShowInterval = setInterval(changePosition, speed);
            slides.wrapAll('<div id="slidesHolder"></div>');
            slides.css({ 'float' : 'left' });
            $('#slidesHolder').css('width', slideWidth * numberOfSlides);

            function changePosition() {
                if(currentPosition == numberOfSlides - 1) {
                    currentPosition = 0;
                } else {
                    currentPosition++;
                }
                moveSlide();
            }

            function moveSlide() {
                $('#slidesHolder')
                    .animate({'marginLeft' : slideWidth*(-currentPosition)});
            }
        }


        function lightbox(){
            var imageClick = $(".gallery");
            imageClick.on('click', 'img', function(event){
                event.preventDefault();
                var imageSrc = $(this).attr("src");


                if($("#lightbox").length > 0) {
                    $("#content").html('<img src="' + imageSrc + '" />');
                    $("#lightbox").fadeIn(200);
                }
                else {
                    var lightbox =
                        '<div id="lightbox">' +
                        '<p>Click to close</p>' +
                        '<div id="content">' + //insert clicked link's href into img src
                        '<img src="' + imageSrc +'" />' +
                        '</div>' +
                        '</div>';
                    $(lightbox).hide().appendTo("body").fadeIn(200);
                }
                $("#lightbox").click(function(){
                    $(this).fadeOut(200);
                });
            });
        }


        function filterImages() {

            var filterBtns = $(".filter-buttons");
            var allImages = $(".gallery figure");

            filterBtns.on("click", ".btn-filter", function(event){
                event.preventDefault();

                // this line is major for appropriate running of this function. when Watch More button is clicked, allImages variable updates all new loaded figures
                allImages = $(".gallery figure");

                if($(this).hasClass("activeBtn") === false) {
                    $(this).addClass("activeBtn");
                    $(this).siblings().removeClass("activeBtn");
                    var dataFilterName = $(this).data("filter");
                    allImages.hide();
                    var filteredImages = allImages.filter(dataFilterName);
                    filteredImages.fadeIn(500);
                }
            });
        }

        function addMoreImages() {
            var addMoreBtn = $(".btn-watchMore");
            var moreImages = $(".gallery figure");
            addMoreBtn.click(function(event){
                event.preventDefault();
                var createdImages = moreImages.clone();
                createdImages.hide().appendTo(".gallery").slideDown(300);
            });
        }

        function formValidator(){

            function checkName(){
                $('.contact-form input[name="yourName"]').on("input", function() {
                    var inputRealTime = this.value;
                    if(inputRealTime.length < 3
                        && inputRealTime.length > 0) {
                        $(".tooltip").fadeIn();
                    }
                    else {
                        $(".tooltip").fadeOut();
                    }
                });
            }

            function checkEmail(){
                $('.contact-form input[name="yourEmail"]').on("input", function() {
                    var inputRealTime = this.value;
                    if((inputRealTime.indexOf("@") < 0
                        || inputRealTime.indexOf(" ") != -1
                        || inputRealTime.indexOf(".") < 0)
                        && inputRealTime.length > 0) {
                        $(".tooltipTwo").fadeIn();
                    }
                    else {
                        $(".tooltipTwo").fadeOut();
                    }
                });
            }
            function checkText(){
                $('.contact-form textarea').on("input", function() {
                    var inputRealTime = this.value;
                    if(inputRealTime.length < 10
                    && inputRealTime.length > 0) {
                        $(".tooltipThree").fadeIn();
                    }
                    else {
                        $(".tooltipThree").fadeOut();
                    }
                });
            }
            checkName();
            checkEmail();
            checkText();
        }


        function sendEmail (){
            var sendMailBtn = $(".btn-sendEmail");

            sendMailBtn.on("click", function(){
               alert("Wait a minute... This job belongs to backend guy!");
                return false
            });
        }















        //function setSkills(){
        //    // pobierasz atrybuty data
        //    // wyszukujesz dla kazdego data odpowiedni filoetowy pasek
        //    // ustawiasz mu width css()
        //}
        //
        //function showSkills() {
        //    setSkills();
        //    arrowLeft.click(function() {
        //        //przesun element
        //        setSkills();
        //    })
        //
        //}


        return {
            scrollPage: scrollPage,
            stickyMenu: stickyMenu,
            clickAndChange: clickAndChange,
            intervalSlider: intervalSlider,
            lightbox: lightbox,
            filterImages: filterImages,
            addMoreImages: addMoreImages,
            formValidator: formValidator,
            sendEmail: sendEmail,
            learnMore: learnMore,
            clickHamburgerBtn: clickHamburgerBtn
            //showSkills:showSkills
        }
    };

    var app = new Application();
        app.scrollPage();
        app.stickyMenu();
        app.clickAndChange();
        app.intervalSlider();
        app.lightbox();
        app.filterImages();
        app.addMoreImages();
        app.formValidator();
        app.sendEmail();
        app.learnMore();
        app.clickHamburgerBtn();
        //app.showSkills();





    //var toggles = document.querySelectorAll(".c-hamburger");
    //
    //for (var i = toggles.length - 1; i >= 0; i--) {
    //    var toggle = toggles[i];
    //    toggleHandler(toggle);
    //};
    //
    //function toggleHandler(toggle) {
    //    toggle.addEventListener( "click", function(e) {
    //        e.preventDefault();
    //        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    //    });
    //}





    //$(".c-hamburger").on("click", function(){
    //    $(".hamburger-menu").toggle();
    //});


    //
    //$(window).resize(function() {
    //    if ($(window).width() < 600) {
    //        $(".main-nav ul").addClass("hamburger-menu")
    //    }
    //    else {
    //        $(".main-nav ul").removeClass("hamburger-menu")
    //    }
    //});









       //setInterval(moveCircle, 3000);


    //the end of DOM LOADED function
});