/* src/AuthPage.tsx */
import { useState } from 'react'
import { supabase } from './supabaseClient'
import './Auth.css'
import { motion, useAnimationControls } from "framer-motion"

const formVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
}

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  
  const controls = useAnimationControls()

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    let authError = null

    if (isLogin) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', username)
        .single()

      if (profileError || !data) {
        authError = { message: 'Username not found.' }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password,
        })
        authError = error
      }
    } else {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      })
      authError = error
      if (!error && signUpData.user) {
        await supabase
          .from('profiles')
          .update({ email: signUpData.user.email })
          .eq('id', signUpData.user.id);
        // The alert that was here has been removed.
      }
    }

    if (authError) {
      setError(authError.message)
      controls.start("shake")
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
      <p>{isLogin ? 'Sign in with your username.' : 'Sign up to start playing.'}</p>
      
      <motion.form 
        className="auth-form" 
        onSubmit={handleAuth}
        variants={formVariants}
        animate={controls}
      >
        {isLogin ? (
          <input type="text" placeholder="Username" value={username} required={true} onChange={(e) => setUsername(e.target.value)} />
        ) : (
          <>
            <input type="text" placeholder="Username" value={username} required={true} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
          </>
        )}
        <input type="password" placeholder="Password" value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
        
        <div className="auth-error">{error}</div>

        <motion.button 
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {loading ? (
            <motion.div 
              style={{ width: 20, height: 20, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'white', margin: '0 auto' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          ) : (
            isLogin ? 'Log In' : 'Sign Up'
          )}
        </motion.button>
      </motion.form>
      
      <div className="auth-toggle">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => { setIsLogin(!isLogin); setError('') }}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  )
}