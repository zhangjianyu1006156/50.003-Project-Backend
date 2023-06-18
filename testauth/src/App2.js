// import { auth, provider } from "./firebase";
// import { useState } from "react";
// import { getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);

//   const handleGoogleSignIn = () => {
//     getRedirectResult(auth)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };

//   return (
//     <div className="flex-box justify-center">
//       <button className="rounded-none"> test button</button>
//       <div className="rounded-none">
//         {user ? (
//           <>
//             <button className="rounded hover:rounded-lg" onclick={handleLogout}>
//               LOGOUT
//             </button>
//             <h3>Welcome {user.displayname}</h3>
//             <p>{user.email}</p>
//             <div className="photo">
//               <img src={user.photoURL} alt="dp" referrerPolicy="no-referrer" />
//             </div>
//           </>
//         ) : (
//           <button className="rounded hover:rounded-lg" onClick={handleGoogleSignIn}>
//             Sign In With Google
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
