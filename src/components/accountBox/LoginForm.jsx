import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  Input,
  MutedLink,
  SubmitButton,
} from "./Common";
import { Marginer } from "../marginer/Index";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
})

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [error, setError] = useState(null)

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios.post("http://localhost:5000/api/v1/login", values).catch((err) => {
      if(err && err.response)
        setError(err, response.data.message)
    });

    if (response) {
      alert("Welcome back in . Authenticating...")
    }
  }

  const formik = useFormik({ initialValues: {email: "", password: ""}, validateOnBlur: true, onSubmit, validationSchema})

  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input type="email" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {<FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>}
        </FieldContainer>
        <FieldContainer>
          <Input type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {<FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>}
        </FieldContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>Login</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Don't have an accoun?{" "}</MutedLink>
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      
    </BoxContainer>
  );
}