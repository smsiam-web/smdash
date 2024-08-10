// components/SecureLayout.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // This is for Next.js 13 with the new app directory
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Auth from "../login/page";

const SecureLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
  const user = useSelector(selectUser);
  console.log(user)

//   useEffect(() => {
//     // Ensure we're only checking this on the client side
//     if (!isAuthenticated) {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [isAuthenticated, router]);

  return user ? <>{children}</> : <Auth />;
};

export default SecureLayout;
