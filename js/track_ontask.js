       /*track fullscreen changes*/

       const screen = {
           event_log: []
       }




       /*
       a little hacky because F11 trumps all when exiting
       but seems to work...
       */

       if (screenfull.isEnabled) {
           screenfull.on('change', () => {
               t = window.performance.now();

               if (screenfull.isFullscreen) {
                   screen.event_log.push(
                       {
                           trial_type: "track_screen",
                           type: "fullscreen_on",
                           timestamp: t
                       }
                   )
                   
                   /* Change text onscreen */
                   document.querySelector("#full").innerHTML = "Fullscreen"
                   
                   /* Add to log */
                   document.querySelector("#log").innerHTML += `<li>Fullscreen on at ` + t + `</li>`

               } else {
                   screen.event_log.push(
                       {
                           trial_type: "track_screen",                           
                           type: "fullscreen_off",
                           timestamp: t
                       }
                   )
                   
                
                    /* Change text onscreen */
                   document.querySelector("#full").innerHTML = "Not Fullscreen"
                   /* Add to log */
                   document.querySelector("#log").innerHTML += `<li>Fullscreen off at ` + t + `</li>`

               }

               console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
           });

           /* Capture F11 so you can track it! */
           hotkeys('f11', function (event, handler) {
               // Prevent the default refresh event under WINDOWS system
               event.preventDefault()
               screenfull.toggle();

           });
       }

       /*track window focus */
       window.addEventListener('blur', function () {
           t = window.performance.now();

           screen.event_log.push(
               {
                   trial_type: "track_screen",
                   type: "focused_off",
                   timestamp: t
               }
           )

           
             /* Change text onscreen */
             document.querySelector("#focus").innerHTML = "Not focused on this tab"
           
                /* Add to log */
                   document.querySelector("#log").innerHTML += `<li>Tab off focus at ` + t + `</li>`

           console.log('blur');
       });

       window.addEventListener('focus', function () {
           t = window.performance.now();


           screen.event_log.push(
               {
                   trial_type: "track_screen",                   
                   type: "focused_on",
                   timestamp: t
               }
           )

              /* Change text onscreen */
             document.querySelector("#focus").innerHTML = "Focused on this tab"

            /* Add to log */
                   document.querySelector("#log").innerHTML += `<li>Tab on focus at ` + t + `</li>`

           console.log('focus');
       });

