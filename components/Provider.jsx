import LoginPage from "@/app/(web)/login/page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const Provider = async({children}) => {
    const session = await getServerSession(authOptions)
   if(session?.user){
    return <div>{children}</div>
   }
   else{
    return <LoginPage />
   }
}
export default Provider;