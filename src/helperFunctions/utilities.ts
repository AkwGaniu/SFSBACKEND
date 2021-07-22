export const  validEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    if(regex.test(email) === false) {
      return false
    } else{
      return true
    }
}