export default function Login() {
  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input 
        type="email" 
        placeholder="Email"
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input 
        type="password" 
        placeholder="Password"
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button 
        style={{ 
          width: "100%", 
          padding: "10px", 
          marginTop: "20px", 
          backgroundColor: "green", 
          color: "white",
          border: "none"
        }}
      >
        Login
      </button>
    </div>
  )
}
