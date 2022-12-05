const apiUrl = "https://localhost:5001";

  export const login = (userObject) => {
    return fetch(`${apiUrl}/api/user/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

  export const logout = () => {
        localStorage.clear()
  };

  export const register = (userObject, password) => {
    return  fetch(`${apiUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
      });
  };

export const getAllUsers = () => {
  return fetch (`https://localhost:5001/api/User`)
    .then((res) => res.json())
};

export const getUserById = (id) => {
  return fetch(`https://localhost:5001/api/user/${id}`)
    .then((res) => res.json());
};

export const updateUser = (userProfile) => {
  return fetch(`/api/User/${userProfile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    })
};


  // return (
  //   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
  //      {props.children}
  //   </UserProfileContext.Provider>
  // );
