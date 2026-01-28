const validator = require("validator");

const validationForm = (params, requiredFields = []) => {
  for (let field of requiredFields){
    if(!params.hasOwnProperty(field) ||validator.isEmpty(String(params[field] || ""))){
        throw new Error(`El campo "${field} es obligatorio y no puede estar vacio`)
    } 
  }
}

module.exports = {
    validationForm
}