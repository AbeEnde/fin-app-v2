import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import classes from "../Auth.module.css"
import FetchError from "../../HelperComponents/FetchError"
import ErrorMessage from "../../HelperComponents/ErrorMessage"
import validatePasswordCriteria from "../../HelperFunctions/validatePasswordCriteria"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { InputAdornment, IconButton } from "@mui/material"
import PasswordInput from "../PasswordInput"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    password: { isError: false, message: "" }
  })

  const navigate = useNavigate()

  const setErrorHandler = (error) => {
    setErrors((prevState) => ({
      ...prevState,
      [error.inputField]: { isError: error.isError, message: error.message }
    }))
  }

  const registerHandler = async (e) => {
    e.preventDefault()

    try {
      // Check that the password meets baseline criteria before attempting to register
      console.log(errors)
      console.log(password)
      if (!validatePasswordCriteria(password)) {
        setErrorHandler({
          inputField: "password",
          isError: true,
          message:
            "Password must contain at least one uppercase, one number, one special character and be at least 8 characters long."
        })
        throw new Error(
          "Password must contain at least one uppercase, one number, one special character and be at least 8 characters long."
        )
      }
      console.log(errors)

      if (errors.password.isError) {
        setErrorHandler({
          inputField: "password",
          isError: false,
          message: ""
        })
      }

      let response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: emailAddress,
          password: password,
          confirmPassword: confirmPassword,
          role: "USER"
        })
      })
      if (!response.ok) {
        throw await FetchError.fromResponse(response)
      }
      // If the user successfully registers, log them in.
      if (response.status === 201) {
        let response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        if (response.status === 200) {
          const responseJson = await response.json()
          localStorage.setItem("jwt", responseJson.accessToken)
          navigate("/")
        }
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <form className={classes.form} onSubmit={registerHandler}>
      <Box className={classes.container}>
        <TextField
          variant="outlined"
          label="Username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.inputField}
          size="small"
        />
        <TextField
          variant="outlined"
          label="Email Address"
          name="emailAddress"
          type="email"
          required
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className={classes.inputField}
          size="small"
        />
        <PasswordInput error={errors.password} />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={classes.inputField}
          size="small"
        />
        {/* <ErrorMessage message={message} /> */}
        <Button type="submit" variant="contained" className={classes.button}>
          Create Account
        </Button>
        <Typography className={classes.navLinkLabel}>
          Already have an account?
        </Typography>
        <NavLink to="/auth/login" className={classes.navLink}>
          Log In
        </NavLink>
      </Box>
    </form>
  )
}

export default RegisterForm