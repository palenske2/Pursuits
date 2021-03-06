var PRESENTATION_VIEWER=function(){function o(){var o,c,s=$("section.presentation-container");o=n(s),c=e(s,o),t(s,c,o),i(s,c),a(s),r(c,o),c.on("ready",function(o){w.sendTotalPageCount(o.data.numPages,s.data("session-uuid"))}),c.on("pagefocus",function(o){w.toggleArrowVisibility(o.data.page,o.data.numPages)}),$(window).on("unload",function(){c.destroy()}),PRESENTATION_VIEWER_DIALOG.init(),w.trackMixpanelEvent({Action:"Presentation Viewed",Description:"Presentation viewed"})}function n(o){return o.data("scroll")?Crocodoc.LAYOUT_VERTICAL_SINGLE_COLUMN:Crocodoc.LAYOUT_PRESENTATION}function e(o,n){var e=Crocodoc.createViewer("div.viewer",{url:o.data("asset-url"),layout:n,plugins:{realtime:{url:o.data("realtime-url")},analytics:{ontrack:function(n,e,t){w.sendPageEvent(n,e,o.data("session-uuid"),t)}}}});return e.load(),e}function t(o,n,e){e===Crocodoc.LAYOUT_PRESENTATION&&(o.find(".previous-page").unbind("click").click(function(){n.scrollTo(Crocodoc.SCROLL_PREVIOUS)}),o.find(".next-page").unbind("click").click(function(){n.scrollTo(Crocodoc.SCROLL_NEXT)})),o.find(".zoom-in").unbind("click").click(function(o){n.zoom(Crocodoc.ZOOM_IN),o.preventDefault(),o.stopPropagation(),w.trackMixpanelEvent({Action:"View Zoomed In",Description:"Clicked on the Zoom In button in the viewer"})}),o.find(".zoom-out").unbind("click").click(function(o){n.zoom(Crocodoc.ZOOM_OUT),o.preventDefault(),o.stopPropagation(),w.trackMixpanelEvent({Action:"View Zoomed Out",Description:"Clicked on the Zoom Out button in the viewer"})}),o.find(".download").unbind("click").click(function(){w.updateAsDownloaded(o.attr("data-session-uuid")),w.trackMixpanelEvent({Action:"Viewer Downloaded",Description:"Clicked on the Download button in the viewer"})})}function i(o,n){$(document).keydown(function(o){switch(o.which){case 37:n.scrollTo(Crocodoc.SCROLL_PREVIOUS);break;case 39:n.scrollTo(Crocodoc.SCROLL_NEXT)}})}function a(o){w.renderHelpTip(o.find(".download img")),w.renderHelpTip(o.find(".zoom-in img")),w.renderHelpTip(o.find(".zoom-out img"))}function c(o){o.qtip({content:{attr:"alt"},position:{my:"top center",at:"bottom center"},style:{classes:"qtip-dark qtip-shadow"}})}function r(o,n){var e=$("body");n===Crocodoc.LAYOUT_PRESENTATION&&(e.on("swipeLeft",function(){o.scrollTo(Crocodoc.SCROLL_NEXT)}),e.on("swipeRight",function(){o.scrollTo(Crocodoc.SCROLL_PREVIOUS)}),e.on("swipeUp",function(){o.scrollTo(Crocodoc.SCROLL_NEXT)}),e.on("swipeDown",function(){o.scrollTo(Crocodoc.SCROLL_PREVIOUS)}),e.swipe({swipeLeft:function(){e.trigger("swipeLeft")},swipeRight:function(){e.trigger("swipeRight")},swipeUp:function(){e.trigger("swipeUp")},swipeDown:function(){e.trigger("swipeDown")}}))}function s(o,n,e,t){$.ajax({url:"/page_events",type:"POST",async:t,data:{page_event:{page_number:o,duration:Math.floor(1e3*n)},session_uuid:e}}).retry({times:3,timeout:5e3})}function d(o,n){$.ajax({url:"/presentations",type:"PUT",data:{session_uuid:n,presentation:{num_pages:o}}}).retry({times:3,timeout:5e3})}function u(o){$.ajax({url:"/presentation_sessions",type:"PUT",data:{session_uuid:o,presentation_session:{downloaded:!0}}}).retry({times:3,timeout:5e3})}function l(o){var n="Yesware Master",e=$("section.presentation-container").data("mixpanel-token");return o?null==o.Action||null==o.Description?void console.log("trackMixpanelEvent: Cannot log without event action and description"):(null==mixpanel[n]&&mixpanel.init(e,{},n),void mixpanel[n].track("Presentation View",o)):void console.log("trackMixpanelEvent: Cannot log without event data")}function p(o,n){1===o?$(".previous-page").hide():$(".previous-page").show(),o===n?$(".next-page").hide():$(".next-page").show()}var w={init:o,sendPageEvent:s,sendTotalPageCount:d,wireGestures:r,wireButtons:t,wireKeys:i,updateAsDownloaded:u,wireHoverTips:a,renderHelpTip:c,trackMixpanelEvent:l,toggleArrowVisibility:p};return w}();$("body.controller-presentations.action-show>section.presentation-container").ready(function(){PRESENTATION_VIEWER.init()});