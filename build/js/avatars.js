const questions=document.querySelectorAll(".faq-item");questions.forEach((function(e){e.addEventListener("click",(function(){if($this=this,!this.classList.contains("active")){$this.closest(".faq-container").querySelectorAll(".faq-item").forEach((function(e){e.classList.remove("active"),e.querySelector(".faq-content").style.maxHeight=null})),$this.classList.add("active"),$this.querySelector(".faq-content").style.maxHeight=$this.querySelector(".faq-content").scrollHeight+"px"}}))}));const navToggle=document.querySelector("#mobile-nav-toggle"),mobileNavContainer=document.querySelector("#mobile-nav-container"),closeMobileNav=document.querySelector("#mobile-nav-close");function mobileNavOpen(){mobileNavContainer.classList.remove("-translate-x-full"),document.body.classList.add("overflow-hidden")}function mobileNavClose(){mobileNavContainer.classList.add("-translate-x-full"),document.body.classList.remove("overflow-hidden")}navToggle.addEventListener("click",mobileNavOpen),closeMobileNav.addEventListener("click",mobileNavClose),document.addEventListener("DOMContentLoaded",(function(){var e;if("IntersectionObserver"in window){e=document.querySelectorAll(".lazy");var t=new IntersectionObserver((function(e,n){e.forEach((function(e){if(e.isIntersecting){var n=e.target;n.src=n.dataset.src,n.classList.remove("lazy"),t.unobserve(n)}}))}));e.forEach((function(e){t.observe(e)}))}else{var n;function o(){n&&clearTimeout(n),n=setTimeout((function(){var t=window.pageYOffset;e.forEach((function(e){e.offsetTop<window.innerHeight+t&&(e.src=e.dataset.src,e.classList.remove("lazy"))})),0==e.length&&(document.removeEventListener("scroll",o),window.removeEventListener("resize",o),window.removeEventListener("orientationChange",o))}),20)}e=document.querySelectorAll(".lazy"),document.addEventListener("scroll",o),window.addEventListener("resize",o),window.addEventListener("orientationChange",o)}}));