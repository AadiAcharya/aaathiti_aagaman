import React from "react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Title */}
        <div className="flex justify-around items-center">
          <h2 className="text-lg text-text-muted font-semibold">
            Login or Signup
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M9.2608 7.49893L14.6306 2.14085C14.8658 1.90566 14.9979 1.58668 14.9979 1.25408C14.9979 0.921478 14.8658 0.602498 14.6306 0.367312C14.3955 0.132126 14.0765 0 13.744 0C13.4114 0 13.0925 0.132126 12.8573 0.367312L7.5 5.73789L2.14268 0.367312C1.90752 0.132126 1.58859 -2.47808e-09 1.25603 0C0.923478 2.47809e-09 0.604543 0.132126 0.369391 0.367312C0.134239 0.602498 0.00213119 0.921478 0.00213119 1.25408C0.00213119 1.58668 0.134239 1.90566 0.369391 2.14085L5.7392 7.49893L0.369391 12.857C0.252343 12.9731 0.159441 13.1113 0.0960411 13.2635C0.0326416 13.4157 0 13.5789 0 13.7438C0 13.9087 0.0326416 14.0719 0.0960411 14.2241C0.159441 14.3763 0.252343 14.5144 0.369391 14.6306C0.485482 14.7476 0.6236 14.8405 0.775777 14.9039C0.927954 14.9674 1.09118 15 1.25603 15C1.42089 15 1.58411 14.9674 1.73629 14.9039C1.88847 14.8405 2.02659 14.7476 2.14268 14.6306L7.5 9.25998L12.8573 14.6306C12.9734 14.7476 13.1115 14.8405 13.2637 14.9039C13.4159 14.9674 13.5791 15 13.744 15C13.9088 15 14.072 14.9674 14.2242 14.9039C14.3764 14.8405 14.5145 14.7476 14.6306 14.6306C14.7477 14.5144 14.8406 14.3763 14.904 14.2241C14.9674 14.0719 15 13.9087 15 13.7438C15 13.5789 14.9674 13.4157 14.904 13.2635C14.8406 13.1113 14.7477 12.9731 14.6306 12.857L9.2608 7.49893Z"
              fill="#484848"
            />
          </svg>
        </div>
        <hr className="mt-3 text-black" />
        {/* Country + Phone */}
        <div className="flex gap-3 text-text-muted">
          {/* Country */}
          <div className="flex items-center justify-between border rounded-lg px-3 py-2 w-1/2">
            <div>
              <p className="text-xs text-gray-500">Country</p>
              <h3 className="text-sm font-medium">UAE (+971)</h3>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
            >
              <path
                d="M11.7833 0.35C11.3167 -0.116667 10.6167 -0.116667 10.15 0.35L6.06667 4.43333L1.98333 0.35C1.51667 -0.116667 0.816667 -0.116667 0.35 0.35C-0.116667 0.816667 -0.116667 1.51667 0.35 1.98333L5.25 6.88334C5.48333 7.11667 5.71667 7.23334 6.06667 7.23334C6.41667 7.23334 6.65 7.11667 6.88333 6.88334L11.7833 1.98333C12.25 1.51667 12.25 0.816667 11.7833 0.35Z"
                fill="#484848"
              />
            </svg>
          </div>

          {/* Phone */}
          <div className="w-1/2">
            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
            <textarea
              placeholder="Enter Your Number"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            />
          </div>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 leading-relaxed">
          We’ll call or text you to confirm your number. Standard message and
          data rates apply.
        </p>

        {/* Primary Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition">
            Continue
          </button>

          <button className="w-full text-text-muted flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
            >
              <path
                d="M21.125 0H1.625C1.19402 0 0.780698 0.171205 0.475951 0.475951C0.171205 0.780698 0 1.19402 0 1.625V14.625C0 15.056 0.171205 15.4693 0.475951 15.774C0.780698 16.0788 1.19402 16.25 1.625 16.25H21.125C21.556 16.25 21.9693 16.0788 22.274 15.774C22.5788 15.4693 22.75 15.056 22.75 14.625V1.625C22.75 1.19402 22.5788 0.780698 22.274 0.475951C21.9693 0.171205 21.556 0 21.125 0ZM19.3375 1.625L11.375 7.13375L3.4125 1.625H19.3375ZM1.625 14.625V2.36437L10.9119 8.79125C11.0479 8.8856 11.2095 8.93616 11.375 8.93616C11.5405 8.93616 11.7021 8.8856 11.8381 8.79125L21.125 2.36437V14.625H1.625Z"
                fill="#484848"
              />
            </svg>
            Continue with email
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <hr className="flex-1" />
          <span className="whitespace-nowrap">or continue with</span>
          <hr className="flex-1" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-2 text-text-muted">
          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
            </svg>
            Facebook
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
              <path d="M16.365 1.43c0 1.14-.9 2.6-2.04 3.36-1.05.72-2.46 1.2-3.63 1.14-.15-1.2.6-2.52 1.5-3.33.9-.78 2.43-1.35 3.75-1.17.03.06.42.06.42.06zM20.52 17.4c-.6 1.35-.9 1.95-1.68 3.12-1.08 1.65-2.58 3.72-4.47 3.75-1.65.03-2.1-1.08-4.35-1.08-2.25 0-2.79 1.05-4.44 1.11-1.89.06-3.33-1.83-4.41-3.48C.9 18.06.03 14.7 1.65 12.3c.9-1.38 2.52-2.25 4.26-2.28 1.65-.03 3.21 1.14 4.35 1.14 1.11 0 3.03-1.41 5.1-1.2.87.03 3.3.36 4.86 2.64-.12.06-2.88 1.68-2.7 4.8z" />
            </svg>
            Apple ID
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.9-6.9C36.7 2.7 30.8 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8 6.2C12.6 13.3 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.6-.15-3.1-.43-4.5H24v9h12.7c-.6 3-2.4 5.6-5 7.3l7.7 6c4.5-4.2 7.1-10.3 7.1-17.8z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.5c-1-3-1-6.3 0-9.3l-8-6.2C.9 16.3 0 20 0 24s.9 7.7 2.6 11l8-6.5z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.8 0 12.6-2.3 16.8-6.3l-7.7-6c-2.2 1.5-5 2.3-9.1 2.3-6.2 0-11.4-3.8-13.4-9.1l-8 6.5C6.5 42.6 14.6 48 24 48z"
              />
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
