const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// JSas > three.js
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Earth setup
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('./img/1.png');
earthTexture.wrapS = THREE.RepeatWrapping;
earthTexture.wrapT = THREE.ClampToEdgeWrapping;
earthTexture.minFilter = THREE.LinearFilter;

const geometry = new THREE.SphereGeometry(1.2, 128, 128);
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
let earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Lighting setup
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 3, 12);
scene.add(light);
camera.position.z = 3;

function addShinyStars() {
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const stars = [];

    // Create 200 stars
    for (let i = 0; i < 200; i++) {
        const starMaterial = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xFFFFFF,
            emissive: Math.random() * 0xFFFFFF,
            emissiveIntensity: Math.random() * 0.5,  // Random initial intensity
            metalness: 0.5,
            roughness: 0.3,
            transparent: true,
        });

        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );

        star.twinkleOffset = Math.random() * 100;
        star.twinkleSpeed = 0.001 + Math.random() * 0.0008;  // Random speed for twinkling
        stars.push(star); // Store reference to each star
        scene.add(star);
    }

    // Animate the twinkling effect
    function animateStars() {
        stars.forEach(star => {
            // Update the emissive intensity to create the twinkling effect
            star.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * star.twinkleSpeed + star.twinkleOffset) * 0.5;
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();
}



// Initialize OrbitControls if it's available.
let controls;
if (typeof THREE.OrbitControls === 'function') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.25; // Smoothing effect
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Prevent going below the ground
    controls.enableZoom = true;
    controls.enableRotate = false;
    controls.enablePan = false;
} else {
    console.error('OrbitControls is not available.');
}

// Variables for mouse movement and rotation physics
let isMouseDown = false;
let prevMouseX = 0;
let prevMouseY = 0;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
let damping = 0.995; // Damping factor for slowing down the rotation

// Mouse event handlers for rotating Earth
document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        isMouseDown = true;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }
});

document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        rotationSpeedY = deltaX * 0.005;
        rotationSpeedX = deltaY * 0.005;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    } else {
        rotationSpeedX *= damping;
        rotationSpeedY *= damping;
    }
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Earth rotation damping function
function updateRotation() {
    if (!isMouseDown) {
        rotationSpeedX *= damping;
        rotationSpeedY *= damping;
        earth.rotation.y += rotationSpeedY;
        earth.rotation.x += rotationSpeedX;
    } else {
        earth.rotation.y += rotationSpeedY;
        earth.rotation.x += rotationSpeedX;
    }
}

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Earth continues rotating slowly for continuous spin
    earth.rotation.y += 0.0005; // Slow, continuous rotation on Y axis

    updateRotation();

    renderer.render(scene, camera);
}

// Zoom-in animation
// Zoom-in animation function
function zoomIn(zoomTargetZ) {
    const zoomDuration = 4;  // Time in seconds to complete the zoom
    const startTime = Date.now();

    // Track the starting zoom value to ensure smooth transitions from current zoom
    const startZoom = camera.position.z;

    function animateZoom() {
        const elapsed = (Date.now() - startTime) / 1000;  // Time elapsed in seconds
        const progress = Math.min(elapsed / zoomDuration, 1);  // Progress from 0 to 1

        // Interpolate the zoom value from startZoom to zoomTargetZ
        camera.position.z = startZoom - (startZoom - zoomTargetZ) * progress;

        // Continue the animation until zooming is complete
        if (progress < 1) {
            requestAnimationFrame(animateZoom);
        }
    }

    // Start the zoom animation
    animateZoom();
}

// Initial zoom effect on page load
window.addEventListener('load', () => {

    console.log("©️ 2025m by Artūras Jevtuchovas");
    console.log("Baltijos technologijų institutas, UAB")
    console.log("Baltic Institute of Technology")
    console.log(">>> WWW.BIT.LT <<<")
    //starting point'as zoome orentuotis nuo kur skrendam :)
    camera.position.z = 20;

    zoomIn(3);
    addShinyStars();
    animate();

});


/////THREE.JS END//////////

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLoginPop');
const iconClose = document.querySelector('.icon-close');
const antibug =
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});
////////////////////////////////////////////DOM END.//////////////////////////////////////////

