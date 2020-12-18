let theWheel = new Winwheel({
                'outerRadius'     : 190,        // Set outer radius so wheel fits inside the background.
                'innerRadius'     : 75,         // Make wheel hollow so segments dont go all way to center.
                'textFontSize'    : 16,         // Set default font size for the segments.
                'textOrientation' : 'curved', // Make text vertial so goes down from the outside of wheel.
                'responsive'   : true,
                'textAlignment'   : 'center',    // Align text to outside of wheel.
                'numSegments'     : 8,         // Specify number of segments.
                'pointerAngle' : 100,
                'segments'        :             // Define segments including colour and text.
                [                               // font size and text colour overridden on backrupt segments.
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'text' : 'SURPRISE ME', 'textFontSize' : 14, 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'text' : '09 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#faeff1', 'strokeStyle' : 'transparent', 'text' : '08 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#edcfd7', 'strokeStyle' : 'transparent', 'text' : '09 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#faeff1', 'strokeStyle' : 'transparent', 'text' : '08 VG', 'textFillStyle' : '#000'},
                   {'fillStyle' : '#eea4b1', 'strokeStyle' : 'transparent', 'text' : '010 VG', 'textFillStyle' : '#000'}
                ],
                'animation' :           // Specify the animation to use.
                {
                    'type'     : 'spinToStop',
                    'duration' : 10,
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
            
            let wheelPower    = 10;
            let wheelSpinning = false;
            
            // Loads the tick audio sound in to an audio object.
            let audio = new Audio('http://dougtesting.net//elements/sound/tick.mp3');
 
            // This function is called when the sound is to be played.
            function playSound()
            {
                // Stop and rewind the sound if it already happens to be playing.
                audio.pause();
                audio.currentTime = 0;
 
                // Play the sound.
                audio.play();
            }

             

            function startSpin()
          {
            if (wheelSpinning == false) {
              theWheel.animation.spins = 10;
              theWheel.startAnimation();
              wheelSpinning = true;
            }
          }
 
            // Called when the animation has finished.
            function alertPrize(indicatedSegment)
            {
                // Display different message if win/lose/backrupt.
                if (indicatedSegment.text == 'LOOSE TURN') {
                    alert('Sorry but you loose a turn.');
                } else if (indicatedSegment.text == 'BANKRUPT') {
                    alert('Oh no, you have gone BANKRUPT!');
                } else {
                    alert("You have won " + indicatedSegment.text);
                }
            }

            