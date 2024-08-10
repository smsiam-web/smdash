// components/SecureLayout.tsx
 // This is for Next.js 13 with the new app directory
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Auth from "../login/page";

const SecureLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
  const user = useSelector(selectUser);

  return user && user.role === "ADMIN" ? <>{children}</> : <Auth />;
};

export default SecureLayout;
