import AdminNavbar from "@/components/AdminNavbar";
import Provider from "@/components/Provider";

export default function AdminLayout({ children }) {
  return (
    <div>
      {/* <Provider> 
        <AdminNavbar />
        {children}
      </Provider>
*/}
       <AdminNavbar />
      {children} 
    </div>
  );
}
