const my_headers ={
    "Content-Type": "a"
}
const url = "http://localhost:3001/"

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
