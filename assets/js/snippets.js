$(document).ready(function(){
  svgeezy.init(false, 'png');
  $(".l-main").fitVids();
});

$(".post").click(function() {
  window.location = $(this).find("a").attr("href");
  return false;
});

document.createElement( "picture" );

/**
 * FF's first picture implementation is static and does not react to viewport changes, this tiny script fixes this.
 */
(function() {
  /*jshint eqnull:true */
  var ua = navigator.userAgent;

  if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 41) ) {
    addEventListener("resize", (function() {
      var timer;

      var dummySrc = document.createElement("source");

      var fixRespimg = function(img) {
        var source, sizes;
        var picture = img.parentNode;

        if(picture.nodeName.toUpperCase() == 'PICTURE'){
          source = dummySrc.cloneNode();

          picture.insertBefore(source, picture.firstElementChild);
          setTimeout(function() {
              picture.removeChild(source);
          });
        } else if(!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
          img._pfLastSize = img.offsetWidth;
          sizes = img.sizes;
          img.sizes += ',100vw';
          setTimeout(function(){
              img.sizes = sizes;
          });
        }
      };

      var findPictureImgs = function() {
        var i;
        var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
        for (i = 0; i < imgs.length; i++) {
          if (imgs[i].currentSrc && !imgs[i].complete) {
            removeEventListener("resize", onResize);
            break;
          }
          fixRespimg(imgs[i]);
        }
      };
      var onResize = function() {
        clearTimeout(timer);
        timer = setTimeout(findPictureImgs, 99);
      };

      dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      return onResize;
    })());
  }
})();
