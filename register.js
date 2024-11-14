// Almacenado de Variables
const form = document.querySelector(".register__form")
const nameInput = document.querySelector(".form__name")
const lastNameInput = document.querySelector(".form__last-name")
const emailInput = document.querySelector(".form__email")
const passwordInput = document.querySelector(".form__password")
const registerModal = document.querySelector(".modal")



// Valores para validaciones
const MIN_CHARACTER = 3;
const MAX_CHARACTER = 25;


// Array De usuarios y Local Storage

const users = JSON.parse(localStorage.getItem("users")) || [];

// Funcion de guardar el usuario a Local Storage

const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users))
}


// Funcion para mostrar error/exito debajo del input correspondiente

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success")
    formField.classList.add("error")

    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
}


const showSucess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error")
    formField.classList.add("success")

    const error = formField.querySelector("small")
    error.textContent = ""
}

// ! Funciones en base a Condiciones ! //
// ! Funciones en base a Condiciones ! //
// ! Funciones en base a Condiciones ! //

// Si el input esta vacio
 const isEmpty = (input) => {
    return !input.value.trim().length
 }

 // si el valor del input esta entre el min y el max
 const isBetween = (input,min,max) =>{
    return input.value.length >= min && input.value.length <= max
 }

// si el email ya esta en uso en el localStorage
const isEmailUsed = (input) => {
    return users.some(user => user.email === input.value.trim())
} 


// !! VALIDACIONES CON REGEX !!!
// !! VALIDACIONES CON REGEX !!!
// !! VALIDACIONES CON REGEX !!!

// Funcion validar email con Regex //

const isEmailValid = (input) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return regex.test(input.value.trim());
}

// Funcion para valida contraseña con Regex 

const isPasswordSecure = (input) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/

    return regex.test(input.value.trim())
} 

// !! FUNCION PARA MOSTRAR MODAL !! 

const showModal = (msg) => {
    registerModal.classList.add("active__modal")
    registerModal.innerHTML = msg
    setTimeout(() => {
        modal.classList.remove("active__modal")
    }, 5000)
} 

// Funcion para volver al inicio

const returnToIndex = () =>{
    setTimeout(() =>{
        window.location.href = "index.html"
    }, 7500)
}

// Funcion para comprobar campos de texto (Nombre, apellido)

const checkTextInput = (input) => {
let valid = false
 if (isEmpty(input)){
    showError(input, "Este campo es obligatorio")
    return
 }

 if(!isBetween(input,MIN_CHARACTER,MAX_CHARACTER)){
    showError(input, `este campo debe tener entre ${MIN_CHARACTER} y ${MAX_CHARACTER} caracteres`)
    return
 }

 showSucess(input)
valid = true
return valid
}

// Funcion para validar correo electronico 

const checkEmail = (input) => {
    let valid = false;

    // Si el campo esta vacio
    if(isEmpty(input)){
        showError(input,"Este campo es obligatorio")
        return
    }
    // Regex para comprobar correo valido
    if(!isEmailValid(input)){
        showError(input, "Por favor ingrese un correo valido")
        return
    }
    // Comprobar si el email esta en uso del localStorage
    if(isEmailUsed(input)){
        showError(input, "Este correo ya esta registrado")
        return
    }
    valid = true
    showSucess(input)
    return valid
}

// Funcion para validar contraseña
const checkPassword = (input) => {
    let valid = false;

     // Si el campo esta vacio
     if(isEmpty(input)){
        showError(input,"Este campo es obligatorio")
        return
        }

    // Regex para comprobar contraseña segura
    if(!isPasswordSecure(input)){
        showError(input,"La contraseña debe contener entre 8 y 20 caracteres, una mayuscula, miniscula, un numero y un caracter especial")
        return
    }
    valid = true
    showSucess(input)
    return valid
}

// Funcion para validar el formulario entero
const validateForm = (e) =>{
    e.preventDefault();

    // Validaciones individuales 

    let isNameValid = checkTextInput(nameInput);
    let isLastNameValid = checkTextInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let isPasswordValid = checkPassword(passwordInput)

    // Validacion completa
    let isFormValid = isNameValid && isLastNameValid && isEmailValid && isPasswordValid


    // Push al array de usuarios y guardado en el local Storage
    if(isFormValid){
        users.push({
            name:nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        })
        saveToLocalStorage()
        showModal("Te has registrado con exito")
        returnToIndex()

    }
}


const init = () =>{
    form.addEventListener("submit", validateForm)
    nameInput.addEventListener("input", () => checkTextInput(nameInput))
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput))
    emailInput.addEventListener("input", () => checkEmail(emailInput))
    passwordInput.addEventListener("input", ()=> checkPassword(passwordInput))
}

init()