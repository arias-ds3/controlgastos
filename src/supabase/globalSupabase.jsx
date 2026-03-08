import { supabase } from "../index";
 export const ObtenerIdAuthSupabase = async ()=> {
    const {data:{sesion}}= await supabase.auth.getSession();
    if (sesion!==null) {
        const {user} = sesion;
        const idAuthSupabase = user.id;
        return idAuthSupabase;
    }
}