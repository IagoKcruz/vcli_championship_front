const my_headers ={
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function registerDataBase(name, pass, email){
    const user = {
        name: name,
        password: pass,
        email: email
    }
    const bodyJson = JSON.stringify(user)
    const res = await fetch(
        url+"/register",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}
export async function login(email, pass){

    const user = {
        password: pass,
        userName: email
    }
        console.log("cheguei", user)
    const bodyJson = JSON.stringify(user)
    const token = await fetch(
        url+"admin/login",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return token.json();
}
