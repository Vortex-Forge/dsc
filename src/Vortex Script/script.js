// ==UserScript==
// @name         Scope Autshoot for Deadshot.io by NOOB
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds auto shoot on scoping,better crosshair covering spray range,location detector,auto jumping while firing with realtime ping indicator with ui.Use "C" to enable or disable.
// @author       Noob Fr
// @match        https://deadshot.io/*
// @grant
// ==/UserScript==

(function () {
    'use strict';

    let featuresEnabled = true;
    let crosshairColor = 'green';
    let kKeyInterval = null;
    let isRightMousePressed = false;

    const killNoobText = document.createElement('div');
    killNoobText.textContent = "[KILL] NOOB's Arena";
    killNoobText.style.position = 'fixed';
    killNoobText.style.top = '170px';
    killNoobText.style.left = '10px';
    killNoobText.style.fontSize = '20px';
    killNoobText.style.fontWeight = 'bold';
    killNoobText.style.color = 'red';
    killNoobText.style.textShadow = '2px 2px 5px black';
    killNoobText.style.zIndex = '9999';
    document.body.appendChild(killNoobText);

    const crosshair = document.createElement('div');
    crosshair.id = 'custom-crosshair';
    crosshair.style.position = 'fixed';
    crosshair.style.width = '50px';
    crosshair.style.height = '50px';
    crosshair.style.borderRadius = '50%';
    crosshair.style.border = '3px dashed ' + crosshairColor;
    crosshair.style.left = '50%';
    crosshair.style.top = '50%';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.zIndex = '9999';
    document.body.appendChild(crosshair);

    const autoFire = document.createElement('div');
    autoFire.style.position = 'fixed';
    autoFire.style.top = '200px';
    autoFire.style.left = '10px';
    autoFire.style.fontSize = '13px';
    autoFire.style.color = 'white';
    autoFire.style.zIndex = '9999';
    autoFire.textContent = `Scope Auto firing enabled`;
    document.body.appendChild(autoFire);

    const toggleInstructions = document.createElement('div');
    toggleInstructions.style.position = 'fixed';
    toggleInstructions.style.top = '230px';
    toggleInstructions.style.left = '10px';
    toggleInstructions.style.fontSize = '13px';
    toggleInstructions.style.color = 'white';
    toggleInstructions.style.zIndex = '9999';
    toggleInstructions.textContent = `Use "c" to disable`;
    document.body.appendChild(toggleInstructions);

    function toggleFeatures(enabled) {
        killNoobText.style.display = enabled ? 'block' : 'none';
        crosshair.style.display = enabled ? 'block' : 'none';
        toggleInstructions.style.display = enabled ? 'block' : 'none';
        autoFire.style.display = enabled ? 'block' : 'none';

        if (!enabled) {
            stopKKeyPress();
            isRightMousePressed = false;
        }
    }

    function startKKeyPress() {
        if (!kKeyInterval) {
            kKeyInterval = setInterval(() => {
                const kKeyEvent = new KeyboardEvent('keydown', {
                    key: 'K',
                    code: 'KeyK',
                    keyCode: 75,
                    which: 75,
                    bubbles: true,
                    cancelable: true,
                });
                document.dispatchEvent(kKeyEvent);
            }, 100);
        }
    }

    function stopKKeyPress() {
        if (kKeyInterval) {
            clearInterval(kKeyInterval);
            kKeyInterval = null;

            const kKeyUpEvent = new KeyboardEvent('keyup', {
            key: 'K',
            code: 'KeyK',
            keyCode: 75,
            which: 75,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(kKeyUpEvent);
        }
    }

   /* function simulateSpacebarPress() {
        if (!featuresEnabled) return;

        for (let i = 0; i < 500; i++) {
            const keyDownEvent = new KeyboardEvent('keydown', {
                key: ' ',
                code: 'Space',
                keyCode: 32,
                which: 32,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(keyDownEvent);

            const keyUpEvent = new KeyboardEvent('keyup', {
                key: ' ',
                code: 'Space',
                keyCode: 32,
                which: 32,
                bubbles: true,
                cancelable: true
            });
            setTimeout(() => {
                document.dispatchEvent(keyUpEvent);
            }, 1);
        }
    } */

    document.addEventListener('keydown', (e) => {
        if (e.key === 'c') {
            featuresEnabled = !featuresEnabled;
            toggleFeatures(featuresEnabled);
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (!featuresEnabled) return;

        if (e.button === 2) {
            crosshairColor = 'red';
            crosshair.style.borderColor = crosshairColor;

            if (!isRightMousePressed) {
                isRightMousePressed = true;
                startKKeyPress();
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 2) {
            crosshairColor = 'green';
            crosshair.style.borderColor = crosshairColor;

            stopKKeyPress();
            isRightMousePressed = false;
        }
    });


})();