//////////////////////////////////////////POP UP////////////////////////////////
function showPopup() {
    const popupContainerRegister = document.getElementById('popup-container-register');
    const counterElementRegister = document.getElementById('counter-register');

    // Display registration success popup
    popupContainerRegister.style.display = 'flex';

    let countdown = 5;

    const interval = setInterval(() => {
        countdown--;
        counterElementRegister.textContent = countdown;

        if (countdown === 0) {
            clearInterval(interval);

            setTimeout(() => {
                popupContainerRegister.style.display = 'none';
                wrapper.classList.remove('active');
            }, 500);
        }
    }, 1000);
}
//////////////////////////////////////////POP UP END////////////////////////////////
///////////////////////////////////Validation START////////////////////////////////
function validateForm(event) {
    event.preventDefault();

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirmPassword').value;

    clearErrors();
    let valid = true;

    // Validate username
    if (username.length < 2 || username.length > 30 || !/^[a-zA-Z]+$/.test(username)) {
        showError('username', "Vartotojo vardas turi būti tarp 2 ir 30 simbolių, tik iš raidžių.");
        valid = false;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
        showError('email', "Įveskite galiojantį el. pašto adresą.");
        valid = false;
    }

    // Validate phone number
    if (!/^\+?\d{1,3}?\s?\(?\d{1,3}?\)?\s?\d{1,3}?\s?\d{1,3}?\s?\d{4}$/.test(phone)) {
        showError('phone', "Telefono numeris neteisingas.");
        valid = false;
    }

    // Validate age
    if (parseInt(age) < 18 || parseInt(age) > 120) {
        showError('age', "Amžius turi būti nuo 18 iki 120 metų.");
        valid = false;
    }

    // Validate password strength
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}/.test(password)) {
        showError('reg-password', "Slaptažodis turi turėti bent 8 simbolius, didžiąją ir mažąją raidę, skaičius ir specialų simbolį.");
        valid = false;
    }

    // Check if password matches confirm password
    if (password !== confirmPassword) {
        showError('reg-confirmPassword', "Slaptažodžiai nesutampa.");
        valid = false;
    }

    if (valid) {
        showPopup();
        zoomIn(2.5);
    } else {
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        errorTimeout = setTimeout(clearErrors, 7000);
    }
}
const regform = document.getElementById('regform');
regform.addEventListener('submit', validateForm);
///////////////////////////////////Validation END////////////////////////////////

///////////////////////////////////Checkbox logic////////////////////////////////
const checkbox = document.querySelector('#terms-checkbox');
const submitBtn = document.querySelector('#submit-btn');
const label = document.querySelector('.remember-box label');

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('no-hover');
        label.classList.remove('error');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('no-hover');
        label.classList.add('error');
    }
});
///////////////////////////////////Checkbox logic END////////////////////////////////

// Error handling functions
function showError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    // console.log(`Searching for field with ID: ${fieldId}`);
    if (!inputField) {
        console.error(`Input field with id "${fieldId}" not found.`);
        return;
    }

    const errorContainer = inputField.parentElement.querySelector('.error-message');

    if (!errorContainer) {
        console.error('Error container not found.');
        return;
    }

    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

function clearErrors() {
    const errorContainers = document.querySelectorAll('.error-message');
    errorContainers.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
// Selectinam elementus pagal ID
const passwordInput = document.getElementById('reg-password');
const confirmPasswordInput = document.getElementById('reg-confirmPassword');

// Error'u handlinimas test
if (passwordInput.value !== confirmPasswordInput.value) {
    showError('reg-confirmPassword', 'Passwords do not match');
} else {
    clearErrors(); // Clear errors if passwords match
}
// const passwordInput = document.querySelector('input[name="password"]');
const inputBox = passwordInput.parentElement;
const allInputs = document.querySelectorAll('input');

// Slaptazodzio generavimo efektas.
function updateStrength() {
    const password = passwordInput.value;
    let strengthClass = '';

    if (password.length < 8) {
        strengthClass = 'strength-weak';
    } else if (/[A-Z]/.test(password) && /\d/.test(password) && /[\W_]/.test(password)) {
        strengthClass = 'strength-strong';
    } else {
        strengthClass = 'strength-medium';
    }
    inputBox.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

    if (strengthClass) {
        inputBox.classList.add(strengthClass);
    }
}

// Apply strength class on input
passwordInput.addEventListener('input', updateStrength);

// Reset the border when focusing on any other input field
allInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        if (e.target !== passwordInput) {
            // Reset the border and remove strength classes when another input is focused
            inputBox.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
        }
    });
});

