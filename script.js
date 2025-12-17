const overlay = document.getElementById('overlay');
        const fullscreenMessage = document.getElementById('fullscreenMessage');
        const fullscreenButton = document.getElementById('fullscreenButton');
        const mainContent = document.getElementById('mainContent');
        const welcomeText = document.getElementById('welcomeText');
        const gifContainer = document.querySelector('.gif-container');
        const audio = document.getElementById('music');
        const thankYouMessage = document.getElementById('thankYouMessage');
        const giftMessage = document.getElementById('giftMessage');
        const videoContainer = document.getElementById('videoContainer');
        const videoPlayer = document.getElementById('videoPlayer');
        
        let fullscreenEnabled = false;

        function init() {
            setTimeout(() => {
                showTypingEffect(fullscreenMessage, "Bấm vào nút dưới để tiếp tục nào bro ;-;", 80, () => {
                    setTimeout(() => {
                        fullscreenButton.style.opacity = 1;
                    }, 500);
                });
            }, 500);

            fullscreenButton.addEventListener('click', requestFullscreen);
        }

        function showTypingEffect(element, text, speed, callback) {
            element.textContent = '';
            element.style.opacity = 1;
            let index = 0;
            
            const interval = setInterval(() => {
                element.textContent += text.charAt(index);
                index++;
                
                if (index === text.length) {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, speed);
        }

        async function requestFullscreen() {
            if (!fullscreenEnabled) {
                const elem = document.documentElement;
                try {
                    if (elem.requestFullscreen) {
                        await elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        await elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        await elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                        await elem.msRequestFullscreen();
                    }
                    fullscreenEnabled = true;
                    startExperience();
                } catch (err) {
                    console.log('Fullscreen request failed:', err);
                    fullscreenEnabled = true;
                    startExperience();
                }
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        function handleFullscreenChange() {
            if (!fullscreenEnabled && (document.fullscreenElement || document.mozFullScreenElement || 
                document.webkitFullscreenElement || document.msFullscreenElement)) {
                fullscreenEnabled = true;
                startExperience();
            }
        }

        function startExperience() {
            fullscreenMessage.style.opacity = 0;
            fullscreenButton.style.opacity = 0;
            
            setTimeout(() => {
                fullscreenMessage.classList.add('hidden');
                fullscreenButton.classList.add('hidden');
                showWelcomeMessage();
            }, 1000);
        }

        function showWelcomeMessage() {
            const welcomeMsg = "Welcome to Ever Night Dance!";
            mainContent.classList.remove('hidden');
            
            showTypingEffect(welcomeText, welcomeMsg, 100, () => {
                setTimeout(() => {
                    startMainContent();
                }, 1000);
            });
        }

        function startMainContent() {
            overlay.style.opacity = 0;
            
            setTimeout(() => {
                gifContainer.style.opacity = 1;
                audio.play().catch(err => console.log('Audio play error:', err));
                
                setTimeout(() => {
                    showThankYou();
                }, 60000);
            }, 1000);
        }

        function showThankYou() {
            audio.pause();
            
            welcomeText.style.opacity = 0;
            gifContainer.style.opacity = 0;
            
            overlay.style.opacity = 1;
            
            setTimeout(() => {
                mainContent.classList.add('hidden');
                showThankYouText();
            }, 2000);
        }

        function showThankYouText() {
            thankYouMessage.classList.remove('hidden');
            const text = "Cảm ơn bạn đã lắng nghe đến bây giờ,";
            
            showTypingEffect(thankYouMessage, text, 80, () => {
                setTimeout(() => {
                    thankYouMessage.style.opacity = 0;
                    setTimeout(() => {
                        thankYouMessage.classList.add('hidden');
                        showGiftText();
                    }, 1000);
                }, 2000);
            });
        }

        function showGiftText() {
            giftMessage.classList.remove('hidden');
            const text = "và đây là món quà mà tôi dành tặng cho bạn ❤️";
            
            showTypingEffect(giftMessage, text, 80, () => {
                setTimeout(() => {
                    giftMessage.style.opacity = 0;
                    setTimeout(() => {
                        playVideo();
                    }, 1000);
                }, 2000);
            });
        }

        function playVideo() {
            overlay.style.opacity = 0;
            
            videoContainer.style.display = 'block';
            
            videoPlayer.play().catch(err => console.log('Video play error:', err));
        }

        window.addEventListener('load', init);