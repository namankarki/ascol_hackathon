import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // If using js-cookie

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = Cookies.get("token"); // Get the token from cookies

    if (token) {
      try {
        // Decode the token or make an API call to get user info from the token
        const user = JSON.parse(atob(token.split(".")[1])); // For JWT
        return user;
      } catch (error) {
        console.error("Error parsing token:", error);
        return null;
      }
    }
    return null;
  });

  const updateUser = (data, token) => {
    setCurrentUser(data);
    Cookies.set("authToken", token, { secure: true, sameSite: "strict" }); // Store token in cookies
  };

  useEffect(() => {
    if (currentUser === null) {
      Cookies.remove("authToken"); // Clear cookie if no user
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//? In React, createContext is a function that is used to create a Context object. Context provides a way to share values between components without having to explicitly pass props through every level of the tree. This is particularly useful for global data such as the current authenticated user, theme, or preferred language.
//TODO Need to wrap app.js or root file with AuthcontextProvider to use it globally => AuthContext
