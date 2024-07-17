import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '@/store/userSlice.js';
import axios from 'axios';

export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    console.log("1");
    const auth = getAuth(app);
    console.log("3");
    // const router = useRouter();

    const result = await signInWithPopup(auth, provider);
    console.log("4");
    // const res = await fetch('/api/v1/auth/google', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: result.user.displayName,
    //     email: result.user.email,
    //     photo: result.user.photoURL,
    //   }),
    // });

    const res = await axios.post(
        '/api/users/google', 
        {
            name: result.user.displayName,
            email: result.user.email
        }
    )

    console.log("5");
    const response = res.data;

    if(!res.success) dispatch(signInFailure(res.message));

    if(data.success){
      dispatch(signInSuccess(response));
      router.push("/");
    }

  }

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}