// Reactivate border-bottom when returning to the password field
passwordInput.addEventListener('focus', () => {
    if (passwordInput.value) {
        updateStrength();
    } else {
        inputBox.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    }
});

//raktukas edukaciniems tikslams
const secretKey = '-ZM0G4U$-P4$AM0NE-YRA-UN1K4LU$-V1S4T0$-R31$k1NY$-kUr10-N3G4L1-P441$K1nT!-J0k14-M4t3M4t1N4-f0RMUL3-A1A2A1B1A2-b3A1B7B1A7';

function encryptData(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Call this function when registration is successful
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('regform').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission

        // Get the input values
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirmPassword').value;

        // Validate passwords
        if (password !== confirmPassword) {
            //saved
            showError('reg-confirmPassword', 'Passwords do not match');
            //saved
            return;
        }
        // Save to localStorage (for demo purposes!!!)
        const encryptedPassword = encryptData(password); // If you have a function to encrypt
        localStorage.setItem('username', username);
        localStorage.setItem('encryptedPassword', encryptedPassword);
        localStorage.setItem('email', email);

        console.log('Slaptazodis buvo sekmingai issaugotas');
        showPopup();
    })
});

// Handle login logic


// Bind the login button to handleLogin function
document.addEventListener('DOMContentLoaded', () => {
    const lets_login = document.getElementById('btn-hyrax-cute-animal');
    if (lets_login) {
        lets_login.addEventListener('click', handleLogin);

    }
});
let errorTimeout; // Variable to track the timeout

function handleLogin(event) {
    event.preventDefault();
    clearErrors();


    const usernameInput = document.querySelector('input[name="login-username"]');
    const passwordInput = document.querySelector('input[name="login-password"]');
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Retrieve stored user info from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEncryptedPassword = localStorage.getItem('encryptedPassword');
    const storedEmail = localStorage.getItem('email');

    // Decrypt stored password
    const storedPassword = decryptData(storedEncryptedPassword);

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        showLoginPopup(enteredUsername, enteredPassword, storedEmail);
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        zoomIn(2);
    } else {
        showError('login-username', 'Invalid username or password');
        // Clear any previous timeout
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }
        // Set a new timeout to clear errors after 5 seconds
        errorTimeout = setTimeout(clearErrors, 5000);
    }
}
//////////////LOGIN SIMULIATION//////////////////////////
function showLoginPopup(username, password, email) {
    const popupContainerLogin = document.getElementById('popup-container-login');
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    const revealPasswordBtn = document.getElementById('revealPasswordBtn');
    const counterElement = document.getElementById('counter');

    if (!popupContainerLogin || !usernameElement || !emailElement || !passwordElement || !counterElement) {
        console.error("Missing element(s) in the popup container");
        return;
    }

    popupContainerLogin.style.display = 'flex';
    usernameElement.textContent = username;
    emailElement.textContent = email;
    passwordElement.textContent = '••••••••';

    // Reveal password logic/dom
    revealPasswordBtn.addEventListener('click', function () {
        if (passwordElement.textContent === '••••••••') {
            passwordElement.textContent = password;
            revealPasswordBtn.textContent = 'Slėpti';
        } else {
            passwordElement.textContent = '••••••••';
            revealPasswordBtn.textContent = 'Atidaryti';
        }
    });

    // Countdown logic
    let countdown = 5;
    counterElement.textContent = countdown;
    const countdownInterval = setInterval(function () {
        countdown--;
        counterElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            popupContainerLogin.style.display = 'none';
        }
    }, 1000);
}
//////////////LOGIN SIMULIATION END//////////////////////////
// ©️ by Artūras Jevtuchovas,  -->  www.Bit.lt 2025m. 