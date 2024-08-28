import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '@/store/userSlice.js';
import axios from 'axios';
import { FaGoogle } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

export default function OAuth() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    const res = await axios.post(
        '/api/users/google', 
        {
            name: result.user.displayName,
            email: result.user.email
        }
    )

    const response = res.data;
    console.log(data);

    if(!res.data.success) dispatch(signInFailure(res.message));
    
    if(res.data.success){
      console.log("Hello world!");
      console.log(res.message);
      dispatch(signInSuccess(response));
      router.push("/");
    }
  
  }

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='border-gray-500 border-2 flex gap-2 items-center justify-center hover:bg-slate-50 text-black p-3 rounded-lg font-bold hover:opacity-95 my-4 w-[100%]'
    >
      <FaGoogle />
      Continue with google
    </button>
  );
}