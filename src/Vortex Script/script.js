// ==UserScript==
// @name         Vortex Forge V1.0
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Vortex Forge User Script
// @author       NOOB
// @match        https://deadshot.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const newSettingsDivContent = `<div id="settingsDiv"
    style="z-index: 100; position: absolute; opacity: 0; visibility: hidden; display: none;
    margin-top: 382.459px; margin-left: 293.2px; transform: translate(-50%, -50%) scale(0.853704);
    max-height: 80vh; display: inline-block; overflow-y: auto; overflow-x: hidden; border-radius: 8px;">

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 2px;">Vortex Forge Mode</p>
        <label>
            <input id="vfsettings" class="checkbox" type="checkbox" checked="">
            <span></span>
        </label>
    </div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px; margin-top: 2px;">Clan Tag:</p>
        <label>
            <input id="clantag" class="checkbox" type="checkbox" checked="">
            <span></span>
        </label>
    </div>

    <div class="setting select" style="padding: 9px 30px; margin: 0px;">
        <p style="font-size: 21px; margin-top: 8px;">Region:</p>
        <select id="region" class="s-hidden" style="visibility: hidden; opacity: 0; font-size: 21px;">
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
            <option value="Australia">Australia</option>
        </select>

    </div>

    <div class="bar"></div>

    <div class="setting sldr" style="margin: 0px; background-color: rgba(255, 255, 255, 0.03); padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 4px;">Master Volume:</p>
        <div>
            <input class="range" type="range" step="1" min="0" max="100" value="60">
            <input id="volume" class="number" type="number" step="1" min="0" max="100" value="60">
        </div>
    </div>

    <div class="bar"></div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 2px;">Raw Mouse Input:</p>
        <label>
            <input id="rawmouse" class="checkbox" type="checkbox" checked="">
            <span></span>
        </label>
    </div>

    <div class="bar"></div>

    <div class="setting sldr" style="margin: 0px; padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px; margin-top: 4px;">Sensitivity:</p>
        <div>
            <input class="range" type="range" step="0.001" min="0.01" max="5" value="1.5">
            <input id="sensitivity" class="number" type="number" step="0.001" min="0.01" max="5" value="1.5">
        </div>
    </div>

    <div class="bar"></div>

    <div class="setting sldr" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 4px;">Zoom Sens Multiplier:</p>
        <div>
            <input class="range" type="range" step="0.01" min="0.1" max="1" value="0.7">
            <input id="zoom" class="number" type="number" step="0.01" min="0.1" max="1" value="0.7">
        </div>
    </div>

    <div class="bar"></div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px; margin-top: 2px;">Anti-Aliasing:</p>
        <label>
            <input id="antialias" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>

    <div class="bar"></div>

    <div class="setting sldr" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 4px;">Resolution:</p>
        <div>
            <input class="range" type="range" step="0.05" min="0.3" max="1" value="1">
            <input id="renderscale" class="number" type="number" step="0.05" min="0.3" max="1" value="1">
        </div>
    </div>

    <div class="bar"></div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px; margin-top: 2px;">Colorblind Mode:</p>
        <label>
            <input id="clrblnd" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>

    <div class="bar"></div>

    <div class="bar"></div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 2px;">Static Crosshair:</p>
        <label>
            <input id="static" class="checkbox" type="checkbox" checked="">
            <span></span>
        </label>
    </div>

    <div class="bar"></div>

    <div class="setting toggle" style="margin: 0px; padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px; margin-top: 2px;">Left-Handed:</p>
        <label>
            <input id="lefthand" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>

<div class="setting toggle" style="margin: 0px; padding: 9px 30px;">
        <p style="font-size: 21px; margin-top: 2px;">Toggle ADS:</p>
        <label>
            <input id="toggleads" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>
</div>`;

    function replaceSettingsDiv() {
        const oldSettingsDiv = document.getElementById('settingsDiv');
        if (oldSettingsDiv) {
            oldSettingsDiv.outerHTML = newSettingsDivContent;
        } else {
            const parent = document.body;
            const newDiv = document.createElement('div');
            newDiv.innerHTML = newSettingsDivContent;
            parent.appendChild(newDiv.firstElementChild);
        }
    }

    window.addEventListener('load', () => {
        const retryInterval = setInterval(() => {
            if (document.getElementById('settingsDiv') || document.readyState === 'complete') {
                replaceSettingsDiv();
                clearInterval(retryInterval);
            }
        }, 500);
    });

    let featuresEnabled = true;
    let crosshairColor = 'green';
    let kKeyInterval = null;
    let isRightMousePressed = false;

    const crosshair = document.createElement('div');
    crosshair.id = 'custom-crosshair';
    crosshair.style.position = 'fixed';
    crosshair.style.width = '50px';
    crosshair.style.height = '50px';
    crosshair.style.borderRadius = '50%';
    crosshair.style.border = `3px dashed ${crosshairColor}`;
    crosshair.style.left = '50%';
    crosshair.style.top = '50%';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.zIndex = '9999';
    document.body.appendChild(crosshair);

    const autoFire = createInfoBanner('Vortex Forge Client Enabled', 200);
    const toggleInstructions = createInfoBanner('Turn off in Settings Section', 230);

    function createInfoBanner(text, topPosition) {
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.top = `${topPosition}px`;
        banner.style.left = '10px';
        banner.style.fontSize = '13px';
        banner.style.color = 'white';
        banner.style.zIndex = '9999';
        banner.textContent = text;
        document.body.appendChild(banner);
        return banner;
    }

    function toggleFeatures(enabled) {
        crosshair.style.display = enabled ? 'block' : 'none';
        autoFire.style.display = enabled ? 'block' : 'none';
        toggleInstructions.style.display = enabled ? 'block' : 'none';
        if (!enabled) stopKKeyPress();
    }

    function startKKeyPress() {
        if (!kKeyInterval) {
            kKeyInterval = setInterval(() => {
                const kKeyEvent = new KeyboardEvent('keydown', {
                    key: 'K',
                    code: 'KeyK',
                    keyCode: 75,
                    bubbles: true,
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
                bubbles: true,
            });
            document.dispatchEvent(kKeyUpEvent);
        }
    }

    function setupVortexForgeModeToggle() {
        const vfCheckbox = document.getElementById('vfsettings');
        if (vfCheckbox) {
            vfCheckbox.addEventListener('change', (event) => {
                featuresEnabled = event.target.checked;
                toggleFeatures(featuresEnabled);
            });
            toggleFeatures(vfCheckbox.checked);
        } else {
            console.warn("Vortex Forge Mode checkbox not found.");
        }
    }

    const retryInterval = setInterval(() => {
        if (document.getElementById('vfsettings')) {
            setupVortexForgeModeToggle();
            clearInterval(retryInterval);
        }
    }, 500);

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
