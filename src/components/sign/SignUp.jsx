import React, {useState} from "react";

const SignUp = () => {

  const [form, setForm] = useState[{
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }]



   const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({});


  const handelChange = (e)=>{
    const {name, value} = e.target
    setConfirmPassword({...form, [name]: value})
    if (errors[name]){
      setErrors({...errors, [name]:""})
    }
  }

    const validateString= ()=>{
    const newErrors ={};

    // name empty
    if (form.name.trim === ""){
      newErrors.name = "Name is required"
    }
     // emeil empty
    if (form.email.trim === ""){
      newErrors.email= "email is required"
    }

    // password empty
    if (form.password.trim === ""){
      newErrors.password = "Password is required"
    }
    // confirm password empty
    if (form.confirmPassword.trim === ""){
      newErrors.password = "Password is required"
    }

    // if email format is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
      newErrors.email= "invalid email format"
    }

    // if password is less ahn 8
    if (form.password.length<8){
      newErrors.password= "password must be 8 character long"
    }

    // if both password match
    if (form.password !== form.confirmPassword){
      newErrors.password =" both password needs to be same"
    }

setErrors(newErrors)
return Object.key(newErrors).length === 0;




  }

  const handelSubmit = (e)=>{
    e.preventDefault();
  }




  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6 space-y-5" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid rgba(100, 116, 139, 0.2)' }}>
        <div className="text-center space-y-1">
          <p className="font-medium text-lg" style={{ color: 'var(--color-text-primary)' }}>Create Account</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Join us today</p>
        </div>
        <hr style={{ borderColor: 'rgba(100, 116, 139, 0.2)' }} />

        <form onSubmit={handelSubmit} className="space-y-4">

          {/* Name Field */}
          <div>
            <label className="block mb-1 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handelChange}
              className="w-full rounded-lg px-3 py-2 outline-none focus:ring-2 transition"
              style={{
                border: '1px solid rgba(100, 116, 139, 0.2)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg px-3 py-2 outline-none focus:ring-2 transition"
              style={{
                border: '1px solid rgba(100, 116, 139, 0.2)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                className="w-full rounded-lg px-3 py-2 outline-none focus:ring-2 transition pr-10"
                style={{
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)'
                }}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-lg transition"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                👁️‍🗨️
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block mb-1 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                className="w-full rounded-lg px-3 py-2 outline-none focus:ring-2 transition pr-10"
                style={{
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)'
                }}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-lg transition"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                👁️‍🗨️
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full text-white rounded-full px-6 py-3 font-semibold transition hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Sign Up
          </button>
        </form>

        <hr style={{ borderColor: 'rgba(100, 116, 139, 0.2)' }} />

        {/* Already Have Account */}
        <div className="text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;