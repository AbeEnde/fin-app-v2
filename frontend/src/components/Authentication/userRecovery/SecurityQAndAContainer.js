import { useState } from "react"
import SecurityQuestions from "./SecurityQuestions"
import SecurityAnswer from "./SecurityAnswer"

import Box from "@mui/material/Box"

import classes from "../LoginAndRegisterForms.module.css"

const UsernameRecovery = ({ userId, setIsAuthenticatedHandler }) => {
  const [answerId, setAnswerId] = useState("")

  const setAnswerIdHandler = (answerId) => {
    setAnswerId(answerId)
  }
  return (
    <div className={classes.wrapper}>
      <Box className={classes.container}>
        <SecurityQuestions
          userId={userId}
          setAnswerIdHandler={setAnswerIdHandler}
        />
        <SecurityAnswer
          answerId={answerId}
          setIsAuthenticatedHandler={setIsAuthenticatedHandler}
        />
      </Box>
    </div>
  )
}

export default UsernameRecovery