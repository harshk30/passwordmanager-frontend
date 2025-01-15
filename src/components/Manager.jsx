import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const showPassword = () => {
    if (
      ref.current.src.includes(
        "https://img.icons8.com/?size=100&id=60022&format=png&color=000000"
      )
    ) {
      ref.current.src =
        "https://img.icons8.com/?size=100&id=121528&format=png&color=000000";
      passwordRef.current.type = "text";
    } else if (
      ref.current.src ===
      "https://img.icons8.com/?size=100&id=121528&format=png&color=000000"
    ) {
      ref.current.src =
        "https://img.icons8.com/?size=100&id=60022&format=png&color=000000";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    toast("Password Saved !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const deletePassword = (id) => {
    const c = confirm("Are you sure you want to delete this password?");
    if (!c) return;
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password Deleted !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const editPassword = (id) => {
    console.log("editing password with id :" + id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="max-w-screen-lg mx-auto my-8 p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Passwords</h1>
        <p className="text-lg text-center mb-8">Store your passwords here</p>

        <div className="text-black flex flex-col items-center space-y-4">
          <input
            onChange={handleChange}
            value={form.site}
            name="site"
            placeholder="Enter website URL"
            className="px-4 py-2 rounded-full border border-green-500 hover:border-black w-full md:w-96"
            type="text"
          />

          <div className="flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:gap-6">
            <input
              onChange={handleChange}
              value={form.username}
              name="username"
              placeholder="Enter username"
              className="px-4 py-2 rounded-full border border-green-500 hover:border-black w-full md:w-96"
              type="text"
            />
            <div className="relative w-full md:w-96">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                name="password"
                placeholder="Enter password"
                className="px-4 py-2 rounded-full border border-green-500 hover:border-black w-full pr-12"
                type="password"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  onClick={showPassword}
                  ref={ref}
                  className="h-6"
                  src="https://img.icons8.com/?size=100&id=60022&format=png&color=000000"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-500 hover:bg-green-400 font-semibold border flex items-center justify-center px-6 py-2 rounded-full mt-4"
          >
            <img
              src="https://img.icons8.com/?size=100&id=IA4hgI5aWiHD&format=png&color=000000"
              className="h-6 w-6 mx-2"
              alt="Save Icon"
            />
            Save
          </button>
        </div>

        <div className="passwords mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-max rounded-xl shadow-lg">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-center text-sm md:text-base">
                      Site
                    </th>
                    <th className="px-4 py-2 text-center text-sm md:text-base">
                      Username
                    </th>
                    <th className="px-4 py-2 text-center text-sm md:text-base">
                      Password
                    </th>
                    <th className="px-4 py-2 text-center text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-green-50">
                  {passwordArray.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-green-300 bg-green-200 transition-all duration-200"
                    >
                      <td className="px-4 py-3 text-center text-sm md:text-base">
                        <a
                          href={
                            item.site.startsWith("http://") ||
                            item.site.startsWith("https://")
                              ? item.site
                              : `https://${item.site}`
                          }
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium"
                        >
                          {item.site}
                        </a>
                        <img
                          onClick={() => copyText(item.site)}
                          src="https://img.icons8.com/?size=100&id=89446&format=png&color=000000"
                          alt="Link Icon"
                          className="h-5 w-5 inline-block ml-2 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:text-base">
                        <span className="text-xs md:text-sm font-medium">
                          {item.username}
                        </span>
                        <img
                          onClick={() => copyText(item.username)}
                          src="https://img.icons8.com/?size=100&id=89446&format=png&color=000000"
                          alt="Username Icon"
                          className="h-5 w-5 inline-block ml-2 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-sm md:text-base" >
                        <span className="text-xs md:text-sm font-medium">
                          {item.password}
                        </span>
                        <img
                          onClick={() => copyText(item.password)}
                          src="https://img.icons8.com/?size=100&id=89446&format=png&color=000000"
                          alt="Password Icon"
                          className="h-5 w-5 inline-block ml-2 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-6 flex justify-center items-center gap-4">
                        <img
                          onClick={() => deletePassword(item.id)}
                          className="h-6 w-6 cursor-pointer"
                          src="https://img.icons8.com/?size=100&id=gvCCCB9U5vtQ&format=png&color=000000"
                          alt=""
                        />
                        <img
                          onClick={() => editPassword(item.id)}
                          className="h-6 w-6 cursor-pointer"
                          src="https://img.icons8.com/?size=100&id=ELPAgpGXIX9K&format=png&color=000000"
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
