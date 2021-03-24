// new year countdown func
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countDown = document.getElementById("countdown");
const fireWorkBtn = document.getElementById("fireWorkBtn");
const headingOne = document.getElementById("headingOne");
const headingTwo = document.getElementById("headingTwo");
const cap = document.getElementById("cap");
const cap2 = document.getElementById("cap2");
const fireWorkBtn2 = document.getElementById("fireWorkBtn2");
const face2 = document.getElementById("face2");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`April 10 ${currentYear} 00:00:00`);

function updateCountDown() {
   const currentTime = new Date();
   diff = newYearTime - currentTime;

   const d = Math.floor(diff / 1000 / 60 / 60 / 24);

   const h = Math.floor(diff / 1000 / 60 / 60) % 24;

   const m = Math.floor(diff / 1000 / 60) % 60;

   const s = Math.floor(diff / 1000) % 60;

   days.innerHTML = d;
   hours.innerHTML = h < 10 ? "0" + h : h;

   minutes.innerHTML = m < 10 ? "0" + m : m;

   seconds.innerHTML = s < 10 ? "0" + s : s;
}

setInterval(updateCountDown, 1000);

// emoji func
document.querySelector("body").addEventListener("mousemove", eyeball);

function eyeball() {
   const eye = document.querySelectorAll(".eye");
   eye.forEach((eye) => {
      const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      const y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
      const radian = Math.atan2(event.pageX - x, event.pageY - y);
      const rot = radian * (180 / Math.PI) * -1 + 270;
      eye.style.transform = "rotate(" + rot + "deg)";
   });
}

function fireWork() {
   $(".fireWork").fireworks({
      sound: true, // sound effect
      opacity: 0.4,
      width: "100%",
      height: "100%",
   });
   headingOne.innerHTML = "🎈🎉 Happy New Year ! 🥳";
   headingTwo.innerHTML =
      "Let us remember the good times along with the bad And pray for sunnier days in 2021 ...";
   cap.style.display = "block";
   cap2.style.display = "block";
}

fireWorkBtn.addEventListener("click", () => {
   fireWork();
});

fireWorkBtn2.addEventListener("click", () => {
   fireWork();
   headingOne.style.marginBottom = "150px";
   headingTwo.style.marginTop = "150px";
   face2.style.marginTop = "140px";
});

(function ($) {
   function FollowCursor(config) {
       this.init(config);
   }

   FollowCursor.prototype = {
       middleX : 0,
       middleY : 0,

       //----------------------- protected properties and methods -------------
       /**
        * @protected
        */
       constructor: FollowCursor,

       /**
        * Container element. Should be passed into constructor config
        * @protected
        * @type {jQuery}
        */
       el: null,

       /**
        * Init/re-init the object
        * @param {object} config - Config
        */
       init: function(config) {
           $.extend(this, config);
       },
       
       handleMove: function(event) {
           var newY = 0;
           var newX = 0;
           var middleX = this.middleX;
           var middleY = this.middleY;
           var degrees = 0;

           /* done together in just four quadrants. */
           if (event.pageY < middleY && event.pageX < middleX) {
             /* upper left. */
             newY = middleY - event.pageY;
             newX = middleX - event.pageX;

             var radians = Math.atan2(newY, newX);
             degrees = radians * (180 / Math.PI);
             degrees = 90 - degrees;
             degrees *= -1;
           } else if (event.pageY < middleY && event.pageX > middleX) {
             /* upper right. */
             newY = middleY - event.pageY;
             newX = event.pageX - middleX;
             add = 0.25 * 360;

             var radians = Math.atan2(newY, newX);
             degrees = radians * (180 / Math.PI);
             degrees = 90 - degrees;
           } else if (event.pageY > middleY && event.pageX > middleX) {
             /* lower right. */
             newY = event.pageY - middleY;
             newX = event.pageX - middleX;
             add = 0.5 * 360;

             var radians = Math.atan2(newY, newX);
             degrees = radians * (180 / Math.PI);
             degrees += 90;
           } else if (event.pageY > middleY && event.pageX < middleX) {
             /* lower left. */
             newY = event.pageY - middleY;
             newX = middleX - event.pageX;
             add = 0.75 * 360;

             var radians = Math.atan2(newY, newX);
             degrees = radians * (180 / Math.PI);
             degrees += 90;
             degrees *= -1;
           } else if (event.pageX < middleX && event.pageY == middleY) {
             /* west */
             degrees = -90;
           } else if (event.pageX == middleX && event.pageY > middleY) {
             /* south */              
             degrees = -180;
           } else if (event.pageX > middleX && event.pageY == middleY) {
             /* east */              
             degrees = 90;
           }

           var $cvs = this.el;
           // the degrees in this transform are absolute!
           $cvs.css('-ms-transform', 'rotate(' + degrees + 'deg)');
           $cvs.css('-o-transform', 'rotate(' + degrees + 'deg)');
           $cvs.css('-webkit-transform', 'rotate(' + degrees + 'deg)');
           $cvs.css('-moz-transform', 'rotate(' + degrees + 'deg)');
       }
   }
   
   //----------------------- Initiating jQuery plugin -------------------------

   /**
    * Set an element to rotate following the mouse movement.
    */
   $.fn.followCursor = function() {
       var dataName = 'followCursor';

       return this.each(function() {
           var el = $(this);
           var initialConfig = $.extend({}, el.data());
           config = $.extend(initialConfig, {});
           config.el = el;
           var instance = new FollowCursor(config);

           var position = el.offset();
           var realWidth = el.outerWidth();
           var realHeight = el.outerHeight();
           var middleX = position.left + (el.width() / 2);
           var middleY = position.top + (el.height() / 2);

           instance.middleX = middleX;
           instance.middleY = middleY;

           el.data(dataName, instance);

           $(document).mousemove(function(event) {
               instance.handleMove(event);
           });
       });
   };
}(jQuery));
