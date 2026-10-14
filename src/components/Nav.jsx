export default function Nav() {
  return (
    <nav
      className="w-full h-16 md:h-16 px-4 sm:px-8 lg:px-16 
bg-gradient-to-r from-cyan-300 to-sky-300 
shadow-md flex items-center justify-between"
    >
      {/* Logo */}
      <div>
        <h1
          className="
      text-xl sm:text-2xl md:text-3xl 
      font-extrabold tracking-tight 
      text-gray-800 cursor-pointer
    "
        >
          AuthProject
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Optional Signup button hidden on mobile */}
        {/* <button
          className="
      hidden sm:block
      px-4 py-2
      rounded-xl
      text-gray-700
      font-medium
      hover:bg-white/40
      transition-all duration-200
    "
        >
          Sign Up
        </button> */}

        {/* Login Button */}
        {/* <button
          className="
        px-4 sm:px-5 py-2
        rounded-xl
        bg-white
        font-bold text-gray-800
        shadow-[0_2px_6px_rgba(0,0,0,0.15)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]
        hover:-translate-y-[1px]
        active:translate-y-[1px]
        active:shadow-[0_1px_3px_rgba(0,0,0,0.15)]
        transition-all duration-200
      "
        >
          Login
        </button> */}
      </div>
    </nav>
  );
}
