export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// check if the password has and length of 8 characters and
// includes at least one number and special charactersl
export const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;