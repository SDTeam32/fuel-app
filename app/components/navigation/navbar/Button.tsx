import { useRouter } from "next/navigation";
import { useUser } from "../../../../hooks/useUser";
import Modal from "@/components/Modal";
import Login from "@/components/Login";
import { useState } from "react";

const Button = () => {
  const router = useRouter();
  const user = useUser();
  const [showSignup, setshowSignup] = useState(false)

  const handleLogin = () => {
    setshowSignup(!showSignup)
      console.log("clicked")
  };

  const handleLogout = () => {
    user.setUserID(undefined)
    user.setUserCode(undefined)
    router.push('/');
  };

  return (
    <>
      {user.userID && user.userCode ? ( // Check if username and password are not empty
        <button className="h-12 rounded-lg bg-white font-bold px-5" onClick={handleLogout}>Log Out</button>
      ) : (
        <button className="h-12 rounded-lg bg-white font-bold px-5" onClick={handleLogin}>Log In</button>
      )}
      <Modal show={showSignup} onClose={() => setshowSignup(false)}>
        <Login />
      </Modal>
    </>
  );
};

export default Button;
