let theWheel = new Winwheel({
                'outerRadius'     : 195,        // Set outer radius so wheel fits inside the background.
                'innerRadius'     : 75,         // Make wheel hollow so segments dont go all way to center.
                'textFontSize'    : 28,         // Set default font size for the segments.
                'textOrientation' : 'curved', // Make text vertial so goes down from the outside of wheel.
                'responsive'   : true,
                'textAlignment'   : 'center',    // Align text to outside of wheel.
                'textMargin' : 0,
                'numSegments'     : 8,         // Specify number of segments.
                'pointerAngle' : 90,
                'segments'        :             // Define segments including colour and text.
                [                               // font size and text colour overridden on backrupt segments.
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'textAlignment'   : 'outer', 'textMargin' : 30, 'text' : 'SURPRISE\nME',  'textFontSize' : 20, 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'text' : '09\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#faeff1', 'strokeStyle' : 'transparent', 'text' : '08\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'text' : '09\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#faeff1', 'strokeStyle' : 'transparent', 'text' : '08\nVG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010\nVG', 'textFillStyle' : '#000'}
                ],
                'animation' :           // Specify the animation to use.
                {
                    'type'     : 'spinToStop',
                    'duration' : 5,
                    'spins'    : 5,
                    'callbackFinished' : alertPrize,  // Function to call whent the spinning has stopped.
                    'callbackSound'    : playSound,   // Called when the tick sound is to be played.
                    'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound.
                },
                'pins' :                // Turn pins on.
                {
                    'number'     : 8,
                    'fillStyle'  : 'silver',
                    'outerRadius': 0,
                    'responsive' : true
                }
            });
            document.write( theWheel.segments[1].text.replace(/\s/g, '') );
            let wheelPower    = 10;
            let wheelSpinning = false;
            
            // Loads the tick audio sound in to an audio object.
            let audio = new Audio('assets/js/tick.mp3');
            let audiowin = new Audio('assets/js/win.wav');
 
            // This function is called when the sound is to be played.
            function playSound()
            {
                // Stop and rewind the sound if it already happens to be playing.
                audio.pause();
                audio.currentTime = 0;
 
                // Play the sound.
                audio.play();
            }

            function calculatePrize()
            {
                // This formula always makes the wheel stop somewhere inside prize 3 at least
                // 1 degree away from the start and end edges of the segment.
                let stopAt = (1 + Math.floor((Math.random() * 40)))
         
                // Important thing is to set the stopAngle of the animation before stating the spin.
                theWheel.animation.stopAngle = stopAt;
         
                // May as well start the spin from here.
                theWheel.startAnimation();
            }

             

          //   function startSpin()
          // {
          //   if (wheelSpinning == false) {
          //     theWheel.animation.spins = 10;
          //     theWheel.startAnimation();
          //     wheelSpinning = true;
          //   }
          // }
 
            // Called when the animation has finished.
            function alertPrize(indicatedSegment)
            {
                // Display different message if win/lose/backrupt.
                if (indicatedSegment.text == 'SURPRISE\nME') {
                    setTimeout(function () {
                      audiowin.play();
                      $('#winModal').modal('show');
                      confetti.start();
                    }, 800);
                    
                    setTimeout(function () {
                      confetti.stop();
                    }, 3000);
                } else if (indicatedSegment.text == 'BANKRUPT') {
                    alert('Oh no, you have gone BANKRUPT!');
                    audiowin.play();
                } else {
                    alert("You have won " + indicatedSegment.text);
                    // $('#winModal').modal('show')
                    audiowin.play();
                }
            }

     