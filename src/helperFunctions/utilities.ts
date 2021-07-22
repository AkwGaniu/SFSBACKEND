export const  validEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    if(regex.test(email) === false) {
      return false
    } else{
      return true
    }
}