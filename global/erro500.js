import { toastify } from "./toastity";

export async function erro500(status){
    const res = await fetch(url+"admin/listLeague")
    if(res.status == 500){
        toastify(erro,"Estamos em manutenção")
        return true
    }
}