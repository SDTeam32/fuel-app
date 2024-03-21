import { useRouter } from "next/navigation";

const Button = () => {
    const router = useRouter()
    const handleClick = () => {
      router.push('/login')
    }
    return (
      <button className="h-12 rounded-lg bg-white font-bold px-5"  onClick={ handleClick }>Log In</button>
    );
  };
  export default Button;