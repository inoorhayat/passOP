import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/show.png";
      setShowPass(false);
    } else {
      ref.current.src = "icons/hide.png";
      setShowPass(true);
    }
  };

  
  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    )};
    console.log([...passwordArray, form]);
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    console.log("deleting password with id", id);
    let c = confirm("do you really want to delete!?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      // console.log([...passwordArray, form]);
    }
  };
  const editPassword = (id) => {
    console.log("editing password with id", id);
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#d0f0d0_1px,transparent_1px),linear-gradient(to_bottom,#d0f0d0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#b5ffb5,transparent)]"></div>
      </div>

      <div className=" p-8 md:p-12 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-800"> &lt;</span>
          Pass
          <span className="text-green-800">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="flex flex-col items-center p-4 text-black gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-700 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 md:gap-10">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-700 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-700 w-full p-4 py-1"
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-[6px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/show.png"
                  alt="Toggle Password Visibility"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 text-black bg-green-300 rounded-full px-6 py-2 w-fit border border-green-900 hover:bg-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
              colors="primary:#109121"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-mono font-bold text-xl py-3">Yours Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto  w-full rounded-lg overflow-hidden">
              <thead className="text-white bg-green-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 flex text-center px-4 justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                      </td>
                      <td className="py-2 text-center ">{item.username}</td>
                      <td className="py-2 text-center ">{item.password}</td>
                      <td className="py-2 text-center ">
                        <span
                          className="mx-1 cursor-pointer text-blue-600"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          Edit
                        </span>
                        /
                        <span
                          className="mx-1 cursor-pointer text-red-700"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
