import "./App.css"
import { useState } from "react"
import { object, string } from "yup"
import { emailPattern, passwordPattern, userNamePattern } from "./core"

const App = () => {
  const schema = object({
    firstName: string()
      .min(5, "Firstname must be at least 5 characters")
      .max(12, "Firstname can be at most 12 characters")
      .required("Firstname is required")
      .matches(userNamePattern, "Firstname does not match the pattern"),
    lastName: string()
      .min(5, "Lastname must be at least 5 characters")
      .max(12, "Lastname can be at most 12 characters")
      .required("Lastname is required")
      .matches(userNamePattern, "Lastname does not match the pattern"),
    email: string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email does not match the pattern"),
    password: string()
      .required("Password is required")
      .matches(passwordPattern, "Password does not match the pattern"),
  })

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  
  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: any) => {
    const { name, value } = e?.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await schema.validate(formValues, { abortEarly: false })
      console.log("Form values:", formValues)
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
      setErrors({})
    } catch (err: any) {
      if (err.inner) {
        const errorMessages = err.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message
          return acc
        }, {})
        setErrors(errorMessages)
        setTimeout(() => {
          setErrors({})
        }, 2000);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Yup Form Handling</h1>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            value={formValues.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={formValues.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App